# Renato Mignone - Security Researcher building toward Agentic AI and Cybersecurity from Applied Security Foundations

## QUICK REFERENCE
```yaml
name: Renato Mignone
current_location: Dusseldorf, North Rhine-Westphalia, Germany
positioning_summary: "Security researcher with verified foundations in applied cryptography, privacy-preserving systems, systems security, and AI-driven threat detection. Currently building practical experience with agentic AI workflows and aiming to grow toward the intersection of agentic AI and cybersecurity: using AI agents to improve security workflows and studying how agentic systems can be made safer, more auditable, and more controllable."
target_roles:
  core_identity:
    - Security Researcher
    - Security Research Engineer
    - AI Security Engineer
  growth_direction:
    - Agentic AI Security Researcher
    - AI-Assisted Cybersecurity Researcher
    - Cybersecurity Research Engineer for Agentic AI Systems
    - Secure Agentic Systems Engineer
  foundation_roles:
    - Applied Cryptography Research Engineer
    - Privacy-Preserving Systems Researcher
    - Systems Security Research Engineer
    - Detection Engineering Researcher
open_to_relocation: true
education:
  - "[DEGREE] Master of Engineering, Cybersecurity Engineering | Politecnico di Torino | GPA 29.48/30 | Sep 2024-Oct 2026 expected"
  - "[DEGREE] Bachelor of Engineering, Computer Engineering | Universita degli Studi del Sannio-Benevento | 101/110 | Sep 2021-Jun 2024"
gpa_summary: "MSc Cybersecurity Engineering: 29.48/30; BSc Computer Engineering: 101/110; strongest MSc anchors include Cryptography, Network and Cloud Security, Hardware Security, Wireless Security, Web Applications, AI and Cybersecurity, Security Verification and Testing, and Advanced Information Systems Security at 30L/30"
professional:
  - "[ROLE] Security Engineer Intern / Security Research Engineer, Privacy-Preserving Technologies and Post-Quantum Anonymous Tokens | Huawei Research / Huawei Data Privacy Lab | Feb 2026-Present; end-date conflict needs confirmation"
  - "[ROLE] Logistics and Fundraising | Mu Nu Chapter of IEEE-Eta Kappa Nu | Apr 2025-Present"
  - "[ROLE] Lifetime Inducted Member | IEEE-Eta Kappa Nu | Dec 2025-Present"
top_skill_clusters:
  current_and_target_agentic_ai_direction:
    current_practical_experience:
      - Agentic AI workflows
      - Agent context engineering
      - Structured agent skills
      - Tool calling
      - Context routing
      - Token budgeting
      - Reproducible agent workflows
      - Human-in-the-loop validation
    target_security_direction:
      - Agentic AI Security
      - AI-assisted cybersecurity
      - Secure agent workflows
      - Tool-use security
      - Prompt injection and context poisoning analysis
      - Agent permissions and policy enforcement
      - Agent provenance and auditability
      - Multi-agent failure analysis
  ai_for_security:
    - AI-driven threat detection
    - Malware classification
    - Intrusion detection
    - SSH honeypot analysis
    - MITRE ATT&CK mapping
    - Security automation
    - AI-assisted vulnerability research
    - AI-assisted digital forensics
  systems_security:
    - Linux security
    - eBPF verifier analysis
    - Kernel security
    - Sandboxing
    - Reverse engineering
    - Fuzzing
    - Symbolic execution
    - Secure coding
  applied_cryptography_and_privacy:
    - Post-Quantum Cryptography
    - Zero-Knowledge Proofs
    - Blind Signatures
    - OPRFs
    - Anonymous Credentials
    - Privacy-Enhancing Technologies
    - Anonymous Authentication
    - Cryptographic Protocol Design
tools: [Python, C, C++, Rust, TypeScript, JavaScript, React, Node.js, Astro, PostgreSQL, SQLite, Docker, Linux, Bash, PyTorch, scikit-learn, BERT, UniXcoder, GNN, RNN, LSTM, FFNN, LangChain, LangGraph, Langfuse, Codex, Claude Code, Gemini CLI, OpenCode, Ghidra, GDB, radare2, Wireshark, Nmap, GNS3, QEMU, FreeRTOS, OpenSSL, bpftool]
competitions:
  - "57th/2000 teams - Reply AI Agents Challenge 2026"
  - "1st Place - IEEE-HKN International Hackathon 2025"
  - "88th/2000 teams - Reply Hack The Code Challenge 2025"
certifications:
  - "GNU/Linux Advanced Course | Politecnico di Torino / WEEE Open / NetStudent / open@polito | May 2025"
  - "GNU/Linux Base Course | Politecnico di Torino | Jan 2025"
  - "FIRST Cambridge English Certificate B2 | Cambridge University Press & Assessment | Jun 2024 | ID: C7109952"
languages:
  - "Italian: Native"
  - "English: B2 certified, C1 speaking score reported"
  - "German: Basic"
  - "French: Basic"
github: https://github.com/RenatoMignone
linkedin: https://www.linkedin.com/in/renato-mignone
portfolio: https://renatomignone.github.io
public_email: renato.mignone@gmail.com
```

