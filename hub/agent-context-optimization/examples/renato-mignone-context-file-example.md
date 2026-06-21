# Renato Mignone — Security researcher building toward agentic AI and cybersecurity from applied security foundations

> Public example derived from a real local context file. Some exact identifiers and verification-only details are intentionally redacted for repository use.

## QUICK REFERENCE

```yaml
name: Renato Mignone
current_location: Düsseldorf, Germany
positioning_summary: "Security researcher with verified foundations in applied cryptography, privacy-preserving systems, systems security, and AI-driven threat detection, building toward the intersection of agentic AI and cybersecurity."
target_roles: [Security Research Engineer, AI Security Engineer, Applied Cryptography Research Engineer]
growth_direction: "Agentic AI security and AI-assisted cybersecurity research."
emerging_interests: [secure tool use, prompt injection, context poisoning, agent auditability, agent permissions, policy enforcement]
evidence_boundaries: "Applied cryptography, systems security, and AI-driven threat detection are verified through coursework, thesis, research, and projects. Agentic AI security is a growth direction and should be framed as building toward unless a specific verified project supports a stronger claim."
positioning_constraints: "Preserve the security-research foundation and avoid flattening the profile into generic AI enthusiasm."
claims_to_avoid: [mature agentic AI security expert, production agent-security ownership, post-quantum cryptography specialist without context]
linkedin: https://www.linkedin.com/in/renato-mignone/
website: https://renatomignone.github.io/
github: https://github.com/RenatoMignone
open_to_relocation: true

education:
  - "[DEGREE] BSc in Computer Engineering (L-8) | Università degli Studi del Sannio | 101/110 | June 2024"
  - "[DEGREE] MSc in Cybersecurity Engineering (LM-32) | Politecnico di Torino | GPA 29.48/30 | Expected October 2026"

gpa_summary: "Information Systems Security: 29/30, Computer Networks and Cloud Technologies: 30L/30, Machine Learning for Networking: 27/30, Computer Architectures and OS: 30/30, Network and Cloud Security: 30L/30, Hardware Security: 30L/30, Wireless Security: 30L/30, Cryptography: 30L/30, Web Applications: 30L/30, Advanced Information Systems Security: 30L/30, AI and Cybersecurity: 30L/30, Security Verification and Testing: 30L/30, Cybersecurity Laws and Regulations: 27/30"

professional:
  - "[ROLE] Security Research Engineer | Huawei Data Privacy Lab | February 2026 – September 2026"

top_skills: [post-quantum cryptography, Agentic AI, zero-knowledge proofs, blind signatures, OPRFs, eBPF kernel exploitation, AI for cybersecurity, network security, VPN protocols, hardware security, cryptographic protocol design, formal verification, Python, Rust]
tools: [Python, Rust, QEMU, GDB, PyTorch, Scikit-learn, LangChain, LangGraph, OpenSSL, GNS3, Wireshark]

competitions:
  - "1st Place — IEEE-HKN International Budget Hack 2025 (November 2025)"
  - "Top 100 — Reply Hack The Code Challenge 2025 (March 2025)"
  - "57th Place out of 2,000 teams — Reply Code Challenge 2026, AI Agents Track (2026)"

certifications:
  - "Cambridge English B2 First (FCE) | Cambridge University Press & Assessment | June 2024 | Score available on request"
  - "GNU/Linux Advanced Certificate | WEEE Open, NetStudent, open@polito | May 2025"

languages:
  - "Italian: Native"
  - "English: B2 / C1 speaking (Cambridge FCE)"
  - "French: Basic"

```

## Goals and targeting

**Ideal role:** Security Research Engineer working at the intersection of AI systems and cybersecurity.
**Current focus:** Applied cryptography, privacy-preserving systems, systems security, and AI-driven threat detection, with practical experimentation in agentic AI workflows.
**Want to work on next:** secure tool use, prompt injection and context poisoning analysis, agent permissions, policy enforcement, and auditability for agentic systems.
**Growth direction:** Agentic AI security and AI-assisted cybersecurity research.
**Target locations:** Europe or remote-friendly international roles; relocation open for strong research opportunities.
**Interests:** applied cryptography, privacy-preserving authorization, post-quantum security, systems security, AI-assisted cybersecurity, agentic AI workflows.
**Evidence boundaries:** Applied cryptography, systems security, and AI-driven threat detection are verified. Agentic AI security is a direction supported by AgentKit SEO and agent-workflow experimentation, but should be framed as building toward unless tied to a specific verified artifact.
**Positioning constraints:** Preserve the security-research foundation. Do not over-index on the current post-quantum cryptography thesis when tailoring for broader AI security roles.
**Claims to avoid:** Mature agentic AI security expert; production ownership of agent-security systems; generic AI enthusiast language.
**Constraints:** No restriction documented in this public example beyond the evidence boundaries above.

