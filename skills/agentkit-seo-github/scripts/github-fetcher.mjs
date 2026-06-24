#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

// Configurazione Throttling e limiti
const THROTTLE_DELAY_MS = 200; // Ritardo tra le richieste per evitare blocchi
const DEFAULT_MAX_RECENT_REPOS = 20; // Limite massimo di repository di default
const RETRY_BACKOFF_MS = 2000; // Ritardo iniziale di backoff in caso di HTTP 429

// Lettura argomenti da riga di comando
const profileUrl = process.argv[2];
if (!profileUrl) {
  console.error("Usage: node github-fetcher.mjs <github_profile_url_or_username> [output_directory] [max_repositories]");
  process.exit(1);
}

// Configurazione limite massimo di repository
let maxRecentRepos = DEFAULT_MAX_RECENT_REPOS;
if (process.argv[4]) {
  const parsedLimit = process.argv[4].toLowerCase();
  if (parsedLimit === "all") {
    maxRecentRepos = Infinity;
  } else {
    const num = parseInt(parsedLimit, 10);
    if (!isNaN(num) && num > 0) {
      maxRecentRepos = num;
    }
  }
}

// Estrazione dello username dall'URL
const usernameMatch = profileUrl.match(/(?:github\.com\/)?([^/]+)$/);
const username = usernameMatch ? usernameMatch[1].trim() : profileUrl.trim();

// Configurazione cartella di output
const outputDir = process.argv[3] 
  ? path.resolve(process.argv[3]) 
  : path.join(process.cwd(), "output");

console.log(`[Fetcher] Starting analysis for user: ${username}`);
console.log(`[Fetcher] Output report will be saved to: ${outputDir}\n`);

// Funzione di utilità per dormire (throttling)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Esegue comandi shell leggeri (Git CLI)
function runCommand(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  } catch (err) {
    return null;
  }
}

// Esegue una fetch HTTP gestendo rate limit (429) con backoff esponenziale
async function fetchWithRetry(url, options = {}, retries = 3, delay = RETRY_BACKOFF_MS) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.status === 429) {
        console.warn(`[HTTP 429] Rate limit hit on ${url}. Retrying in ${delay}ms...`);
        await sleep(delay);
        return fetchWithRetry(url, options, retries - i - 1, delay * 2);
      }
      return response;
    } catch (err) {
      if (i === retries - 1) throw err;
      await sleep(delay);
    }
  }
  throw new Error(`Failed to fetch ${url} after retries`);
}

// Rileva il branch principale della repository senza usare API REST
async function detectDefaultBranch(owner, repo) {
  // Prova prima con Git CLI per precisione
  try {
    const lsRemote = runCommand(`git ls-remote --symref https://github.com/${owner}/${repo}.git HEAD`);
    if (lsRemote) {
      const match = lsRemote.match(/ref: refs\/heads\/(\S+)\s+HEAD/);
      if (match) return match[1];
    }
  } catch (e) {
    // Continua con la ricerca HTTP se git non è presente o fallisce
  }

  // Fallback con controlli HTTP HEAD in parallelo sui branch più comuni
  const branches = ["main", "master", "develop"];
  for (const branch of branches) {
    const checkUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
    try {
      const response = await fetch(checkUrl, { method: "HEAD" });
      if (response.ok) return branch;
    } catch (e) {
      // Ignora l'errore del tentativo
    }
  }
  return "main"; // Default finale
}