Portable source-of-truth for Renato Mignone's academic, professional, research, technical, and achievement context. Use it to generate LinkedIn, CV, GitHub, web portfolio, and other career outputs; verify or mark hard claims before reuse.

## [DEGREE] Master of Engineering, Cybersecurity Engineering - Politecnico di Torino
Sep 2024-Oct 2026 expected. MSc Cyber Security Engineering, LM-32, English-taught and ECSO-aligned, with a reported GPA of 29.48/30 and top 5% cohort positioning.

### [THESIS] Post-Quantum Policy-Based Anonymous Tokens: Design, Implementation, and Policy-Layer Overhead Evaluation
Full title: Post-Quantum Policy-Based Anonymous Tokens - Design, Implementation, and Policy-Layer Overhead Evaluation.
Supervisors: Prof. Fulvio Valenza, academic supervisor; David Kretzler, company supervisor.
Area: privacy-preserving technologies, data protection, anonymous authorization, policy-based anonymous tokens, zero-knowledge proofs, AI-era tool-access security, and post-quantum cryptography as the long-term security requirement; connected to Huawei Research / Huawei Data Privacy Lab.
TL;DR: Designed and evaluated a privacy-preserving authorization mechanism for data-intensive and AI-era systems: a client receives a tag-independent master credential and locally derives tag-bound tokens for public policy tags, letting a verifier check limited authorization, quota, endpoint-access, or tool-call facts without learning the client secret, master credential, issuance session, or a stable user identity. The post-quantum layer is part of making this privacy-preserving design durable against future cryptographic threats, not the only purpose of the work.
Notes: Implemented and measured the policy layer through a zkDilithium-family anonymous-token baseline, zk-D.C-AT, against a HiddenNonce policy-based variant, zk-D.C-PBAT, to isolate the cost of adding PBAT policy binding and unlinkability inside one proof family. The measured policy layer increased trace width by 31.1%, proof size by 22.4%, constraint-evaluation time by about 2x, and public verification time by 16.4%; proof-generation wall-clock time is treated with a caveat because Fiat-Shamir grinding dominated observed runtime. The thesis also specifies the protocol structure, states a quantum-adversary security model, gives a model-level unlinkability argument, and records unforgeability and policy binding as partial reductions tied to the final public-verifiability primitive. MPC-AT / OPRF work is kept as a plain-token reference and public-verifiability extension path, not as a measured PBAT overhead result. Deployment interpretation emphasizes data-protection and user-privacy goals: security services often need to verify a limited policy fact, but that check should not become a durable tracking handle through account IDs, device IDs, bearer credentials, or excessive authorization telemetry. Agentic-AI relevance is the tool-gateway use case: PBAT can complement OAuth for non-account-specific policy or quota checks in agent/tool/API workflows, supporting scoped authorization, replay control, least-privilege policy tags, reduced credential exposure, and privacy-preserving tool-call authorization where the provider needs policy validity rather than user identity.

### MSc Coursework and Grade Anchors
#### [COURSE] Information Systems Security | Grade: 29/30 | Code: 02TYMUV
Topics: sniffing, spoofing, denial of service, risk analysis, steganography, cryptography, X.509 certificates, certification authorities, PKI, Kerberos, tokens, smart cards, PAP, CHAP, EAP, IEEE 802.1x, firewalls, IDS, VPN, PGP, S/MIME, SSL, TLS, SSH, web application security, social sciences for cybersecurity, trust in expert systems.

#### [COURSE] Computer Networks and Cloud Technologies | Grade: 30L/30 | Code: 01NXIUV
Topics: IPv4 and IPv6 network design, routing, LAN and VLAN design, QoS, computing virtualization, SDN, NFV, and cloud computing models and technologies.

#### [COURSE] Machine Learning for Networking | Grade: 27/30 | Code: 01DSMUV
Topics: supervised, unsupervised, and semi-supervised learning; encrypted traffic analysis; FFNNs, RNNs, LSTM, GRU, TF-IDF, Word2Vec, BERT, UniXcoder, GraphSAGE, GCN, anomaly detection, One-Class SVM, autoencoders, DBSCAN, class imbalance, ROC/AUC, intrusion detection, malware classification, honeypot data analysis, PyTorch, scikit-learn, and Pandas.

#### [COURSE] Computer Architectures and Operating Systems | Grade: 30/30 | Code: 01GYKUV
Topics: pipelining, superscalar execution, cache hierarchies, MMU, ARM Cortex-M7, Thumb-2, Harvard architecture, MPU, FreeRTOS, task scheduling, NVIC, UART, DMA, linker scripts, QEMU, GDB, and ARM GCC cross-compilation.