Personal knowledge base for Renato Mignone's academic and professional cybersecurity career. Not for direct third-party distribution. Use as a verified source of truth for cover letters, CVs, LinkedIn sections, role-specific applications, and interview preparation.

<!-- VERIFIED FACTS: bsc_graduation=2024-06, bsc_grade=101/110, msc_gpa=29.48/30, msc_expected_graduation=2026-10, selected_course_grades_verified=true, english_certificate_present=true, ieee_hackathon_result=1st_place, ieee_hackathon_year=2025, reply_challenge_top100=true, reply_challenge_year=2025 -->

## [DEGREE] BSc in Computer Engineering (L-8 — Classe delle lauree in ingegneria dell'informazione) | Università degli Studi del Sannio, Benevento, Italy | 101/110 | September 2021 – June 2024

The bachelor's degree provided foundational training in computer engineering, covering programming (C, Java, Python), computer architecture, and information systems. The cybersecurity-relevant component is the research thesis, detailed below.

### [THESIS] Extracting equivocal behaviours from trusted systems
**Full title:** *Progettazione e realizzazione di un sistema per l'estrazione di equivocal behaviour dai sistemi software*
**Supervisors:** Prof. Corrado Aaron Visaggio, Prof. Andrea di Sorbo, Ing. Gregorio Dalia
**Research area:** Software Supply Chain Security, Malware Analysis, Behavioural Analysis
**TL;DR:** Designed a multithreaded Python tool to automate parallel sandbox analysis of 36 goodware binaries, classifying 12 equivocal software behaviours using the MITRE ATT&CK framework.

#### Context, Method, and Results

Thesis on software supply-chain attacks and Software Transparency/SBOM adoption. It cites ENISA/CISA data showing supply-chain attacks rising from 1% of total attacks in 2020 to 17% in 2021, with SolarWinds Orion, Colonial Pipeline, and Log4j as examples. Focus was not overt malware detection but **equivocal behaviours**: hidden actions by trusted goodware that deviate from stated specifications or raise privacy, integrity, and confidentiality concerns.

MITRE ATT&CK Enterprise Matrix v4.0; 60 techniques reviewed by peer review/card sorting; 12 Equivocal Software Behaviours defined:
- ESB1 System Analysis and Resource Discovery: OS/hardware/resource reconnaissance, driver enumeration, environment variables; **100%** of analysed systems.
- ESB2 Network Enumeration and Analysis: topology acquisition, service detection, port scanning, sniffing; limited percentage.
- ESB3 Network Traffic Manipulation: non-standard traffic, covert channels, tunneling; **0%** detected.
- ESB4 Scripting and Code Execution: PowerShell/Bash/interpreter or IPC execution; variable detection.
- ESB5 Task Scheduling and System Automation: timed/boot scheduling and persistence-relevant automation; detected in system software for covert updates.
- ESB6 Advanced OS Utility Exploitation: WMI/BITS and advanced OS primitives bypassing normal application controls; **100%** of analysed systems.
- ESB7 Privilege Manipulation: silent directory-permission, token, or auth-mechanism changes; limited percentage.
- ESB8 Software Extension and Interaction: untracked extensions/add-ons/remote management tools, backdoor exposure; moderate.
- ESB9 Control Evasion and Analysis Avoidance: debugger/sandbox/anti-malware detection, obfuscation, direct volume access; limited but critical.
- ESB10 Logging Evasion and Indirect Execution: disabling/deleting system or network logs; very low.
- ESB11 Encryption Manipulation: downgrade attempts or session-key alteration; **0%** detected.
- ESB12 Media Capture: silent audio/video/screen capture, often invasive marketing telemetry; low but present.

