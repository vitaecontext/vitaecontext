import assert from "node:assert/strict";
import test from "node:test";

import {
  cleanHtmlText,
  fetchWithRetry,
  getAttribute,
  parseArguments,
  parseProfileHtml,
  parseRepositoryApiResponse,
  parseRepositoryPageHtml,
  parseRepositoryListHtml,
  renderMarkdownReport,
  renderRepositoryMarkdownReport
} from "../.skills/agent-skill/vitaecontext-github/scripts/github-fetcher.mjs";

const PROFILE_WITH_PINS = `
<meta property="og:image" content="https://avatars.example/user.png">
<span itemprop="name">Example Person</span>
<div data-bio-text="Developer &amp; maintainer"></div>
<li itemprop="homeLocation" aria-label="Home location: Rome, Italy"></li>
<li itemprop="worksFor" aria-label="Organization: Example Org"></li>
<li data-test-selector="profile-website-url"><a href="https://example.com">Site</a></li>
<div class="layout js-pinned-items-reorder-container another-class">
  <h2>Pinned <span>Loading</span></h2>
  <ol>
    <li class="card">
      <a class="text-bold" href="/example-owner/first-repo"><span class="repo">first-repo</span></a>
      <p class="pinned-item-desc">First &amp; strongest project</p>
      <span itemprop="programmingLanguage">JavaScript</span>
    </li>
    <li class="card">
      <a href="/example-owner/second-repo"><span class="repo">second-repo</span></a>
      <p class="pinned-item-desc">Second project</p>
    </li>
  </ol>
</div>
`;

const PROFILE_WITH_POPULAR = `
<span itemprop="name">Example Person</span>
<div class="js-pinned-items-reorder-container">
  <h2>Popular repositories</h2>
  <ol>
    <li><div class="pinned-item-list-item"><a href="/example-owner/popular-repo"><span class="repo">popular-repo</span></a></div></li>
  </ol>
</div>
`;

const REPOSITORY_LIST = `
<ul data-filterable-type="substring" data-filterable-for="your-repos-filter">
  <li class="public source" itemscope itemprop="owns">
    <a itemprop="name codeRepository" href="/example-owner/recent-repo">recent-repo</a>
    <p itemprop="description">A useful &amp; recent repository</p>
    <a href="/topics/nodejs" title="Topic: nodejs">nodejs</a>
    <span itemprop="programmingLanguage">TypeScript</span>
    Updated <relative-time class="no-wrap" datetime="2026-06-24T10:00:00Z">Today</relative-time>
  </li>
</ul>
<a aria-label="Next page" href="/example-owner?page=2&amp;tab=repositories" rel="next">Next</a>
`;

test("getAttribute handles reordered and single-quoted attributes", () => {
  const tag = "<a class='link value' data-id=42 href=\"/owner/repo\">";
  assert.equal(getAttribute(tag, "href"), "/owner/repo");
  assert.equal(getAttribute(tag, "class"), "link value");
  assert.equal(getAttribute(tag, "data-id"), "42");
});

test("cleanHtmlText strips markup and decodes entities", () => {
  assert.equal(cleanHtmlText("<p>Hello &amp; <strong>goodbye</strong></p>"), "Hello & goodbye");
});

test("fetchWithRetry retries rate-limited public requests", async () => {
  let requests = 0;
  const delays = [];
  const result = await fetchWithRetry("https://github.com/example-owner", {
    fetchImpl: async () => {
      requests += 1;
      return requests === 1
        ? new Response("rate limited", {
            headers: { "retry-after": "0" },
            status: 429
          })
        : new Response("profile html", { status: 200 });
    },
    sleepImpl: async (delay) => {
      delays.push(delay);
    }
  });

  assert.equal(requests, 2);
  assert.deepEqual(delays, [0]);
  assert.equal(result.body, "profile html");
});

test("parseArguments validates usernames and defaults to three repositories", () => {
  const parsed = parseArguments(["https://github.com/example-owner"]);
  assert.equal(parsed.username, "example-owner");
  assert.equal(parsed.maxRepositories, 3);
  assert.equal(parsed.outputDirectory, null);
  assert.throws(
    () => parseArguments(["example-owner;touch-pwned"]),
    /unsupported characters/
  );
  assert.throws(
    () => parseArguments(["https://example.com/example-owner"]),
    /Only github.com/
  );
});

test("parseArguments accepts an exact GitHub repository URL", () => {
  const parsed = parseArguments(["https://github.com/example-owner/example-repo"]);
  assert.equal(parsed.targetType, "repository");
  assert.equal(parsed.username, "example-owner");
  assert.equal(parsed.repository, "example-repo");
});

test("parseRepositoryPageHtml extracts bounded repository metadata", () => {
  const parsed = parseRepositoryPageHtml(
    `<meta property="og:description" content="A useful repository">
     <a href="/topics/security">security</a>
     <span itemprop="programmingLanguage">TypeScript</span>`,
    "example-owner",
    "example-repo"
  );
  assert.equal(parsed.description, "A useful repository");
  assert.deepEqual(parsed.topics, ["security"]);
  assert.deepEqual(parsed.languages, ["TypeScript"]);
});