#### [COURSE] Network and Cloud Security | Grade: 30L/30 | Code: 01NXIUV
Topics: packet filtering, IDS/IPS, firewall design, IPsec VPN, IKEv1/IKEv2, ESP, AES-256, Perfect Forward Secrecy, Diffie-Hellman, TLS VPN, OpenVPN, SSL-VPN, X.509 PKI, cloud security, NAT traversal, anti-replay protection, Dead Peer Detection, and Wireshark packet analysis.

#### [COURSE] Hardware Security | Grade: 30L/30 | Code: 01GYSUV
Topics: CIA triad, VLSI design, IP cores, IP watermarking, PCB security, secure elements, TPM, Trusted Computing Base, hardware counterfeiting, TRNGs, PUFs, side-channel attacks, fault attacks, invasive attacks, microprobing, reverse engineering, hardware trojans, Verilog, and test-infrastructure exploits.

#### [COURSE] Wireless Security | Grade: 30L/30 | Code: 01GYSUV
Topics: physical-layer security, jamming, anti-jamming, GNSS/GPS/Galileo, GNSS spoofing, 802.11, WEP, WPA, 802.11i, 802.11w, rogue access points, Bluetooth/BLE, 3G/4G/5G authentication, WLS positioning, pseudorange analysis, iperf, Wireshark, and MATLAB.

#### [COURSE] Cryptography | Grade: 30L/30 | Code: 07LPYUV
Professors: Antonio Jose' Di Scala, Carlo Sanna.

Topics: Kerckhoff's principle, attack models (COA/KPA/CPA/CCA), IND goals, confidentiality, authentication, integrity, nonrepudiation, C/Python cryptographic programming, modular arithmetic, finite fields, CRT, Euler/Fermat results, quadratic residues, cyclic groups, discrete logarithms, elliptic curves, DES/AES, ECB/CBC/CTR/OFB/CFB/GCM/CCM, RC4/Salsa/ChaCha20, Keccak, SHA1/SHA2/SHA3, HMAC, length-extension attacks, Diffie-Hellman, RSA, Rabin, ElGamal, KEM/DEM, commitments, blind signatures, SAE, and SRP.

#### [COURSE] Web Applications | Grade: 30L/30 | Code: 01GYOUV
Topics: HTTP/HTTPS, REST API design, HTML5, CSS3, JavaScript, React, SPA, Node.js, Express.js, SQLite3, ORM, session authentication, bcrypt, JWT, TOTP, RBAC, OWASP Top 10, SQL injection, XSS, CSRF, CSP, HSTS, parameterized queries, Webpack, Vite, and CORS.

#### [COURSE] Advanced Information Systems Security | Grade: 30L/30 | Code: 02GYYUV
Topics: PKI features and threats, secure electronic documents, TLS, SSH, passkeys, federated authentication, SAML, OIDC, software security pitfalls, trusted computing, TEE, Confidential Computing, GDPR, NIS2, post-quantum security, SSI, DID, VC, VP, and Triangle of Trust.

#### [COURSE] AI and Cybersecurity | Grade: 30L/30 | Code: 01GYZUV
Topics: AI and machine learning for cybersecurity, deep learning theory and implementation, deep NLP and embeddings, supervised and unsupervised anomaly detection, data science pipelines, traffic classification, NLP and clustering for botnet detection, and unsupervised anomaly detection.

#### [COURSE] Security Verification and Testing | Grade: 30L/30 | Code: 02TYAUV
Topics: secure coding standards, ISO/IEC TS 17961, CERT C/C++, CWE, CVE, SAST, CFG, data-flow analysis, taint analysis, symbolic execution, AFL/AFL++, LibFuzzer, DAST, Valgrind, AddressSanitizer, Ghidra, IDA Pro, radare2, reverse engineering, binary diffing, buffer overflows, ROP, use-after-free, eBPF verifier analysis, kernel module testing, formal verification, model checking, theorem proving, and CI/CD security.

#### [COURSE] Cybersecurity Laws and Regulations | Grade: 27/30 | Code: 01GZBUV
Topics: GDPR, DPIA, DPO, NIS1, NIS2, Cybersecurity Act, ENISA, ePrivacy Directive, DORA, Cyber Resilience Act, AI Act, Budapest Convention on Cybercrime, Italian computer-crime law, ISO/IEC 27001/27002, NIST CSF, CIS Controls, SOC 2, CER Directive, digital evidence, chain of custody, intellectual property, and responsible disclosure.

#### [COURSE] Computer Forensics and Cyber Crime Analysis | Grade: To be completed | Code: 01GZDUV
Topics: digital forensics, Locard's exchange principle, chain of custody, forensic imaging, write blockers, hashing, FAT, NTFS, ext4, APFS, file carving, MAC times, volatile memory acquisition, Volatility, Rekall, rootkit detection, packet capture analysis, network-flow reconstruction, syslog, Windows Event Logs, registry analysis, mobile forensics, steganography, timestomping, timeline analysis, Autopsy, Sleuth Kit, FTK, EnCase, Wireshark, CAINE, and DEFT.