Tooling: custom OOP Python orchestrator, asynchronous and multithreaded, using HTTP REST APIs for parallel binary analysis. Hybrid Analysis/Falcon Sandbox supplied static analysis (strings, control flow, API calls) and dynamic monitoring (kernel/user processes, registry, network) on Windows 10/11 via Environment IDs. VirusTotal integrated CAPA, CAPE, and ZENBOX. ANY.RUN added interactive real-time analysis; a synchronized queue handled its non-native parallelization and collected memory dumps, PCAPs, and forensic logs. Joe Sandbox was discarded due to inaccessible premium API tier; Cuckoo Sandbox due to dependency instability.

Dataset/results: 36 goodware binaries categorized by SourceForge taxonomy: system software 20%, productivity 15%, multimedia 15%, internet 13%, communications 11%, others. JSON outputs were cleaned and processed with Pandas/Seaborn in Jupyter to map ATT&CK techniques to ESBs. Trusted software, including major browsers and streaming platforms, systematically showed malware-like reconnaissance behaviours, especially ESB1 and ESB6 at 100%, supporting the claim that undeclared behaviours create privacy risks and silent enterprise attack vectors when transparent SBOM-style declarations are absent.



## [DEGREE] MSc in Cybersecurity Engineering (LM-32 — Ingegneria informatica) | Politecnico di Torino, Turin, Italy

GPA 29.48/30 | September 2024 – Expected October 2026

The master's degree in cybersecurity engineering focuses on threat analysis, cryptography, network security, hardware security, and AI-driven defence, delivered entirely in English and aligned with ECSO standards.

### First year — first semester

#### [COURSE] Information Systems Security | Grade: 29/30 | Code: 02TYMUV
Topics: sniffing, spoofing, denial of service, risk analysis, steganography, cryptography, digest, X.509 certificates, certification authorities, PKI, authentication, Kerberos, tokens, smart cards, PAP, CHAP, EAP, IEEE 802.1x, firewalls, IDS, VPN, PGP, S/MIME, SSL, TLS, SSH, web application security, social sciences for cybersecurity, cognitive biases, Risk Society, trust in expert systems

#### [COURSE] Computer Networks and Cloud Technologies | Grade: 30L/30 | Code: 01NXIUV
Topics: IPv4 network design, routing on the Internet, IPv6 protocol, IPv4/IPv6 coexistence, LAN and VLAN design, quality of service (QoS), computing virtualisation, Software Defined Networking (SDN), Network Functions Virtualisation (NFV), cloud computing models and technologies

#### [COURSE] Machine Learning for Networking | Grade: 27/30 | Code: 01DSMUV
Topics: supervised learning, unsupervised learning, semi-supervised learning, network traffic classification, feature engineering, IAT, packet length distributions, encrypted traffic analysis, FFNNs, RNNs, LSTM, GRU, TF-IDF, Word2Vec, BERT, UniXcoder, GraphSAGE, GCN, anomaly detection, One-Class SVM, autoencoders, DBSCAN, class imbalance, precision, recall, F1-score, ROC/AUC, network intrusion detection, malware classification, honeypot data analysis, PyTorch, Scikit-learn, Pandas

##### [PROJECT] SSH shell attacks analysis | Repo: https://github.com/RenatoMignone/SSH-Shell-Attacks
**TL;DR:** Applied ML and NLP pipelines to ~230,000 honeypot SSH sessions to classify attacker intents across 7 MITRE ATT&CK categories, achieving command-level intent classification with BERT and Doc2Vec.
Technologies/key areas/results: Python, Pandas, NumPy, PyArrow, Matplotlib, Seaborn, Scikit-learn, PyTorch, Hugging Face Transformers; Parquet ingestion; TF-IDF/Word2Vec features; binary and multi-class models (Logistic Regression, Random Forest, SVM, neural nets); K-Means/DBSCAN; PCA/t-SNE/UMAP; BERT contextual embeddings; Doc2Vec; confusion matrices; attack-pattern discovery; IoC extraction framework; ACM-formatted report with reproducible notebooks sections 0–4.

#### [COURSE] Computer Architectures and Operating Systems | Grade: 30/30 | Code: 01GYKUV
Topics: pipelining, superscalar execution, instruction-level parallelism, branch prediction, cache hierarchies (L1/L2/L3), MMU, ARM Cortex-M7, Thumb-2, Harvard architecture, MPU, FreeRTOS, task scheduling, semaphores, mutexes, NVIC, UART, DMA, bare-metal programming, linker scripts, QEMU, GDB, ARM GCC cross-compilation

