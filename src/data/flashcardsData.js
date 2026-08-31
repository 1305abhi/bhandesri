/**
 * 60+ Spaced Repetition Flashcards for Cyber Security Analyst Core Competencies.
 */

export const FLASHCARD_CATEGORIES = [
  'All',
  'Ports & Protocols',
  'Windows Event IDs',
  'MITRE ATT&CK',
  'Linux & CLI',
  'Web & HTTP Headers',
  'Incident Response'
];

export const FLASHCARDS_DATA = [
  // --- PORTS & PROTOCOLS ---
  {
    id: 'fc-1',
    category: 'Ports & Protocols',
    front: 'Port 21',
    back: 'FTP (File Transfer Protocol) - Cleartext file transfer. Vulnerable to credential sniffing. Secured by FTPS/SFTP (Port 22).'
  },
  {
    id: 'fc-2',
    category: 'Ports & Protocols',
    front: 'Port 22',
    back: 'SSH (Secure Shell) & SFTP - Encrypted remote terminal administration & secure file transfer. Common brute-force target.'
  },
  {
    id: 'fc-3',
    category: 'Ports & Protocols',
    front: 'Port 23',
    back: 'Telnet - Unencrypted remote command line (Legacy/Insecure). Plaintext passwords sent across the wire.'
  },
  {
    id: 'fc-4',
    category: 'Ports & Protocols',
    front: 'Port 25',
    back: 'SMTP (Simple Mail Transfer Protocol) - Plaintext mail server routing and transmission.'
  },
  {
    id: 'fc-5',
    category: 'Ports & Protocols',
    front: 'Port 53',
    back: 'DNS (Domain Name System) - Translates domain names into IP addresses. Vectors: DNS Tunneling, Amplification DDoS, Cache Poisoning.'
  },
  {
    id: 'fc-6',
    category: 'Ports & Protocols',
    front: 'Port 80 vs Port 443',
    back: 'Port 80 = HTTP (Cleartext Web). Port 443 = HTTPS (Encrypted TLS/SSL Web).'
  },
  {
    id: 'fc-7',
    category: 'Ports & Protocols',
    front: 'Port 88',
    back: 'Kerberos - Default authentication protocol for Windows Active Directory domains. (KDC, TGT, TGS ticket exchange).'
  },
  {
    id: 'fc-8',
    category: 'Ports & Protocols',
    front: 'Port 135 & 139',
    back: 'Microsoft RPC & NetBIOS Session Service - Windows inter-process communication and legacy name resolution.'
  },
  {
    id: 'fc-9',
    category: 'Ports & Protocols',
    front: 'Port 389 & 636',
    back: 'LDAP (389) & LDAPS (636) - Lightweight Directory Access Protocol for querying Active Directory user/group objects.'
  },
  {
    id: 'fc-10',
    category: 'Ports & Protocols',
    front: 'Port 445',
    back: 'SMB (Server Message Block) - Windows file sharing & IPC. High-risk vector for worm propagation (EternalBlue / WannaCry).'
  },
  {
    id: 'fc-11',
    category: 'Ports & Protocols',
    front: 'Port 3389',
    back: 'RDP (Remote Desktop Protocol) - Microsoft GUI remote access. Primary entry vector for ransomware & brute force.'
  },

  // --- WINDOWS EVENT IDS ---
  {
    id: 'fc-12',
    category: 'Windows Event IDs',
    front: 'Event ID 4624',
    back: 'Successful Logon (Security Log). Check Logon Type: Type 2 (Interactive Console), Type 3 (Network Share), Type 10 (Remote Desktop/RDP).'
  },
  {
    id: 'fc-13',
    category: 'Windows Event IDs',
    front: 'Event ID 4625',
    back: 'Failed Logon Attempt (Security Log). Spikes indicate Password Spraying or Brute Force attack.'
  },
  {
    id: 'fc-14',
    category: 'Windows Event IDs',
    front: 'Event ID 4672',
    back: 'Special Privileges Assigned to New Logon (Security Log). Triggered when an account logs in with Administrator / Elevated rights.'
  },
  {
    id: 'fc-15',
    category: 'Windows Event IDs',
    front: 'Event ID 4720',
    back: 'A User Account Was Created (Security Log). High alert if created at odd hours or without change management ticket.'
  },
  {
    id: 'fc-16',
    category: 'Windows Event IDs',
    front: 'Event ID 4726',
    back: 'A User Account Was Deleted (Security Log). Often seen during attacker cleanup or account tampering.'
  },
  {
    id: 'fc-17',
    category: 'Windows Event IDs',
    front: 'Event ID 4738',
    back: 'A User Account Was Modified (Security Log). Includes password resets, account unlocks, and group membership alterations.'
  },
  {
    id: 'fc-18',
    category: 'Windows Event IDs',
    front: 'Event ID 7045',
    back: 'A Service Was Installed (System Log). Attackers install services for persistence or lateral movement (PsExec / Cobalt Strike).'
  },
  {
    id: 'fc-19',
    category: 'Windows Event IDs',
    front: 'Event ID 1102',
    back: 'The Security Audit Log Was Cleared (Security Log). CRITICAL RED ALERT: Active adversary attempting anti-forensics evidence destruction.'
  },
  {
    id: 'fc-20',
    category: 'Windows Event IDs',
    front: 'Sysmon Event ID 1',
    back: 'Process Creation (Sysmon Log). Provides full command line arguments, parent process PID, user context, and file hashes (SHA-256).'
  },
  {
    id: 'fc-21',
    category: 'Windows Event IDs',
    front: 'Sysmon Event ID 3',
    back: 'Network Connection Detected (Sysmon Log). Maps a specific process name (e.g. powershell.exe) directly to the destination IP & port.'
  },

  // --- MITRE ATT&CK ---
  {
    id: 'fc-22',
    category: 'MITRE ATT&CK',
    front: 'Tactics vs Techniques',
    back: 'Tactic = The adversary\'s objective / WHY (e.g., Initial Access, Persistence). Technique = The specific method / HOW (e.g., Spearphishing Link, Scheduled Task).'
  },
  {
    id: 'fc-23',
    category: 'MITRE ATT&CK',
    front: 'Initial Access (TA0001)',
    back: 'Adversary tries to get into your network. Techniques: Phishing (T1566), Exploit Public-Facing Application (T1190), Valid Accounts (T1078).'
  },
  {
    id: 'fc-24',
    category: 'MITRE ATT&CK',
    front: 'Execution (TA0002)',
    back: 'Adversary tries to run malicious code. Techniques: Command and Scripting Interpreter (T1059: PowerShell, Bash), User Execution (T1204).'
  },
  {
    id: 'fc-25',
    category: 'MITRE ATT&CK',
    front: 'Persistence (TA0003)',
    back: 'Adversary maintains their foothold across reboots. Techniques: Scheduled Task/Job (T1053), Registry Run Keys (T1547.001), Create Account (T1136).'
  },
  {
    id: 'fc-26',
    category: 'MITRE ATT&CK',
    front: 'Credential Access (TA0006)',
    back: 'Adversary steals account names and passwords. Techniques: OS Credential Dumping (T1003: LSASS Memory, Mimikatz), Brute Force (T1110).'
  },
  {
    id: 'fc-27',
    category: 'MITRE ATT&CK',
    front: 'Lateral Movement (TA0008)',
    back: 'Adversary moves through the environment from one system to another. Techniques: Remote Services (T1021: SMB, RDP, SSH, WinRM).'
  },
  {
    id: 'fc-28',
    category: 'MITRE ATT&CK',
    front: 'Command & Control (TA0011)',
    back: 'Adversary communicates with compromised systems over network channels. Techniques: Application Layer Protocol (T1071: HTTP/HTTPS, DNS).'
  },

  // --- LINUX & CLI ---
  {
    id: 'fc-29',
    category: 'Linux & CLI',
    front: '/etc/passwd vs /etc/shadow',
    back: '/etc/passwd = World-readable list of user accounts, UIDs, and shells. /etc/shadow = Root-only accessible file containing encrypted password hashes.'
  },
  {
    id: 'fc-30',
    category: 'Linux & CLI',
    front: '/var/log/auth.log',
    back: 'Primary authentication log on Debian/Ubuntu systems recording user logins, SSH sessions, sudo executions, and PAM failures.'
  },
  {
    id: 'fc-31',
    category: 'Linux & CLI',
    front: 'SUID Bit (SetUID)',
    back: 'Special permission (chmod u+s /path/to/binary). Allows the executable to run with the privileges of the file owner (often root).'
  },
  {
    id: 'fc-32',
    category: 'Linux & CLI',
    front: 'grep -i -E "pattern"',
    back: '-i = Case-insensitive search. -E = Extended regular expressions support (e.g. (union|select)).'
  },
  {
    id: 'fc-33',
    category: 'Linux & CLI',
    front: 'lsof -i :port',
    back: 'List Open Files by Internet socket: Reveals which process ID (PID) and executable name is listening on or connected to a given port.'
  },

  // --- WEB & HTTP HEADERS ---
  {
    id: 'fc-34',
    category: 'Web & HTTP Headers',
    front: 'HttpOnly Cookie Flag',
    back: 'Prevents client-side JavaScript scripts (document.cookie) from accessing the session cookie, neutralizing Cross-Site Scripting (XSS) cookie theft.'
  },
  {
    id: 'fc-35',
    category: 'Web & HTTP Headers',
    front: 'Secure Cookie Flag',
    back: 'Ensures the cookie is only transmitted over encrypted HTTPS connections, never over unencrypted plaintext HTTP.'
  },
  {
    id: 'fc-36',
    category: 'Web & HTTP Headers',
    front: 'Content-Security-Policy (CSP)',
    back: 'HTTP header that restricts which domain origins scripts, stylesheets, and images can execute from. Major defense against XSS.'
  },
  {
    id: 'fc-37',
    category: 'Web & HTTP Headers',
    front: 'X-Frame-Options: DENY',
    back: 'Prevents the webpage from being rendered inside an iframe on another site, eliminating Clickjacking attacks.'
  },
  {
    id: 'fc-38',
    category: 'Web & HTTP Headers',
    front: 'Strict-Transport-Security (HSTS)',
    back: 'Forces browsers to communicate strictly over HTTPS for a defined duration (max-age), blocking SSL stripping attacks.'
  },

  // --- INCIDENT RESPONSE ---
  {
    id: 'fc-39',
    category: 'Incident Response',
    front: 'SANS 6 Incident Response Steps',
    back: '1. Preparation -> 2. Identification (Detection) -> 3. Containment -> 4. Eradication -> 5. Recovery -> 6. Lessons Learned.'
  },
  {
    id: 'fc-40',
    category: 'Incident Response',
    front: 'True Positive vs False Positive',
    back: 'True Positive = Alert correctly identified a real security incident. False Positive = Alert fired on normal/benign administrative behavior.'
  },
  {
    id: 'fc-41',
    category: 'Incident Response',
    front: 'MTTD vs MTTR',
    back: 'MTTD = Mean Time to Detect (How fast a breach is spotted). MTTR = Mean Time to Respond / Remediate (How fast the threat is contained and eradicated).'
  },
  {
    id: 'fc-42',
    category: 'Incident Response',
    front: 'Pyramid of Pain (Order from Low to High)',
    back: '1. Hash Values (Trivial) -> 2. IP Addresses (Easy) -> 3. Domain Names (Simple) -> 4. Network/Host Artifacts (Annoying) -> 5. Tools (Challenging) -> 6. TTPs (Tough).'
  }
];