##### [PROJECT] Linux eBPF Verifier Bypass Research
Repo: https://github.com/RenatoMignone/Linux-eBPF-Verifier-Bypass-Research
Stack/areas: Linux kernel 6.8, eBPF, XDP, kernel internals, exploit research, TeX; verifier logic, PoC exploitation, kernel hardening.
Notes: Analyzed eBPF verifier edge cases and hardening guidance; triaged 60+ candidates into 5 confirmed exploitable local privilege-escalation vulnerabilities; developed PoCs using QEMU, bpftool, GDB, C, assembly, and custom static analysis tooling.

##### [PROJECT] AI-Driven Threat Detection
Repo: https://github.com/RenatoMignone/AI-Driven-Threat-Detection-Research
Stack/areas: Python, PyTorch, scikit-learn, BERT, UniXcoder, GNN, RNN, FFNN, MITRE ATT&CK; malware detection, zero-day intrusion detection, anomaly detection, SOC-oriented model evaluation, machine learning, artificial intelligence, cybersecyrity ai intersection.
Notes: Built and benchmarked FFNN/GNN/RNN/transformer pipelines for malware triage, intrusion alerting, and tactic attribution; achieved 98.1% malware classification, 97.5% network-flow classification, 95% unsupervised anomaly precision, feature-bias mitigation, 4 ACM-formatted reproducible reports, and BERT/UniXcoder mapping of bash command sequences to adversary tactics.

##### [PROJECT] SSH Attack Analysis
Repo: https://github.com/RenatoMignone/SSH-Shell-Attacks
Stack/areas: Python, Jupyter Notebook, NLP, sequence models, MITRE ATT&CK; threat intelligence, attacker behavior classification, tactic attribution, intrusion analysis, machine learning, artificial intelligence.
Notes: Machine Learning for Networking project on Unix shell attacks from SSH honeypots; processed ~230,000 sessions and classified 7 MITRE ATT&CK categories using TF-IDF, Word2Vec, BERT embeddings, Doc2Vec, supervised models, clustering, dimensionality reduction, confusion matrices, and an IoC extraction framework.

##### [PROJECT] Secure Timeout - NXP S32K3
Repo: https://github.com/RenatoMignone/Secure-Timeout-System-NXPS32K3X8EVB
Stack/areas: C, NXP S32K3, FreeRTOS, QEMU, embedded systems; embedded security, secure timing, watchdog reliability, hardware security, embedded OS and Linux.
Notes: Computer Architectures and Operating Systems project on NXP S32K3X8EVB emulation, FreeRTOS porting, timer/watchdog validation; validated behavior on hardware and QEMU loops; implemented Cortex-M4-to-M7 FreeRTOS port, 16 isolated MPU memory regions, Errata 837070 mitigation, UART abstraction, interrupt timer subsystem, and priority scheduling; MPU usage, memory protection.

##### [PROJECT] SoftEther VPN Lab
Repo: https://github.com/RenatoMignone/SoftEther-VPN-Guardian
Stack/areas: SoftEther VPN, IPsec, TLS/SSL VPN, Wireshark, network simulation; VPN security, protocol comparison, network forensics, traffic inspection, GNS3
Notes: Designed and compared IPsec/TLS VPN topologies across simulated Internet infrastructure; documented security/performance tradeoffs; implemented IPsec IKEv1 with AES-256 Phase 1/AES-128 Phase 2, SHA-1 HMAC, DH Group 14, NAT traversal, TLS/SSL tunneling over TCP/443 with AES-128-CBC and SHA-256, dual-factor authentication, ESP verification, Dead Peer Detection, restrictive ACLs, and Wireshark validation of TLS handshakes and ESP framing.

##### [PROJECT] Wireless Security Labs
Repo: https://github.com/WDCSecure/LabGNSS
Stack/areas: MATLAB, iperf/iperf3, Wireshark, tcpdump, zizzania, Android GNSS measurements; GNSS spoofing detection, pseudorange analysis, C/N0 signal quality, WLS positioning, WiFi performance measurement, packet analysis.
Notes: Wireless Security labs covering Android GNSS measurement processing and repeatable throughput experiments; ran GNSS spoofing experiments with ADR analysis and WiFi goodput measurements across Ethernet-to-Ethernet, WiFi-to-WiFi, and mixed scenarios, with min/max/average/std-dev reporting across 10+ repetitions.

##### [PROJECT] Cryptographic Implementations and CTFs
Repo: https://github.com/RenatoMignone/Cryptography
Stack/areas: C, Python, OpenSSL, PyCryptodome, cryptography module; symmetric/asymmetric cryptography, RSA, ECC, block-cipher modes, HMAC, length-extension attacks, padding-oracle and weak-implementation analysis, timing attacks, brute-force optimization.
Notes: Cryptography exercises and CTF-style labs covering primitives, implementation pitfalls, and cryptanalysis.