##### [PROJECT] Secure timeout system on NXP S32K3X8EVB | Repo: https://github.com/RenatoMignone/Secure-Timeout-System-NXPS32K3X8EVB
**TL;DR:** Ported FreeRTOS to an ARM Cortex-M7 evaluation board with full MPU support, hardware errata mitigation, and QEMU-based emulation to implement a priority-driven secure timeout application.
Technologies/key areas/results: ARM GCC/gcc-arm-none-eabi, QEMU, GDB, FreeRTOS, Makefile/Ninja; Cortex-M4-to-M7 FreeRTOS port; 16 isolated MPU memory regions; Errata 837070 mitigation; UART abstraction; interrupt timer subsystem; priority scheduling (ALERT level 3, EVENT level 4); full configure/compile/emulate/debug pipeline without physical hardware; UART, timer, and MPU validated under QEMU.

### First year — second semester

#### [COURSE] Network and Cloud Security | Grade: 30L/30 | Code: 01NXIUV
Topics: network security fundamentals, packet filtering, IDS/IPS, firewall design, IPsec VPN, IKEv1/IKEv2, ESP, AES-256, Perfect Forward Secrecy, Diffie-Hellman, TLS VPN, OpenVPN, SSL-VPN, X.509 PKI, cloud computing security, NAT traversal, anti-replay protection, Dead Peer Detection, Wireshark packet analysis

##### [PROJECT] SoftEther VPN laboratory | Repo: https://github.com/RenatoMignone/SoftEther-VPN-Guardian
**TL;DR:** Designed and deployed a dual-protocol enterprise VPN lab (IPsec/strongSwan and TLS/OpenVPN) over a GNS3-simulated ISP topology, validating encryption and firewall traversal via Wireshark packet forensics.
Technologies/key areas/results: GNS3, Cisco IOS, strongSwan, OpenVPN, SoftEther VPN Server, Docker, Wireshark, X.509 PKI, Linux iptables/nftables; three-repo structure (VPN Guardian, Lab Activity Report, Configuration Files Guide); IPsec IKEv1 with AES-256 Phase 1/AES-128 Phase 2, SHA-1 HMAC, DH Group 14, NAT traversal; TLS/SSL tunnel over TCP/443 with AES-128-CBC and SHA-256; dual-factor auth; ESP verification; Dead Peer Detection; restrictive ACLs; Wireshark validation of TLS handshake and ESP framing. IPsec vs TLS trade-offs: IPsec stronger encryption and lower kernel-space CPU overhead; TLS better firewall evasion/mobile connectivity and lower implementation complexity; packet overhead similar (ESP 50+ bytes vs variable TLS records).

#### [COURSE] Hardware Security | Grade: 30L/30 | Code: 01GYSUV
Topics: hardware security threat landscape, CIA triad, VLSI design, IP cores, IP watermarking, PCB security, secure elements, TPM, Trusted Computing Base, hardware counterfeiting, TRNGs, Physically Unclonable Functions (PUFs), side-channel attacks (power, EM, timing), fault attacks, invasive attacks, microprobing, reverse engineering, hardware trojans, Verilog, test-infrastructure exploits

#### [COURSE] Wireless Security | Grade: 30L/30 | Code: 01GYSUV
Topics: physical layer security, digital communications, jamming, anti-jamming, GNSS/GPS/Galileo, GNSS spoofing, GNSS countermeasures, IEEE 802.11, WEP, WPA, 802.11i, 802.11w, rogue access points, selfish MAC behaviour, Bluetooth pairing, BLE, bluesnarfing, bluejacking, MiTM, 3G/4G/5G authentication, cellular confidentiality, Weighted Least Squares positioning, pseudorange analysis, iperf, Wireshark, MATLAB

##### [PROJECT] Wireless security labs | Repo: https://github.com/WDCSecure/LabGNSS
**TL;DR:** Conducted two hardware-instrumented lab experiments: GNSS spoofing detection via Android device measurement processing in MATLAB, and WiFi goodput measurement under three network configurations using iperf and Wireshark.
Technologies/key areas/results: MATLAB, iperf/iperf3, Wireshark, tcpdump, zizzania; GNSS pseudorange analysis, C/N₀ signal quality, WLS positioning, spoofing experiments, ADR analysis; WiFi goodput under Ethernet-to-Ethernet, WiFi-to-WiFi, and mixed scenarios; TCP sequence and RTT analysis; min/max/avg/std-dev across 10+ repetitions per scenario; LaTeX experimental reports.