// Scarica il file README grezzo cercando variazioni di estensione comuni
async function fetchReadme(owner, repo, branch) {
  const variations = ["README.md", "README.markdown", "readme.md", "README.txt", "README"];
  for (const filename of variations) {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filename}`;
    try {
      const response = await fetchWithRetry(url, { method: "GET" });
      if (response.ok) {
        const text = await response.text();
        return { content: text, filename, url };
      }
    } catch (e) {
      // Prova la variazione successiva
    }
    await sleep(THROTTLE_DELAY_MS); // Applica Throttling
  }
  return null;
}

// Funzione principale di orchestrazione
async function main() {
  try {
    // 1. Fetch della pagina principale del profilo
    const profileUrl = `https://github.com/${username}`;
    console.log(`[Fetcher] Downloading profile page...`);
    const profileResponse = await fetchWithRetry(profileUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
    });

    if (!profileResponse.ok) {
      throw new Error(`Failed to fetch profile page (HTTP ${profileResponse.status})`);
    }

    const profileHtml = await profileResponse.text();

    // Estrazione Nome e Bio
    const nameMatch = profileHtml.match(/<span class="p-name vcard-fullname d-block overflow-hidden" itemprop="name">([^<]+)<\/span>/i);
    const fullName = nameMatch ? nameMatch[1].trim() : username;

    const bioMatch = profileHtml.match(/data-bio-text="([^"]*)"/i);
    let bio = bioMatch ? bioMatch[1] : "";
    bio = bio.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

    // Estrazione Pinned Repositories
    const pinnedRepoRegex = /href="\/([^/"]+)\/([^/"]+)"\s+class="mr-1 text-bold wb-break-word"/gi;
    const pinnedRepos = [];
    let match;
    while ((match = pinnedRepoRegex.exec(profileHtml)) !== null) {
      const owner = match[1];
      const repo = match[2];
      if (owner.toLowerCase() === username.toLowerCase() && !pinnedRepos.includes(repo)) {
        pinnedRepos.push(repo);
      }
    }

    console.log(`[Profile] Name: ${fullName}`);
    console.log(`[Profile] Bio: ${bio || "(None)"}`);
    console.log(`[Profile] Pinned repositories: ${pinnedRepos.length > 0 ? pinnedRepos.join(", ") : "None"}`);

    // 2. Paginazione per recuperare repository attive (recenti)
    console.log(`\n[Fetcher] Scanning repository list...`);
    let page = 1;
    let hasMorePages = true;
    const recentRepos = [];

    while (hasMorePages && recentRepos.length < maxRecentRepos) {
      console.log(`[Fetcher] Scanning page ${page}...`);
      const repoTabUrl = `https://github.com/${username}?tab=repositories&page=${page}`;
      const tabResponse = await fetchWithRetry(repoTabUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
      });

      if (!tabResponse.ok) {
        console.warn(`[Fetcher] Warning: failed to fetch page ${page} (HTTP ${tabResponse.status})`);
        break;
      }

      const tabHtml = await tabResponse.text();

      // Trova tutti gli elementi <li> dei repository
      // Ciascun elemento di lista ha classe o proprietà itemprop="owns"
      const liMatches = tabHtml.match(/<li[^>]*class="[^"]*col-12 d-flex[^"]*"[^>]*>([\s\S]*?)<\/li>/gi) || [];
      if (liMatches.length === 0) {
        hasMorePages = false;
        break;
      }

      for (const liHtml of liMatches) {
        if (recentRepos.length >= maxRecentRepos) break;

        // Verifica se è un Fork
        const isFork = /forked from/i.test(liHtml);
        if (isFork) continue; // Salta i fork

        // Trova il nome della repository
        // Es: href="/username/repo-name" itemprop="name codeRepository"
        const repoNameMatch = liHtml.match(/href="\/[^/"]+\/([^/"]+)"\s+itemprop="name codeRepository"/i);
        if (!repoNameMatch) continue;

        const repoName = repoNameMatch[1].trim();

        // Salta se è già presente tra le pinned o già aggiunta
        if (pinnedRepos.includes(repoName) || recentRepos.some(r => r.name === repoName)) {
          continue;
        }

        // Estrai descrizione
        const descMatch = liHtml.match(/<p\s+class="col-9[^"]*"\s+itemprop="description">([\s\S]*?)<\/p>/i) ||
                          liHtml.match(/itemprop="description">([\s\S]*?)<\/p>/i);
        let description = descMatch ? descMatch[1].trim() : "";
        description = description.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");

        // Estrai linguaggio principale
        const langMatch = liHtml.match(/itemprop="programmingLanguage">([^<]+)/i);
        const language = langMatch ? langMatch[1].trim() : "Unknown";

        // Estrai data di aggiornamento
        const dateMatch = liHtml.match(/<relative-time[^>]*datetime="([^"]+)"/i);
        const lastUpdated = dateMatch ? dateMatch[1] : "";

        recentRepos.push({
          name: repoName,
          description,
          language,
          lastUpdated
        });
      }

      page++;
      await sleep(THROTTLE_DELAY_MS);
    }

    console.log(`[Fetcher] Found ${recentRepos.length} recent non-pinned active repositories.`);

    // 3. Scarica README del profilo (se presente)
    console.log(`\n[Fetcher] Checking special Profile README (repo: ${username}/${username})...`);
    let profileReadmeContent = null;
    const profileReadmeBranch = await detectDefaultBranch(username, username);
    const profileReadmeResult = await fetchReadme(username, username, profileReadmeBranch);
    if (profileReadmeResult) {
      console.log(`[Profile README] Successfully retrieved README.`);
      profileReadmeContent = profileReadmeResult.content;
    } else {
      console.log(`[Profile README] Not found.`);
    }

    // 4. Scarica i README di tutte le repository (Pinned + Recenti) in sequenza con throttling
    const allReposData = [];

    // Unione ordinata: prima le pinned, poi le recenti
    const reposToFetch = [
      ...pinnedRepos.map(name => ({ name, isPinned: true, description: "", language: "" })),
      ...recentRepos.map(r => ({ ...r, isPinned: false }))
    ];

    console.log(`\n[Fetcher] Fetching README files for ${reposToFetch.length} repositories in queue...`);
    for (const repoInfo of reposToFetch) {
      console.log(`[Fetcher] [${repoInfo.name}] Detecting branch and downloading README...`);
      const branch = await detectDefaultBranch(username, repoInfo.name);
      await sleep(THROTTLE_DELAY_MS);

      const readmeResult = await fetchReadme(username, repoInfo.name, branch);
      if (readmeResult) {
        console.log(`  -> OK: ${readmeResult.filename} (Branch: ${branch})`);
        allReposData.push({
          ...repoInfo,
          readme: readmeResult.content,
          readmeUrl: readmeResult.url
        });
      } else {
        console.log(`  -> Warning: README not found for ${repoInfo.name}`);
        allReposData.push({
          ...repoInfo,
          readme: "(No README file found or empty repository)",
          readmeUrl: ""
        });
      }
      await sleep(THROTTLE_DELAY_MS); // Throttling extra tra repo
    }

    // 5. Creazione del report Markdown finale
    let markdownReport = `# GitHub Profile and Repositories Report: ${username}\n\n`;
    markdownReport += `## Profile Overview\n\n`;
    markdownReport += `- **Name**: ${fullName}\n`;
    markdownReport += `- **Username**: [${username}](https://github.com/${username})\n`;
    markdownReport += `- **Bio**: ${bio || "No bio set."}\n\n`;

    if (profileReadmeContent) {
      markdownReport += `### Profile README\n\n\`\`\`markdown\n${profileReadmeContent}\n\`\`\`\n\n`;
    } else {
      markdownReport += `### Profile README\n\n*(No special profile README set)*\n\n`;
    }

    markdownReport += `## Repositories Analysis\n\n`;
    
    for (const repo of allReposData) {
      markdownReport += `### [${repo.name}](https://github.com/${username}/${repo.name})\n\n`;
      markdownReport += `- **Type**: ${repo.isPinned ? "📌 Pinned / Showcase" : "📁 Active / Recent"}\n`;
      if (repo.language) markdownReport += `- **Primary Language**: ${repo.language}\n`;
      if (repo.lastUpdated) markdownReport += `- **Last Updated**: ${repo.lastUpdated}\n`;
      if (repo.description) markdownReport += `- **Description**: ${repo.description}\n`;
      markdownReport += `- **README URL**: ${repo.readmeUrl || "N/A"}\n\n`;
      markdownReport += `#### README Content\n\n\`\`\`markdown\n${repo.readme}\n\`\`\`\n\n`;
      markdownReport += `---\n\n`;
    }

    // Scrittura su file
    fs.mkdirSync(outputDir, { recursive: true });
    const outputFilePath = path.join(outputDir, `github_${username}_report.md`);
    fs.writeFileSync(outputFilePath, markdownReport, "utf8");

    console.log(`\n[Fetcher] Success! Report generated successfully.`);
    console.log(`[Fetcher] File saved: ${outputFilePath}`);

  } catch (error) {
    console.error(`\n[Fetcher] Fatal Error: ${error.message}`);
    process.exit(1);
  }
}

main();