##### [PROJECT] Cybersecurity Forum App
Repo: https://github.com/RenatoMignone/WebApp_Project
Stack/areas: React, Node.js/Express, SQLite3 or PostgreSQL pending repository confirmation, JWT, HTTP-only cookies, bcrypt, TOTP, RBAC, OWASP; web application security, authentication, authorization, session security, secure coding.
Notes: Security-first full-stack forum aligned to OWASP backend patterns and practical abuse resistance; implemented RBAC, JWT sessions, salted bcrypt password hashing, RFC 6238 admin TOTP, Admin/User API middleware, parameterized queries, anonymous comments with nullable foreign keys, and 8+ React components.

Storage engine conflict: PostgreSQL vs SQLite3; confirm against repository before using exact database copy.

##### [PROJECT] ARIA - AI-Resistant Investigator Agent VIDEOGAME.
Repo: https://github.com/RenatoMignone/ARIA_Computer_Forensics_Game
Stack/areas: React 19, TypeScript 5.9, Tailwind CSS 4.2, Vite 7.3, Google Gemini 2.5 Flash API, xterm.js; digital forensics education, AI hallucination recognition, metadata literacy, chain of custody, investigator training, human-AI verification.
Notes: Computer Forensics and Cyber Crime Analysis game simulating a forensic workspace with live/offline AI modes, evidence files, terminal interaction, chain-of-custody tracking, modular React context state, real-time Gemini streaming with fallback timeouts, metadata inspector, terminal emulator, multi-modal evidence, and scoring that requires AI claims to be checked against forensic ground truth.

## Independent/Open-Source Projects
### [PROJECT] VitaeContext
Site: https://vitaecontext.github.io/
Repo: https://github.com/vitaecontext/vitaecontext
Usage docs: https://vitaecontext.github.io/docs/usage/
NPM distribution: https://www.npmjs.com/package/vitaecontext
Role: Co-creator/maintainer with Elia Innocenti.
Stack/areas: Astro/GitHub Pages documentation site, Markdown-first playbooks, modular agent skills, provider-aware SKILL.md exports for Codex, Claude Code, Gemini CLI, and OpenCode, Node.js packaging/install tooling, GitHub Actions; agentic AI, context engineering, career SEO/AEO, LinkedIn/GitHub/CV-ATS/portfolio/X optimization, structured context files.
Notes: MIT-licensed open-source personal-branding SEO toolkit and modular agent skill system. The website is the primary public product: a human-readable knowledge hub with playbooks, skill pages, provider pages, install/usage docs, changelog, structured metadata, sitemap, `robots.txt`, and `llms.txt`. The core method starts with a private `agent-context-file` that stores verified career facts, links, projects, metrics, constraints, target roles, and positioning, then applies focused platform rules for LinkedIn, GitHub, CV/ATS, web portfolio, and X/Twitter. The npm/Node CLI is distribution infrastructure, not the product itself: it exports the same methodology into provider-specific agent-skill layouts and manifests so agents can load scoped instructions instead of rebuilding context from scattered prompts. Positioning: not an auto-apply or generic prompt-pack tool; it is an operating manual for agents and humans to verify professional facts first, then produce consistent, search-ready public profiles and portfolio surfaces.
Research-direction relevance: VitaeContext is not a cybersecurity project, but it is relevant to Renato's agentic AI direction because it explores structured context files, portable agent skills, provider-specific agent instructions, context routing, and reproducible AI-agent workflows. These ideas are adjacent to secure agentic systems because they treat context, constraints, verified facts, and tool instructions as control surfaces.

## [DEGREE] Bachelor of Engineering, Computer Engineering - Universita degli Studi del Sannio-Benevento
Sep 2021-Jun 2024. BSc in Computer Science/Computer Engineering, L-8, with final grade 101/110.

### [THESIS] Extracting Equivocal Behaviours from Trusted Systems
Italian title: Progettazione e realizzazione di un sistema per l'estrazione di equivocal behaviour dai sistemi software.
English version: Design and Implementation of a system to extract equivocal behaviors from trusted systems.
Repo: https://github.com/RenatoMignone/Equivocal-Behaviour-Tool-Thesis
Zenodo: https://zenodo.org/records/19262869
Supervisors: Prof. Corrado Aaron Visaggio, Prof. Andrea di Sorbo, Ing. Gregorio Dalia.
Area: malware analysis, software supply chain security, sandbox orchestration, MITRE ATT&CK mapping.
Notes: Identified undocumented or malicious behaviors hidden in trusted software through reproducible sandbox analysis; designed asynchronous multithreaded Python orchestrator for Hybrid Analysis, VirusTotal, ANY.RUN; analyzed Windows 10/11 binaries; defined/mapped 12 Equivocal Software Behaviours from 60 reviewed MITRE ATT&CK Enterprise Matrix techniques; analyzed 36 SourceForge-categorized goodware binaries using Pandas/Seaborn/Jupyter to clean JSON outputs and map ATT&CK techniques to ESBs; detected system reconnaissance and advanced OS utility exploitation in 100% of analyzed trusted systems.

