/**
 * Rich Interactive Quizzes for Cyber Security Analyst Modules.
 * Includes scenario-based questions, multiple choice, code analysis, and detailed explanations.
 */

export const QUIZZES_DATA = {
  'quiz-day-1': {
    id: 'quiz-day-1',
    day: 1,
    title: 'CIA Triad & Core Principles Assessment',
    passingScore: 75,
    questions: [
      {
        id: 'q1-1',
        question: 'An attacker uses an Insecure Direct Object Reference (IDOR) to view bank statements belonging to another user. Which pillar of the CIA Triad has been violated?',
        options: [
          'Confidentiality',
          'Integrity',
          'Availability',
          'Non-Repudiation'
        ],
        correctAnswer: 0,
        explanation: 'Confidentiality ensures that sensitive data is accessible ONLY to authorized individuals. Unauthorized access to someone else\'s private bank statement is a direct breach of Confidentiality.'
      },
      {
        id: 'q1-2',
        question: 'A malicious insider secretly alters financial balance numbers in a SQL database without authorization. Which security property is compromised?',
        options: [
          'Confidentiality',
          'Integrity',
          'Availability',
          'Scalability'
        ],
        correctAnswer: 1,
        explanation: 'Integrity guarantees that information is accurate, authentic, and has not been tampered with or modified by unauthorized parties.'
      },
      {
        id: 'q1-3',
        question: 'A massive 400 Gbps SYN flood DDoS attack renders an enterprise customer portal completely inaccessible. Which CIA pillar is attacked?',
        options: [
          'Confidentiality',
          'Integrity',
          'Availability',
          'Authentication'
        ],
        correctAnswer: 2,
        explanation: 'Availability ensures that systems, services, and data are timely and reliably accessible to authorized users. DDoS attacks specifically target Availability.'
      },
      {
        id: 'q1-4',
        question: 'Which of the following describes the difference between Authentication and Authorization?',
        options: [
          'Authentication verifies who you are; Authorization verifies what you are allowed to do.',
          'Authentication checks permissions; Authorization checks passwords.',
          'Authentication is done via symmetric keys; Authorization is done via hashes.',
          'Authentication applies only to databases; Authorization applies to networks.'
        ],
        correctAnswer: 0,
        explanation: 'Authentication (AuthN) proves identity (e.g. username/password, MFA). Authorization (AuthZ) checks access rights/permissions for a verified identity.'
      }
    ]
  },

  'quiz-day-2': {
    id: 'quiz-day-2',
    day: 2,
    title: 'Threat Actors & Attack Vectors Assessment',
    passingScore: 75,
    questions: [
      {
        id: 'q2-1',
        question: 'Which type of threat actor is characterized by nation-state funding, extreme stealth, custom zero-day exploits, and long-term espionage campaigns?',
        options: [
          'Script Kiddies',
          'Hacktivists',
          'Advanced Persistent Threats (APTs)',
          'Opportunistic Scammers'
        ],
        correctAnswer: 2,
        explanation: 'APTs (e.g., APT28, Lazarus) possess massive resources, state sponsorship, and maintain persistent undetected access inside target networks for months or years.'
      },
      {
        id: 'q2-2',
        question: 'Statistically across global enterprise data breaches, what remains the #1 initial delivery vector used by adversaries?',
        options: [
          'Physical lock picking',
          'Phishing and malicious email attachments',
          'Bluetooth sniffing',
          'Wireless deauthentication attacks'
        ],
        correctAnswer: 1,
        explanation: 'Phishing remains the primary initial attack vector because exploiting human psychology and credential entry is often easier than breaking perimeter encryption.'
      },
      {
        id: 'q2-3',
        question: 'What is an "Indicator of Compromise" (IOC)?',
        options: [
          'A certificate issued by Microsoft for Windows drivers.',
          'A piece of forensic digital evidence (IP, file hash, URL, registry key) indicating a system was breached.',
          'A firewall rule that blocks inbound port 80.',
          'The warranty expiration date of a server.'
        ],
        correctAnswer: 1,
        explanation: 'An IOC is forensic evidence on a network or operating system that indicates a security incident or intrusion has taken place.'
      }
    ]
  },

  'quiz-day-3': {
    id: 'quiz-day-3',
    day: 3,
    title: 'Cryptography, Hashing & TLS Assessment',
    passingScore: 75,
    questions: [
      {
        id: 'q3-1',
        question: 'Why is Base64 NOT considered encryption?',
        options: [
          'It is only used on Linux systems.',
          'It is an encoding scheme that requires no secret key and can be decoded instantly by anyone.',
          'It uses 512-bit keys which are too weak.',
          'It is slower than AES-256.'
        ],
        correctAnswer: 1,
        explanation: 'Base64 is a binary-to-text encoding format designed for safe data transmission, not secrecy. Anyone can decode Base64 without a key.'
      },
      {
        id: 'q3-2',
        question: 'What is the primary difference between Symmetric and Asymmetric encryption?',
        options: [
          'Symmetric uses the same secret key for encryption and decryption; Asymmetric uses a mathematically linked public/private key pair.',
          'Symmetric is one-way only; Asymmetric is two-way.',
          'Symmetric is used only for passwords; Asymmetric is used only for hard drives.',
          'Symmetric cannot be decrypted.'
        ],
        correctAnswer: 0,
        explanation: 'Symmetric (e.g. AES) uses one shared key. Asymmetric (e.g. RSA) uses a public key to encrypt and a private key to decrypt.'
      },
      {
        id: 'q3-3',
        question: 'In modern TLS 1.3, why is Diffie-Hellman / ECDHE used during the handshake instead of encrypting the session key directly with the server\'s RSA private key?',
        options: [
          'To make the website load in dark mode.',
          'To provide Perfect Forward Secrecy (PFS), so even if the server private key is stolen in the future, past recorded sessions cannot be decrypted.',
          'Because RSA is no longer compatible with web browsers.',
          'To avoid needing digital certificates.'
        ],
        correctAnswer: 1,
        explanation: 'Ephemeral Diffie-Hellman (ECDHE) ensures Perfect Forward Secrecy: session keys are temporary and never stored, so past traffic remains safe even if the server key leaks.'
      }
    ]
  },

  'quiz-day-10': {
    id: 'quiz-day-10',
    day: 10,
    title: 'Crucial Ports & TCP Handshake Assessment',
    passingScore: 75,
    questions: [
      {
        id: 'q10-1',
        question: 'What is the correct 3-step sequence of a standard TCP connection handshake?',
        options: [
          'ACK -> SYN -> FIN',
          'SYN -> SYN-ACK -> ACK',
          'HELLO -> PROCEED -> READY',
          'RST -> SYN -> ACK'
        ],
        correctAnswer: 1,
        explanation: 'TCP 3-Way Handshake starts with SYN from client, server responds with SYN-ACK, and client finishes with ACK.'
      },
      {
        id: 'q10-2',
        question: 'Which port and protocol is utilized by Microsoft Windows Active Directory Kerberos authentication?',
        options: [
          'Port 22 (SSH)',
          'Port 53 (DNS)',
          'Port 88 (Kerberos)',
          'Port 445 (SMB)'
        ],
        correctAnswer: 2,
        explanation: 'Port 88 is the standard port for Kerberos authentication tickets in Active Directory.'
      },
      {
        id: 'q10-3',
        question: 'You notice anomalous outbound network traffic on Port 445 directed toward external Internet IP addresses. What protocol is this, and why is it dangerous?',
        options: [
          'HTTP traffic; standard website browsing.',
          'SMB (Server Message Block); Windows file sharing that should NEVER be exposed to the internet and is heavily exploited by ransomware (e.g. EternalBlue/WannaCry).',
          'DNS traffic; standard name resolution.',
          'SSH traffic; secure terminal administration.'
        ],
        correctAnswer: 1,
        explanation: 'Port 445 is SMB. Exposing SMB externally is a critical risk and the classic vector for ransomware worms like WannaCry and NotPetya.'
      },
      {
        id: 'q10-4',
        question: 'Which port is standard for Microsoft Remote Desktop Protocol (RDP)?',
        options: [
          'Port 8080',
          'Port 3389',
          'Port 1433',
          'Port 21'
        ],
        correctAnswer: 1,
        explanation: 'Port 3389 is the default port for Microsoft RDP.'
      }
    ]
  },

  'quiz-day-27': {
    id: 'quiz-day-27',
    day: 27,
    title: 'Windows Event Logs & Threat Detection',
    passingScore: 75,
    questions: [
      {
        id: 'q27-1',
        question: 'Which Windows Security Event ID signifies a FAILED logon attempt (crucial for detecting brute force attacks)?',
        options: [
          'Event ID 4624',
          'Event ID 4625',
          'Event ID 7045',
          'Event ID 1102'
        ],
        correctAnswer: 1,
        explanation: 'Event ID 4625 is generated in the Security log whenever an authentication attempt fails.'
      },
      {
        id: 'q27-2',
        question: 'A SOC alert fires on Event ID 1102 ("The audit log was cleared"). What should your immediate assessment be?',
        options: [
          'Low Severity - standard routine maintenance.',
          'Critical Severity - an adversary with administrative privileges is likely attempting anti-forensic evidence destruction.',
          'Informational - Windows Update restarted the service.',
          'False Positive - normal browser cache clearing.'
        ],
        correctAnswer: 1,
        explanation: 'Clearing security audit logs is a classic MITRE ATT&CK Defense Evasion indicator (T1070.001) indicating an active intruder covering their tracks.'
      },
      {
        id: 'q27-3',
        question: 'What does Event ID 7045 in the Windows System Log represent?',
        options: [
          'A user changed their password.',
          'A new service was installed on the system (frequently used by malware and PsExec for persistence).',
          'The firewall blocked an incoming ping.',
          'A USB drive was plugged in.'
        ],
        correctAnswer: 1,
        explanation: 'Event ID 7045 logs new service installations. Adversaries install persistent malicious services to survive reboots.'
      }
    ]
  },

  'quiz-day-36': {
    id: 'quiz-day-36',
    day: 36,
    title: 'Pyramid of Pain & Threat Intelligence',
    passingScore: 75,
    questions: [
      {
        id: 'q36-1',
        question: 'According to David Bianco\'s Pyramid of Pain, which indicator is at the very top (causing the most pain to an adversary if detected/blocked)?',
        options: [
          'Hash Values',
          'IP Addresses',
          'Domain Names',
          'TTPs (Tactics, Techniques, and Procedures)'
        ],
        correctAnswer: 3,
        explanation: 'TTPs are at the peak. Forcing an attacker to change their fundamental operational methodology and tradecraft requires massive retraining, research, and cost.'
      },
      {
        id: 'q36-2',
        question: 'Why is blocking an attacker\'s SHA-256 hash considered "Trivial" on the Pyramid of Pain?',
        options: [
          'Because SHA-256 cannot be processed by firewalls.',
          'Because an attacker can alter a single comment or byte in their malware code to completely change the hash while keeping the functionality identical.',
          'Because hashes expire after 24 hours.',
          'Because hashes only apply to Linux.'
        ],
        correctAnswer: 1,
        explanation: 'Due to the avalanche effect of cryptographic hashing, modifying just 1 byte in a binary generates a completely new hash, bypassing simple hash blacklists.'
      }
    ]
  },

  'quiz-day-41': {
    id: 'quiz-day-41',
    day: 41,
    title: 'Splunk SPL & Log Hunting Assessment',
    passingScore: 75,
    questions: [
      {
        id: 'q41-1',
        question: 'In Splunk SPL, which command is used to count and aggregate events by specific fields (similar to SQL GROUP BY)?',
        options: [
          '| group by',
          '| stats count by <field>',
          '| aggregate',
          '| select count(*)'
        ],
        correctAnswer: 1,
        explanation: 'The `stats` command in Splunk calculates statistics, including `count`, `distinct_count (dc)`, `avg`, etc., grouped by chosen fields.'
      },
      {
        id: 'q41-2',
        question: 'What is the purpose of the `eval` command in Splunk SPL?',
        options: [
          'To restart the Splunk forwarder.',
          'To create or calculate new fields based on mathematical or string expressions.',
          'To export logs directly to Excel.',
          'To delete old log indexes.'
        ],
        correctAnswer: 1,
        explanation: 'The `eval` command calculates an expression and puts the resulting value into a new or existing field.'
      }
    ]
  },

  'quiz-day-64': {
    id: 'quiz-day-64',
    day: 64,
    title: 'OWASP Top 10: Web Security Assessment',
    passingScore: 75,
    questions: [
      {
        id: 'q64-1',
        question: 'What is the single most effective defense against SQL Injection vulnerabilities?',
        options: [
          'Installing an antivirus on the database server.',
          'Using Parameterized Queries / Prepared Statements.',
          'Setting the database password to 30 characters.',
          'Running the web server on port 8080.'
        ],
        correctAnswer: 1,
        explanation: 'Parameterized queries ensure the database engine distinguishes code from data, treating user input strictly as literal parameters and neutralizing injected SQL syntax.'
      },
      {
        id: 'q64-2',
        question: 'Which cookie security flag prevents client-side JavaScript (e.g. document.cookie) from reading authentication session cookies during an XSS attack?',
        options: [
          'Secure',
          'HttpOnly',
          'SameSite=Lax',
          'Path=/'
        ],
        correctAnswer: 1,
        explanation: 'The `HttpOnly` flag instructs the browser that the cookie should not be accessible via JavaScript scripts, stopping XSS token theft.'
      },
      {
        id: 'q64-3',
        question: 'A user alters their URL from `/api/profile?user_id=102` to `/api/profile?user_id=103` and can view another user\'s private personal details. What vulnerability is this?',
        options: [
          'SQL Injection',
          'Insecure Direct Object Reference (IDOR / Broken Object Level Authorization)',
          'Cross-Site Request Forgery (CSRF)',
          'Denial of Service (DoS)'
        ],
        correctAnswer: 1,
        explanation: 'IDOR occurs when an application provides direct access to objects based on user-supplied input without verifying the user\'s server-side authorization.'
      }
    ]
  },

  'quiz-day-90': {
    id: 'quiz-day-90',
    day: 90,
    title: 'Comprehensive SOC Analyst Job Readiness Evaluation',
    passingScore: 80,
    questions: [
      {
        id: 'q90-1',
        question: 'In an enterprise incident response scenario, an analyst discovers active ransomware beaconing from a finance workstation. What is the immediate first containment step?',
        options: [
          'Delete the operating system immediately.',
          'Isolate the host from the network (via EDR or disconnecting network cable) to stop lateral spread.',
          'Call the attacker to negotiate the ransom price.',
          'Post the hash on social media.'
        ],
        correctAnswer: 1,
        explanation: 'Immediate network isolation halts lateral movement to domain controllers or file shares while preserving memory/disk artifacts for forensic investigation.'
      },
      {
        id: 'q90-2',
        question: 'What is the formula for calculating Information Security Risk?',
        options: [
          'Risk = Firewall + Antivirus',
          'Risk = Threat × Vulnerability × Impact',
          'Risk = Number of Ports Open / Number of Users',
          'Risk = Encryption Key Length'
        ],
        correctAnswer: 1,
        explanation: 'Risk is the expected loss when a Threat exploits a Vulnerability resulting in business/financial Impact.'
      },
      {
        id: 'q90-3',
        question: 'Which email security record verifies that an email was not modified or tampered with in transit using a cryptographic digital signature?',
        options: [
          'SPF',
          'DKIM (DomainKeys Identified Mail)',
          'DMARC',
          'MX Record'
        ],
        correctAnswer: 1,
        explanation: 'DKIM provides cryptographic signature validation ensuring message integrity in transit.'
      }
    ]
  }
};