#### [COURSE] Web Applications | Grade: 30L/30 | Code: 01GYOUV
Topics: HTTP/HTTPS, REST API design, HTML5, CSS3, JavaScript ES6+, React, SPA, Node.js, Express.js, SQLite3, ORM, session authentication, bcrypt, JWT, TOTP, role-based access control, OWASP Top 10, SQL injection, XSS, CSRF, CSP, HSTS, parameterised queries, Webpack, Vite, CORS

##### [PROJECT] Cybersecurity forum web application | Repo: https://github.com/RenatoMignone/WebApp_Project
**TL;DR:** Built a full-stack cybersecurity-themed forum in Node.js/React with bcrypt password hashing, TOTP 2FA for admins, role-based access control, and parameterised queries following OWASP guidelines.
Technologies/key areas/results: Node.js, Express.js, React, SQLite3, bcrypt, OTPAuth, JSON Web Tokens; OWASP-aligned REST API; session auth; salted bcrypt; RFC 6238 TOTP for admins; HTTP-only cookies; Admin/User API middleware; parameterised queries; anonymous comments with nullable FKs; authentication/posts/comments/engagement endpoints; 8+ React components.



### Second year — first semester

#### [COURSE] Advanced Information Systems Security | Grade: 30L/30 | Code: 02GYYUV
Topics: PKI features and threats, secure electronic documents, TLS, SSH, passkeys, federated authentication, SAML, OIDC, software security pitfalls, trusted computing, TEE, Confidential Computing, GDPR, NIS2, post-quantum security, Self-Sovereign Identity (SSI), Decentralized Identifiers (DID), Verifiable Credentials (VC), Verifiable Presentations (VP), Triangle of Trust

*Project: private repository (paper in preparation for publication).*

#### [COURSE] AI and Cybersecurity | Grade: 30L/30 | Code: 01GYZUV
Topics: AI and machine learning for cybersecurity, deep learning fundamentals, deep learning networks theory and implementation, deep NLP and embeddings techniques, supervised and unsupervised anomaly detection, data science pipelines for data analytics, deep learning frameworks, supervised traffic classification, NLP and clustering for botnet detection, unsupervised anomaly detection

##### [PROJECT] AI-driven threat detection research | Repo: https://github.com/RenatoMignone/AI-Driven-Threat-Detection-Research
**TL;DR:** Developed a multi-model AI defence suite across four lab modules covering network flow classification, malware API-call sequencing, zero-day anomaly detection, and NLP-based attack tactic recognition.
Co-authors: C. Sanna and C. Iorio. Technologies/key areas/results: Python, PyTorch, PyTorch Geometric, Scikit-learn, Pandas, Transformers (BERT, UniXcoder); four Git-submodule labs. Lab 1: CICIDS2017 deep learning, FFNNs, class imbalance via weighted CrossEntropyLoss, destination-port feature-bias analysis. Lab 2: malware API-call classification with GRU/LSTM and GraphSAGE/GCN. Lab 3: zero-day anomaly detection with One-Class SVM, autoencoder reconstruction error, DBSCAN, PCA/t-SNE. Lab 4: bash-session MITRE ATT&CK intent classification with custom tokenisation, TF-IDF, Word2Vec, bidirectional LSTMs. Results: 97.5% network-flow classification, 98.1% malware API classification, 95% precision in unsupervised anomaly detection, feature-bias mitigation, 4 ACM-formatted reproducible reports.



#### [COURSE] Security Verification and Testing | Grade: 30L/30 | Code: 02TYAUV
Topics: secure coding standards, ISO/IEC TS 17961, CERT C/C++, CWE, CVE, SAST, CFG, data flow analysis, taint analysis, symbolic execution, fuzzing, AFL/AFL++, LibFuzzer, DAST, Valgrind, AddressSanitizer, Ghidra, IDA Pro, radare2, reverse engineering, binary diffing, attack surface enumeration, buffer overflows, ROP, format string vulnerabilities, use-after-free, type confusion, stack canaries, ASLR, DEP/NX, CFI, shadow stacks, eBPF verifier analysis, kernel module testing, formal verification, model checking, theorem proving, unit testing, integration testing, penetration testing, CI/CD security