## Professional Experience
### [ROLE] Security Engineer Intern / Security Research Engineer, Privacy-Preserving Technologies and Post-Quantum Anonymous Tokens - Huawei Research / Huawei Data Privacy Lab
Feb 2026-Present; final end date needs confirmation because one note says Sep 2026. Contract role, on-site in Dusseldorf, North Rhine-Westphalia, Germany.
Notes: Conducts privacy-preserving technology research for secure credentials, anonymous authentication, data-protection-oriented access control, and AI-era authorization problems, with post-quantum cryptography used as the security horizon for long-lived privacy guarantees. Thesis work at Huawei Research produced a PBAT protocol shape and Rust implementation path built on the zkDilithium proof framework, comparing a plain anonymous-token baseline (zk-D.C-AT) with a HiddenNonce policy-based variant (zk-D.C-PBAT). The work isolates the policy-layer overhead of adding tag-bound authorization and unlinkability: +31.1% trace width, +22.4% proof size, about 2x constraint-evaluation time, and +16.4% public verification time in the measured zkDilithium/STARK setup. Research scope includes privacy-preserving authorization, anonymous credentials, policy-based anonymous tokens, zero-knowledge proofs, public verification, unlinkability, policy binding, unforgeability, replay/double-spend boundaries, hash/lattice signatures, OPRF/MPC token architectures, quantum-adversary security modeling, and evidence-class discipline for measured versus paper-reported or future-work values. Data-protection focus: designing authorization checks that reveal only the needed policy fact, such as eligibility, quota, rate-limit bucket, endpoint access, or tool-call class, instead of turning service metadata and access patterns into stable tracking identifiers. Agentic-AI security relevance: analyzed PBAT as a privacy-preserving policy and quota layer for agentic tool gateways, where an AI agent or orchestrator may need authorization to call tools, MCP servers, or APIs without exposing unnecessary user identity; positioned PBAT as complementary to OAuth/account authorization for non-account-specific policy checks, with public policy tags, zero-knowledge proofs, replay state, and tag governance as the security boundary. Date conflict retained for confirmation.

### [ROLE] Lifetime Inducted Member - IEEE-Eta Kappa Nu
Dec 2025-Present. IEEE-Eta Kappa Nu Honor Society, Mu Nu Chapter at Politecnico di Torino.
Notes: Inducted into IEEE-HKN, an honor society for top-performing engineering students/professionals demonstrating academic excellence, leadership, and character. Led Budget HQ, a full-stack financial management app for chapter treasurers that won 1st place globally in the IEEE-HKN International Hackathon 2025; implemented TOTP 2FA, JWT via secure HTTP-only cookies, RBAC middleware isolating admin privileges, React/Node.js backend, PostgreSQL, parameterized queries, Dockerized Alpine Linux containers.

### [ROLE] Logistics and Fundraising - Mu Nu Chapter of IEEE-Eta Kappa Nu
Apr 2025-Present. Turin, Piedmont, Italy, on-site.
Notes: Supports technical operations, logistics, infrastructure, partner coordination, and event execution; coordinated 5+ STEM events with 150-250 participants; managed logistics, network infrastructure, and real-time support; organized university events with ARM, NXP, and STMicroelectronics.

## Research and Publications
### [PAPER] Extracting Equivocal Behaviours from Trusted Systems
Zenodo: https://zenodo.org/records/19262869
Repo: https://github.com/RenatoMignone/Equivocal-Behaviour-Tool-Thesis
Notes: Thesis/capstone record on detecting hidden behaviors in trusted software as a software supply chain security problem; check Zenodo before formal citation formatting.

## Skills Index
**Applied cryptography:** post-quantum cryptography, lattice-based signatures, hash-based signatures, CRYSTALS-Dilithium, SPHINCS+, FIPS 204/205, blind signatures, Pointcheval-Sanders signatures, zero-knowledge proofs, Schnorr-style proofs, STARKs, zkVMs, RiscZero/SP1, MPC, OPRFs, anonymous credentials, anonymous tokens, privacy-enhancing technologies, PKI, OpenSSL, PyCryptodome, RSA, ECC, Diffie-Hellman, HMAC, cryptanalysis, cryptographic protocol design, game-based security models, simulation-based proofs.

**Systems and kernel security:** Linux, kernel security, eBPF, XDP, verifier analysis, vulnerability research, local privilege escalation, proof-of-concept exploitation, binary analysis, reverse engineering, Ghidra, IDA Pro, GDB, radare2, bpftool, QEMU, fuzzing, symbolic execution, secure coding standards.

**AI for cybersecurity:** PyTorch, scikit-learn, PyTorch Geometric, GNN, GraphSAGE, GCN, RNN, LSTM, GRU, FFNN, BERT, UniXcoder, transformers, Doc2Vec, Word2Vec, TF-IDF, malware classification, anomaly detection, intrusion detection, threat detection, adversarial ML, AI hallucination recognition.