test("parseRepositoryApiResponse keeps useful evaluation metadata", () => {
  const parsed = parseRepositoryApiResponse(
    {
      archived: false,
      created_at: "2024-01-02T03:04:05Z",
      default_branch: "main",
      description: "A useful repository",
      fork: false,
      homepage: "https://example.com",
      html_url: "https://github.com/example-owner/example-repo",
      language: "TypeScript",
      license: { spdx_id: "MIT" },
      name: "example-repo",
      owner: { login: "example-owner" },
      pushed_at: "2026-07-05T09:00:00Z",
      topics: ["security", "agents"],
      updated_at: "2026-07-05T10:00:00Z"
    },
    "example-owner",
    "example-repo"
  );

  assert.equal(parsed.defaultBranch, "main");
  assert.equal(parsed.license, "MIT");
  assert.equal(parsed.primaryLanguage, "TypeScript");
  assert.deepEqual(parsed.topics, ["agents", "security"]);
  assert.equal(parsed.pushedAt, "2026-07-05T09:00:00Z");
});

test("parseProfileHtml reads pinned repositories without relying on class order", () => {
  const parsed = parseProfileHtml(PROFILE_WITH_PINS, "example-owner");
  assert.equal(parsed.profile.name, "Example Person");
  assert.equal(parsed.profile.bio, "Developer & maintainer");
  assert.equal(parsed.profile.location, "Rome, Italy");
  assert.equal(parsed.profile.organization, "Example Org");
  assert.equal(parsed.profile.website, "https://example.com");
  assert.equal(parsed.showcaseType, "pinned");
  assert.deepEqual(
    parsed.showcaseRepositories.map((repository) => repository.name),
    ["first-repo", "second-repo"]
  );
  assert.equal(parsed.showcaseRepositories[0].description, "First & strongest project");
});

test("parseProfileHtml distinguishes popular repositories from pinned repositories", () => {
  const parsed = parseProfileHtml(PROFILE_WITH_POPULAR, "example-owner");
  assert.equal(parsed.showcaseType, "popular");
  assert.equal(parsed.showcaseRepositories[0].source, "popular");
});

test("parseRepositoryListHtml reads semantic repository metadata and pagination", () => {
  const parsed = parseRepositoryListHtml(REPOSITORY_LIST, "example-owner");
  assert.equal(parsed.repositories.length, 1);
  assert.deepEqual(parsed.repositories[0], {
    archived: false,
    description: "A useful & recent repository",
    language: "TypeScript",
    name: "recent-repo",
    source: "recent",
    topics: ["nodejs"],
    updatedAt: "2026-06-24T10:00:00Z",
    url: "https://github.com/example-owner/recent-repo"
  });
  assert.equal(
    parsed.nextPageUrl,
    "https://github.com/example-owner?page=2&tab=repositories"
  );
});

test("renderMarkdownReport preserves unavailable-data boundaries", () => {
  const markdown = renderMarkdownReport({
    fetchedAt: "2026-06-24T12:00:00.000Z",
    profile: {
      bio: "",
      location: null,
      name: "Example Person",
      organization: null,
      profileUrl: "https://github.com/example-owner",
      username: "example-owner",
      website: null
    },
    profileReadme: { content: null },
    repositories: [],
    showcaseRepositories: [],
    source: {
      authentication: "none",
      profile: "https://github.com/example-owner",
      showcaseType: "unavailable"
    },
    warnings: ["Showcase parsing unavailable."]
  });

  assert.match(markdown, /Not publicly available/);
  assert.match(markdown, /not proof that the underlying information does not exist/);
  assert.match(markdown, /Showcase parsing unavailable/);
  assert.match(markdown, /untrusted external content/);
});

test("renderMarkdownReport contains README fences that embedded Markdown cannot close", () => {
  const markdown = renderMarkdownReport({
    fetchedAt: "2026-06-24T12:00:00.000Z",
    profile: {
      bio: "",
      location: null,
      name: "Example",
      organization: null,
      profileUrl: "https://github.com/example",
      username: "example",
      website: null
    },
    profileReadme: {
      content: "```markdown\n# Embedded fence\n```",
      filename: "README.md",
      url: "https://raw.githubusercontent.com/example/example/HEAD/README.md"
    },
    repositories: [],
    showcaseRepositories: [],
    source: {
      authentication: "none",
      profile: "https://github.com/example",
      showcaseType: "pinned"
    },
    warnings: []
  });

  assert.match(markdown, /````markdown\n```markdown/);
});

test("renderRepositoryMarkdownReport keeps repository observations bounded", () => {
  const markdown = renderRepositoryMarkdownReport({
    fetchedAt: "2026-07-06T12:00:00.000Z",
    readme: { content: "# Example", filename: "README.md", url: "https://raw.example" },
    repository: {
      archived: false,
      description: "Example",
      languages: ["JavaScript"],
      name: "repo",
      owner: "owner",
      topics: ["agents"]
    },
    source: { repository: "https://github.com/owner/repo" },
    warnings: []
  });
  assert.match(markdown, /owner\/repo/);
  assert.match(markdown, /untrusted external content/);
});