##### [PROJECT] Linux eBPF verifier bypass research | Repo: https://github.com/RenatoMignone/Linux-eBPF-Verifier-Bypass-Research
**TL;DR:** Discovered and exploited 5 local privilege escalation vulnerabilities in the Linux LTS 6.8 kernel by bypassing the eBPF static verifier using dynamic reverse engineering and QEMU emulation.
Technologies/key areas/results: QEMU, bpftool, GDB, C, Assembly, xvtlas; eBPF verifier (~20,000 LOC); bytecode semantics; JIT flow; register-state tracking; type/range confusion; pruning bugs; OOB read/write; LPE; dynamic reverse engineering; Makefile build; tmux test environment; 5 confirmed exploitable vulnerabilities from 60+ candidates with functional PoCs.

#### [COURSE] Cybersecurity Laws and Regulations | Grade: 27/30 | Code: 01GZBUV
Topics: GDPR, DPIA, DPO, NIS1, NIS2, Cybersecurity Act, ENISA, ePrivacy Directive, DORA, Cyber Resilience Act (CRA), AI Act, Budapest Convention on Cybercrime, Italian Penal Code (computer crimes), ISO/IEC 27001/27002, NIST Cybersecurity Framework, CIS Controls, SOC 2 compliance, CER Directive, digital evidence, chain of custody, intellectual property, responsible disclosure

### Second year — second semester

#### [COURSE] Computer Forensics and Cyber Crime Analysis | Grade: To be completed | Code: 01GZDUV
Topics: digital forensics fundamentals, Locard's exchange principle, chain of custody, forensic imaging, write blockers, hashing (MD5, SHA-256), FAT, NTFS, ext4, APFS, file carving, MAC times, volatile memory acquisition, Volatility, Rekall, rootkit detection, packet capture analysis, network flow reconstruction, syslog, Windows Event Logs, Windows registry analysis, mobile device forensics, iOS/Android extraction, steganography, timestomping, timeline analysis (log2timeline/plaso), Autopsy, Sleuth Kit, FTK, EnCase, Wireshark, CAINE, DEFT

##### [PROJECT] ARIA - AI-resistant investigator agent (computer forensics game) | Repo: https://github.com/RenatoMignone/ARIA_Computer_Forensics_Game
**TL;DR:** Developed an educational interactive game simulating a digital forensics workspace to train investigators in identifying AI hallucinations and validating claims against ground-truth evidence.
Technologies/key areas/results: React 19, TypeScript 5.9, Tailwind CSS 4.2, Vite 7.3, Google Gemini 2.5 Flash API, xterm.js; serious game with scripted offline mode and live Gemini mode; modular React context state; real-time Gemini streaming with fallback timeouts; metadata inspector; terminal emulator; chain-of-custody logging; multi-modal evidence files; hallucination recognition; metadata literacy; directly addresses 5 CFCCA learning objectives by requiring every AI claim to be checked against forensic ground truth before scoring.

### [THESIS] Post-quantum secure policy-based anonymous authentication tokens
**Full title:** Post-Quantum Secure Policy-Based Anonymous Authentication Tokens
**Supervisors:** Unknown
**Research area:** Post-Quantum Cryptography, Zero-Knowledge Proofs, Oblivious Pseudorandom Functions
**TL;DR:** Designed and implemented quantum-resistant anonymous authentication tokens using lattice-based cryptography and zero-knowledge proofs.

*This thesis was completed during the Security Research Engineer role at Huawei Data Privacy Lab documented in the Professional experience section.*

## Professional experience

### [ROLE] Security Research Engineer | Huawei Data Privacy Lab | Düsseldorf, Germany | Feb 2026 – Sep 2026
**TL;DR:** Researched and implemented quantum-resistant anonymous authentication token schemes bridging formal cryptography and practical Rust implementation.

*This role is the industry context for the [THESIS] documented under the Master's Degree section.*

- Addressed the "Q-Day" threat to public key infrastructure by researching post-quantum cryptography (PQC), blind signatures, zero-knowledge proofs (ZKP), and oblivious pseudorandom functions (OPRFs)
- Implemented NIST PQC standardisation candidates (CRYSTALS-Dilithium, SPHINCS+) and modified Pointcheval-Sanders signature schemes for policy-binding
- Developed formal security models (game-based and simulation-based proofs) to verify token integrity and unlinkability under quantum adversary models
- Engineered two construction approaches: Direct PQ Substitution (SPHINCS+ and STARK zero-knowledge proofs via RiscZero/SP1 zkVMs) and MPC-Based OPRF (symmetric-key MPC reducing proof overhead)
- Bridged formal cryptographic specification with practical implementation in Rust, establishing efficiency baselines for token issuance and redemption under Grover's and Shor's algorithm threat models