**Agentic AI and context engineering:** agent-context files, agent skill systems, prompt/context routing, provider adapters, Codex skills, Claude Code skills, Gemini CLI extensions, OpenCode skills, portable SKILL.md bundles, token budgeting, context-window optimization, structured inputs/outputs, grounded AI-agent workflows, cross-session source-of-truth design.

**Threat analysis and detection:** MITRE ATT&CK, SSH honeypot analysis, tactic classification, threat intelligence, network intrusion detection, detection engineering, incident response, network forensics, IoC extraction.

**Web and application security:** OWASP Top 10, RBAC, JWT, HTTP-only cookies, TOTP 2FA, bcrypt, Helmet.js, rate limiting, parameterized queries, PostgreSQL, SQLite3, secure full-stack engineering.

**Programming and infrastructure:** Python, C, C++, Rust, TypeScript, JavaScript, Java, Bash, SQL, React, Node.js, Express.js, Astro, PostgreSQL, SQLite3, Docker, Alpine Linux containers, Git, GitHub Actions, npm packaging, FreeRTOS, xterm.js, Tailwind CSS, Vite.

**Networking and platforms:** TCP/IP, VPN, IPsec, IKEv1/IKEv2, ESP, TLS/SSL, OpenVPN, SoftEther, strongSwan, Wireshark, Nmap, GNS3, Kali Linux, Ubuntu.

**Digital forensics and compliance:** chain of custody, forensic imaging, hashing, file carving, volatile memory acquisition, Volatility, Rekall, packet capture analysis, Windows Event Logs, registry analysis, timeline analysis, Autopsy, Sleuth Kit, FTK, EnCase, CAINE, DEFT, GDPR, NIS2, DORA, Cyber Resilience Act, AI Act, ISO/IEC 27001/27002, NIST Cybersecurity Framework, CIS Controls, SOC 2.

## Technical Interests and Direction
### [DIRECTION] Security Researcher growing toward Agentic AI and Cybersecurity
Notes: Renato's core identity remains security research. His verified foundations are applied cryptography, privacy-preserving technologies, systems security, AI security coursework, AI-driven threat detection, and security engineering. His current practical work with agentic AI is stronger on agent workflows, context engineering, structured skills, coding agents, and AI-assisted engineering. His forward-looking research direction is to connect these foundations with cybersecurity-relevant agentic systems, especially agents that are useful, auditable, policy-aware, and safe enough for security-critical workflows.

### [INTEREST] Agentic AI for Cybersecurity
Notes: Interested in how AI agents can support cybersecurity workflows such as vulnerability research, secure code review, malware triage, threat detection, incident response, digital forensics, red teaming, security verification, SOC automation, and security research assistance. The focus is not generic automation, but agents that can use tools, inspect evidence, generate hypotheses, test assumptions, and assist human analysts while remaining grounded and auditable.

### [INTEREST] Cybersecurity for Agentic AI Systems
Notes: Interested in the security risks introduced by agentic systems themselves, including prompt injection, malicious context, tool-use abuse, memory poisoning, over-permissioned agents, unsafe autonomy, data exfiltration, untrusted tools, insecure execution environments, and multi-agent failure modes. Topics he wants to develop deeper research competence in include sandboxing, policy enforcement, provenance, permission models, secure memory, auditability, agent identity, and verification of agent behavior.

### [INTEREST] Trust, Identity, and Privacy for AI Agents
Notes: Interested in how concepts from applied cryptography, privacy-preserving credentials, anonymous authentication, authorization, and policy-based access control can inform the design of safer agentic systems. This connects Renato's current work in post-quantum and privacy-preserving authentication with future questions around agent identity, delegated authority, verifiable permissions, and privacy-aware agent workflows.

### [INTEREST] Secure AI-Assisted Engineering
Notes: Interested in how coding agents and AI-assisted engineering tools can be safely integrated into software and security engineering workflows. Focus areas include context engineering, structured agent skills, secure tool use, human-in-the-loop validation, reproducible workflows, benchmark-driven development, and failure analysis.

## Research North Star
Renato's long-term research direction is the intersection of agentic AI and cybersecurity.

This is a target research direction, not a claim that Renato already has mature published work across all these subareas.

The first side is agentic AI for cybersecurity: building and evaluating AI agents that can help with vulnerability research, secure code review, malware analysis, threat detection, incident response, digital forensics, red teaming, and security verification.

The second side is cybersecurity for agentic AI: studying and mitigating the risks created by autonomous or semi-autonomous agents, including malicious context, prompt injection, unsafe tool use, memory poisoning, over-permissioned actions, insecure execution environments, and poor auditability.

This direction does not replace Renato's background in applied cryptography, privacy-preserving technologies, post-quantum authentication, systems security, and AI-driven threat detection. Instead, those areas become the foundation for designing secure, trustworthy, policy-aware, and auditable agentic systems.

