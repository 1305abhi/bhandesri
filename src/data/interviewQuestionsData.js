/**
 * 50+ Curated Cyber Security / SOC Analyst Interview Questions with Answers,
 * Key Terminology, and Structured Analyst Framing.
 */

export const INTERVIEW_CATEGORIES = [
  'All',
  'Core Security & Networks',
  'SOC & SIEM Operations',
  'Incident Response & Scenarios',
  'Web AppSec & OWASP',
  'Career Strategy & Motivation'
];

export const INTERVIEW_QUESTIONS_DATA = [
  // --- CORE SECURITY & NETWORKS ---
  {
    id: 'int-1',
    category: 'Core Security & Networks',
    question: 'What is the CIA Triad, and why is it foundational to everything in cybersecurity?',
    keywords: ['Confidentiality', 'Integrity', 'Availability', 'Risk Management', 'Defense in Depth'],
    answer: 'The CIA Triad is the cornerstone model for information security:\n1. Confidentiality: Restricting sensitive data access to authorized entities (encryption, access control, MFA).\n2. Integrity: Ensuring data is trustworthy, accurate, and uncorrupted (cryptographic hashing like SHA-256, digital signatures, FIM).\n3. Availability: Guaranteeing systems and data remain operational when needed by authorized users (redundancy, backups, DDoS protection, load balancing).\nEvery security policy, tool, and SOC alert maps directly to protecting one or more of these three pillars.'
  },
  {
    id: 'int-2',
    category: 'Core Security & Networks',
    question: 'Can you explain the TCP 3-Way Handshake step by step, and how attackers abuse it?',
    keywords: ['SYN', 'SYN-ACK', 'ACK', 'SYN Flood', 'Nmap Stealth Scan (-sS)', 'RST'],
    answer: 'The 3-way handshake establishes a reliable TCP connection:\n1. Client -> Server: Sends SYN packet with initial sequence number X.\n2. Server -> Client: Responds with SYN-ACK packet with sequence number Y and acknowledgment X+1.\n3. Client -> Server: Sends ACK packet with acknowledgment Y+1. The connection is now ESTABLISHED.\n\nAttacker abuse:\n- SYN Flood DDoS: Attacker floods server with SYN packets without sending final ACK, exhausting the server connection backlog table.\n- Nmap Stealth Scan (-sS): Scanner sends SYN, receives SYN-ACK (confirming port is open), and immediately sends RST to abort before the application layer logs the session.'
  },
  {
    id: 'int-3',
    category: 'Core Security & Networks',
    question: 'What is the difference between Hashing, Encryption, and Encoding?',
    keywords: ['One-way', 'Two-way with key', 'Format representation', 'SHA-256', 'AES-256', 'Base64'],
    answer: '- Hashing is a one-way mathematical function (SHA-256, bcrypt) where data cannot be reversed. Used for password verification and file integrity.\n- Encryption is a two-way mathematical transformation requiring a secret cryptographic key (AES, RSA) to protect confidentiality.\n- Encoding is a public reversible format transformation (Base64, Hex) used for data transport. Encoding provides ZERO security as anyone can decode it instantly without a key.'
  },
  {
    id: 'int-4',
    category: 'Core Security & Networks',
    question: 'What are the default ports for SSH, DNS, Kerberos, SMB, and RDP?',
    keywords: ['Port 22', 'Port 53', 'Port 88', 'Port 445', 'Port 3389'],
    answer: '- SSH: Port 22 (Encrypted remote terminal)\n- DNS: Port 53 (Domain resolution)\n- Kerberos: Port 88 (Active Directory authentication)\n- SMB: Port 445 (Windows file sharing / target of WannaCry)\n- RDP: Port 3389 (Remote Desktop Protocol)'
  },
  {
    id: 'int-5',
    category: 'Core Security & Networks',
    question: 'Explain the difference between a Vulnerability, a Threat, and a Risk.',
    keywords: ['Vulnerability = Weakness', 'Threat = Actor/Danger', 'Risk = Probability x Impact'],
    answer: '- Vulnerability: A weakness or flaw in code, configuration, or process (e.g. unpatched Log4j).\n- Threat: Any entity or event with potential to cause harm (e.g. a ransomware gang or malicious insider).\n- Risk: The likelihood and operational/financial impact of a threat exploiting a vulnerability (Risk = Threat × Vulnerability × Impact).'
  },

  // --- SOC & SIEM OPERATIONS ---
  {
    id: 'int-6',
    category: 'SOC & SIEM Operations',
    question: 'What is the role of a Tier 1 SOC Analyst on a daily basis?',
    keywords: ['Alert Triage', 'False Positive Reduction', 'SLA', 'Enrichment', 'Escalation'],
    answer: 'A Tier 1 SOC Analyst is the frontline defender responsible for:\n1. Monitoring SIEM dashboards (Splunk, Sentinel, Wazuh) for inbound alerts.\n2. Triage & Validation: Investigating alert context, correlating logs, and distinguishing True Positives from False Positives.\n3. Threat Enrichment: Checking IPs, hashes, and domains in VirusTotal, AbuseIPDB, and AlienVault OTX.\n4. Initial Containment & Escalation: Following standard SOC playbooks to isolate infected endpoints or escalate high-severity incidents to Tier 2 within defined SLA windows.'
  },
  {
    id: 'int-7',
    category: 'SOC & SIEM Operations',
    question: 'What are the critical Windows Security Event IDs you monitor as a SOC Analyst?',
    keywords: ['4624 (Logon)', '4625 (Failed Logon)', '4672 (Admin)', '4720 (User Created)', '7045 (Service Installed)', '1102 (Log Cleared)'],
    answer: '- Event 4624: Successful Logon (Type 2=Interactive, Type 3=Network, Type 10=RDP).\n- Event 4625: Failed Logon (Multiple events = Brute force / Password spray).\n- Event 4672: Special Privileges Assigned (Logon with administrative rights).\n- Event 4720: A User Account Was Created (Unauthorized persistence).\n- Event 7045: A Service Was Installed (System Log - Malware/PsExec persistence).\n- Event 1102: Audit Log Cleared (High severity anti-forensic attempt).'
  },
  {
    id: 'int-8',
    category: 'SOC & SIEM Operations',
    question: 'What is the Pyramid of Pain, and why does David Bianco place TTPs at the top?',
    keywords: ['Hashes', 'IPs', 'Domains', 'TTPs', 'Adversary Cost'],
    answer: 'The Pyramid of Pain measures the difficulty an adversary faces when defenders block specific indicators:\n- Bottom (Trivial/Easy): Hashes, IP addresses, Domain names. (Attackers can modify or rotate these in seconds).\n- Top (Tough): TTPs (Tactics, Techniques, and Procedures).\nTTPs represent the attacker\'s fundamental behaviors, training, and tools. When you detect and disrupt their TTPs, you force them to spend months redesigning their entire intrusion playbook.'
  },
  {
    id: 'int-9',
    category: 'SOC & SIEM Operations',
    question: 'How do you differentiate a True Positive from a False Positive alert in a SIEM?',
    keywords: ['Context', 'Change Management', 'Normal Baseline', 'Host Verification'],
    answer: '1. Examine Context: Check source IP (internal management vs external public), user role, and execution timestamps.\n2. Cross-Reference Change Management: Check if an approved IT change ticket (e.g. routine backup update) explains the activity.\n3. Analyze Binary & Command Line: Check digital signatures, file paths (e.g. running from C:\\Windows\\System32 vs C:\\Users\\...\\AppData\\Local\\Temp), and arguments.\n- True Positive: The alert reflects actual malicious or unauthorized adversarial activity.\n- False Positive: The alert fired on legitimate, approved administrative or business activity due to overly broad detection rules.'
  },

  // --- INCIDENT RESPONSE & SCENARIOS ---
  {
    id: 'int-10',
    category: 'Incident Response & Scenarios',
    question: 'Scenario: You see a SIEM alert for 150 failed logons (Event ID 4625) followed by 1 successful logon (Event ID 4624) on a production database server. What are your exact steps?',
    keywords: ['Identify Source IP', 'Password Spray vs Brute Force', 'Host Isolation', 'Credential Reset', 'Process Tree'],
    answer: 'Step 1 - Triage & Scope:\n- Check if the 150 failures targeted 1 user (Brute force) or 150 distinct usernames (Password spray).\n- Check source IP address: Is it internal (compromised workstation moving laterally) or external?\n\nStep 2 - Verify the Successful Logon:\n- Identify which user account succeeded.\n- Check if that user was granted administrative privileges (Event ID 4672).\n\nStep 3 - Immediate Containment:\n- If source IP is internal, isolate the source host via EDR.\n- Immediately disable/reset the compromised user\'s password in Active Directory.\n- Terminate any active sessions on the target server.\n\nStep 4 - Forensic Scrutiny:\n- Inspect Sysmon Event ID 1 / Process Creation to see what commands or executables were launched immediately after the logon.\n- Document timeline in ticket and escalate to Tier 2/Incident Response lead.'
  },
  {
    id: 'int-11',
    category: 'Incident Response & Scenarios',
    question: 'Scenario: An employee reports receiving an urgent email with an invoice attachment claiming to be from the CEO. How do you triage this phishing incident?',
    keywords: ['Email Headers', 'SPF/DKIM/DMARC', 'Defang URLs', 'Sandbox Detonation', 'Purge from Inboxes'],
    answer: '1. Acquire the raw email (.eml / .msg) and preserve headers.\n2. Inspect Email Headers: Check Return-Path, actual sending server IP, and SPF/DKIM/DMARC authentication results.\n3. Defang IOCs (e.g. hxxps[://]fake-portal[.]com) to safely document in the ticket.\n4. Analyze Attachment & Links: Compute SHA-256 hash of attachment; search VirusTotal and submit to sandbox (Any.Run / Joe Sandbox) to observe process trees and C2 beaconing.\n5. Containment: Search email gateway/O365 logs for all other employees who received the same message and purge it. Block the sender address, malicious domain, and C2 IP at perimeter firewalls.'
  },

  // --- WEB APPSEC & OWASP ---
  {
    id: 'int-12',
    category: 'Web AppSec & OWASP',
    question: 'Explain SQL Injection (SQLi) and how developers must remediate it.',
    keywords: ['Parameterized Queries', 'Prepared Statements', 'Untrusted Input', 'Bypass Auth'],
    answer: 'SQL Injection occurs when untrusted user input is directly concatenated into a backend SQL query string, allowing an attacker to alter the query logic (e.g. `admin\' OR 1=1 --`).\nRemediation: The gold standard fix is Parameterized Queries (Prepared Statements). The database engine pre-compiles the SQL query template and treats all user input strictly as literal parameter data, making it impossible for input to be executed as SQL commands.'
  },
  {
    id: 'int-13',
    category: 'Web AppSec & OWASP',
    question: 'What is an Insecure Direct Object Reference (IDOR), and how do you test and prevent it?',
    keywords: ['Object Identifier', 'Access Control Check', 'Server-side Verification', 'RBAC'],
    answer: 'IDOR occurs when an application exposes a reference to an internal database object (e.g., `GET /api/documents?id=4021`) and relies on client-supplied input without verifying on the server whether the authenticated user has permission to access that specific object.\nPrevention: Implement strict server-side authorization checks on every request: ensure the backend query validates that the requested object ID belongs to or is authorized for `current_user.id`.'
  },
  {
    id: 'int-14',
    category: 'Web AppSec & OWASP',
    question: 'What are the HttpOnly, Secure, and SameSite flags on session cookies?',
    keywords: ['HttpOnly = Blocks XSS reading', 'Secure = HTTPS only', 'SameSite = Mitigates CSRF'],
    answer: '- HttpOnly: Tells the browser that JavaScript (`document.cookie`) cannot read the cookie, neutralizing cookie theft via XSS.\n- Secure: Instructs the browser to only transmit the cookie over encrypted HTTPS connections.\n- SameSite (Strict/Lax): Restricts cookie transmission in cross-site requests, mitigating Cross-Site Request Forgery (CSRF).'
  },

  // --- CAREER STRATEGY & MOTIVATION ---
  {
    id: 'int-15',
    category: 'Career Strategy & Motivation',
    question: 'What inspired you to pursue a career as a Cybersecurity & SOC Analyst?',
    keywords: ['Adversarial Mindset', 'Defensive Depth', 'Root Cause', 'Continuous Learning', 'Hands-On Labs'],
    answer: 'I have always been deeply passionate about understanding how complex systems operate under stress and how adversaries discover unintended bypasses. While analyzing web traffic, API access controls, and network logs in hands-on labs, I discovered my enthusiasm for defensive security—uncovering threat actor tradecraft, correlating telemetry across SIEM platforms, and building resilient detection mechanisms. My continuous hands-on practice in home labs (Wazuh, Splunk BOTS, Wireshark) and dedication to structured incident response methodologies prepares me to add immediate defensive value to a SOC team.'
  },
  {
    id: 'int-16',
    category: 'Career Strategy & Motivation',
    question: 'How do you structure and document high-fidelity SOC incident reports?',
    keywords: ['Chronological Timeline', 'Severity/Priority', 'Observed Artifacts', 'Impact Assessment', 'Remediation Steps'],
    answer: 'A high-fidelity incident report must be clear, actionable, and structured for both technical responders and leadership:\n1. Executive Summary: High-level overview of the incident, impact, and current containment status.\n2. Chronological Timeline: Timestamped sequence of events from initial access to detection.\n3. Technical Artifacts (IOCs): Malicious IPs, domain names, file hashes (SHA-256), compromised user accounts, and affected hosts.\n4. Root Cause Analysis: How the vulnerability or intrusion occurred.\n5. Remediation & Hardening Actions: Exact steps taken for eradication, recovery, and long-term defensive recommendations to prevent recurrence.'
  }
];