## Certifications and achievements

### [COMPETITION] IEEE-HKN International Budget Hack 2025 | 2025 | Result: 1st Place (Winner)
**TL;DR:** Built "Budget HQ", a full-stack financial management web application for IEEE-HKN chapters, winning 1st place globally.
Team/repo: Team 9 - Spaghetti Overflow: A. Botticella, E. Innocenti, R. Mignone [Backend lead, API design, security], S. Romano, E. Ruiz Giménez, C. Sanna; https://github.com/RenatoMignone/team9-spaghetti-overflow.
Technologies/key areas/results: React 18, Vite, React Router, Recharts, Node.js, Express 4, JWT, bcrypt, otplib, PostgreSQL 16, Docker, Nginx, Makefile; finance cockpit for IEEE-HKN chapter treasurers; OAuth, TOTP 2FA, JWT; academic-year-scoped DB schema; bcrypt, Helmet.js, rate limiting, parameterised queries; REST APIs for Budget, Transactions, Events, Deadlines, Analytics, Exports, Admin; single-command deployment; zero-copy PDF generation; real-time balance projection; all mandatory and multiple optional features completed in 10 days; awarded at the 15th anniversary celebration of the IEEE-HKN organisational merger.




### [COMPETITION] Reply Hack The Code Challenge 2025 - Standard Edition | 2025 | Result: Top 100
**TL;DR:** Competed in an international 6-hour team competition combining algorithmic optimisation and Capture The Flag cybersecurity challenges.
Format/categories/URL: international 6-hour live-leaderboard team contest, teams of 1–6; algorithmic optimization in graph theory and operations research plus CTF challenges in Miscellaneous/Crypto/Web; solving CTFs unlocked additional input files for higher scores; https://challenges.reply.com/challenges/hack-the-code-standard/home/.



### [COMPETITION] Reply Code Challenge 2026 - AI Agents Track | 2026 | Result: Final evaluation pending
**TL;DR:** Developed an agentic AI system for citizen welfare monitoring and anomaly detection, optimising for detection quality, token cost, and latency using LangChain, LangGraph, and OpenRouter.
Repository: https://github.com/RenatoMignone/AI_Agents_Hackathon.
Technologies/key areas/results: Python 3.10–3.13, LangChain, LangGraph, OpenRouter, Langfuse, ulid-py, python-dotenv; LLM as decision-maker for anomalous behavior against baselines using GPS location data, health event logs, and biometric indices; rule-based systems disqualified; multi-agent orchestration; ReAct execution; unified LLM gateway; token/latency/cost tracking; prompt optimization; LLM reasoning chains; scoring combined detection quality, economic/count accuracy, LLM token cost, latency, architecture explainability, and benchmark comparison; strict budgets ($40 levels 1–3, extra $120 hidden levels), mandatory Langfuse session IDs, 6-hour window (3h sandbox training, 2h evaluation generation, 1h validation).



### [CERT] GNU/Linux Advanced and Open Technologies Certificate | NetStudent, WEEE Open, open@polito | May 2025
Score: Certificate earned through advanced GNU/Linux and open technologies training.



## Languages

| Language | Level  | Certificate                                              | Notes                                                                                                                    |
| -------- | ------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Italian  | Native | —                                                        | —                                                                                                                        |
| English  | B2/C1  | Cambridge English B2 First (FCE) | Stronger spoken communication than the baseline certificate level suggests |
| French   | Basic  | —                                                        | —                                                                                                                        |



## Leadership and extracurricular activities

### [LEADERSHIP] Member with organisational responsibilities | IEEE-HKN Honor Society (Mu Nu Chapter) | Apr 2024 – Present
- Coordination of technical operations for 5+ STEM hackathons and events (150–250 participants per event), managing logistics, infrastructure setup, network management, and real-time participant support.
- Establishment and maintenance of industry partnerships with ARM, NXP, and STMicroelectronics for event sponsorship, technical resources, and development hardware.