## Evidence vs Direction
### Verified Evidence
Renato has verified experience in applied cryptography, post-quantum and privacy-preserving authentication, systems security, AI-driven threat detection, SSH attack analysis, secure web/application engineering, and practical agent workflow tooling through VitaeContext and agentic AI competitions.

### Current Agentic AI Strength
Renato's current agentic AI strength is mainly practical and engineering-oriented: context engineering, structured agent skills, tool use, provider-specific agent workflows, coding agents, token/context management, and reproducible agent workflows.

### Target Development Area
Renato wants to develop deeper research expertise in agentic AI security and AI-assisted cybersecurity, especially secure agent workflows, prompt/context attacks, tool-use security, auditability, provenance, permission models, and agents for cybersecurity operations.

## Positioning Constraints
- Do not frame Renato as having abandoned applied cryptography, privacy, or systems security.
- Do not frame Renato as only a post-quantum cryptography researcher.
- Do not frame Renato as a generic AI enthusiast or generic agentic AI builder.
- Do not overstate verified agentic AI security experience beyond existing projects, coursework, competitions, and independent work.
- Distinguish clearly between verified experience, current practical interest, and target research direction.
- Do not present target agentic AI security topics as already fully owned expertise.
- When writing public-facing material, use phrases like "building toward", "interested in", "developing deeper expertise in", or "growing toward" for agentic AI security topics unless backed by a verified project.
- Frame the current transition as: security researcher with strong foundations moving toward agentic AI and cybersecurity.
- Prefer "agentic AI and cybersecurity" over generic "AI agents".
- Always preserve the two-sided direction: using agents for cybersecurity and securing agentic systems themselves.

## Certifications and Achievements
### [COMPETITION] Reply AI Agents Challenge 2026
Issued Apr 2026; 57th/2,000 teams; top 3% in 6-hour autonomous AI-agent challenge. Repo: https://github.com/RenatoMignone/AI_Agents_Hackathon
Notes: Built a ReAct multi-agent system with LangChain/Langfuse for real-time fraud detection; tuned recursion limits, token budgets, and temperature; skills: AI Agents, Agentic AI Development. Related implementation notes describe citizen welfare monitoring/anomaly detection with LangChain, LangGraph, OpenRouter, Langfuse, ReAct execution, token/cost/latency tracking, and LLM reasoning-chain optimization. Domain conflict: fraud detection vs citizen welfare monitoring.

### [AWARD] 1st Place - IEEE-HKN International Hackathon 2025
Issued Nov 2025 by IEEE-Eta Kappa Nu; 1st place internationally for Budget HQ, a secure financial management platform for IEEE-HKN chapter treasurers. Repo: https://github.com/RenatoMignone/team9-spaghetti-overflow
Built with React, Node.js, PostgreSQL, JWT HTTP-only cookies, TOTP 2FA, RBAC middleware, and Dockerized deployment; associated with IEEE-Eta Kappa Nu.

### [COMPETITION] Reply Hack The Code Challenge 2025
Issued Mar 2025; ranked 88th/2,000 teams; score 56,196,106; top-100 international team challenge combining algorithmic optimization and CTF cybersecurity tasks. Challenge URL: https://challenges.reply.com/challenges/hack-the-code-standard/home/

### [CERT] GNU/Linux Advanced Course
Issued May 2025 by Politecnico di Torino / WEEE Open / NetStudent / open@polito; topics: GNU/Linux administration, shell workflows, system tooling, open-source collaboration.

### [CERT] GNU/Linux Base Course
Issued Jan 2025 by Politecnico di Torino; topics: GNU/Linux base workflows and system fundamentals.

### [CERT] FIRST Cambridge English Certificate B2
Issued Jun 2024 by Cambridge University Press & Assessment; credential ID C7109952; overall score 172; Speaking C1.

## Languages
- Italian: Native.
- English: B2 certified; FIRST Cambridge English Certificate B2, ID C7109952; score 172; Speaking C1/181, Listening 177, Writing 171, Reading 168, Use of English 164.
- German: Basic.
- French: Basic.

## Extracurricular and Leadership
### [ORG] IEEE-HKN Honor Society, Mu Nu Chapter
Apr 2025-Present for chapter responsibilities; Dec 2025-Present for lifetime inducted member status.
Notes: Honor-society membership plus technical event operations and secure project leadership; supports operations, partner coordination, logistics, and infrastructure; coordinated 5+ STEM events with 150-250 participants; organized major university events with ARM, NXP, STMicroelectronics; led/co-led Budget HQ delivery for IEEE-HKN International Hackathon 2025, winning 1st place.

## Public Profile Snapshot
### [PROFILE] LinkedIn
https://www.linkedin.com/in/renato-mignone 

### [PROFILE] GitHub
https://github.com/RenatoMignone

### [PROFILE] Portfolio
https://renatomignone.github.io