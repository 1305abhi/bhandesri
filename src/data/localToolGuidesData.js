/**
 * Step-by-Step Hands-On Practical Tool Guides for Local Machine Execution.
 * Includes Prerequisites, Step-by-Step Commands, Exact Inputs, Expected Outputs, and Defender Analysis.
 */

export const LOCAL_TOOL_GUIDES = [
  {
    id: 'guide-linux',
    title: 'Linux Security & Log Forensics',
    tool: 'Linux CLI / WSL / Ubuntu',
    category: 'Linux/CLI',
    difficulty: 'Beginner',
    estimatedTime: '30 mins',
    prerequisites: 'Windows Subsystem for Linux (WSL), Ubuntu VM, or any Linux terminal.',
    setupInstructions: [
      'If using Windows, open PowerShell as Admin and run: `wsl --install` (or open existing Ubuntu terminal).',
      'Ensure you have standard utilities installed: `sudo apt update && sudo apt install -y curl ufw authbind`.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Filter and Count Failed SSH Authentication Attempts',
        description: 'Attackers frequently use automated dictionaries to brute-force SSH logins. We use grep to isolate all failed login events in the authentication log.',
        inputCommand: 'grep "Failed password" /var/log/auth.log | head -n 5',
        expectedOutput: `Aug 31 03:14:02 ubuntu-server sshd[4102]: Failed password for invalid user admin from 198.51.100.42 port 49152 ssh2
Aug 31 03:14:04 ubuntu-server sshd[4105]: Failed password for invalid user root from 198.51.100.42 port 49154 ssh2
Aug 31 03:14:07 ubuntu-server sshd[4108]: Failed password for invalid user test from 198.51.100.42 port 49156 ssh2
Aug 31 03:14:10 ubuntu-server sshd[4111]: Failed password for invalid user oracle from 198.51.100.42 port 49158 ssh2
Aug 31 03:14:13 ubuntu-server sshd[4114]: Failed password for invalid user deploy from 198.51.100.42 port 49160 ssh2`,
        defenderInsight: 'Notice the consistent source IP (198.51.100.42) rotating rapidly through common administrative usernames. This cadence (every 2-3 seconds) is a signature of automated brute-force tools like Hydra.'
      },
      {
        stepNumber: 2,
        title: 'Extract and Aggregate Top Offending Attacker IPs',
        description: 'Pipe grep output into awk, sort, and uniq to create an instant frequency distribution table of attacking IP addresses.',
        inputCommand: 'grep "Failed password" /var/log/auth.log | awk \'{print $(NF-3)}\' | sort | uniq -c | sort -nr | head -n 10',
        expectedOutput: `    142 198.51.100.42
     89 203.0.113.88
     14 192.0.2.15
      3 10.0.1.5`,
        defenderInsight: '198.51.100.42 accounts for 142 failed attempts. In an enterprise SOC, you would immediately submit this IP to VirusTotal/AbuseIPDB and push an emergency block rule to the edge firewall.'
      },
      {
        stepNumber: 3,
        title: 'Audit Sudo Privilege Escalation Executions',
        description: 'Inspect command history of users executing commands with elevated administrative rights via sudo.',
        inputCommand: 'grep "COMMAND=" /var/log/auth.log | tail -n 3',
        expectedOutput: `Aug 31 04:22:10 ubuntu-server sudo:    sarah : TTY=pts/0 ; PWD=/home/sarah ; USER=root ; COMMAND=/bin/systemctl restart nginx
Aug 31 04:25:33 ubuntu-server sudo:    john  : TTY=pts/1 ; PWD=/tmp ; USER=root ; COMMAND=/usr/bin/cat /etc/shadow
Aug 31 04:26:01 ubuntu-server sudo:    john  : TTY=pts/1 ; PWD=/tmp ; USER=root ; COMMAND=/bin/bash`,
        defenderInsight: 'User "john" accessed `/etc/shadow` from the `/tmp` directory and then spawned an interactive root shell (`/bin/bash`). This is a critical indicator of privilege escalation requiring immediate host containment.'
      },
      {
        stepNumber: 4,
        title: 'Inspect Active Network Listening Ports & Established Sockets',
        description: 'Identify unauthorized background services or reverse shell listener ports on the host.',
        inputCommand: 'sudo ss -tulpn',
        expectedOutput: `Netid  State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port  Process
tcp    LISTEN  0       128      0.0.0.0:22           0.0.0.0:*          users:(("sshd",pid=842,fd=3))
tcp    LISTEN  0       511      0.0.0.0:80           0.0.0.0:*          users:(("nginx",pid=1204,fd=6))
tcp    LISTEN  0       128      127.0.0.1:5432       0.0.0.0:*          users:(("postgres",pid=910,fd=7))
tcp    ESTAB   0       0        192.168.1.50:4444    203.0.113.88:51204 users:(("nc",pid=3812,fd=3))`,
        defenderInsight: 'Port 4444 is connected outbound to an external public IP (203.0.113.88) by binary `nc` (Netcat). This is a textbook active reverse shell connection.'
      }
    ]
  },
  {
    id: 'guide-wireshark',
    title: 'Network Packet Analysis & Cleartext Credential Extraction',
    tool: 'Wireshark / TShark',
    category: 'Packet Analysis',
    difficulty: 'Beginner',
    estimatedTime: '25 mins',
    prerequisites: 'Wireshark installed on your local machine (Download free from wireshark.org).',
    setupInstructions: [
      'Download and install Wireshark for Windows/macOS/Linux.',
      'Open Wireshark and select your active network adapter (e.g. Wi-Fi or Ethernet) to start capturing packets.',
      'Alternatively, open any sample `.pcap` file via `File -> Open`.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Filter for HTTP POST Requests (Authentication & Form Submissions)',
        description: 'Enter a display filter in the top filter bar to isolate unencrypted form submission traffic containing usernames and passwords.',
        inputCommand: 'http.request.method == "POST"',
        expectedOutput: `No.   Time      Source         Destination    Protocol Length Info
42    3.142011  192.168.1.45   93.184.216.34  HTTP     428    POST /api/v1/auth/login HTTP/1.1 (application/x-www-form-urlencoded)`,
        defenderInsight: 'Unencrypted HTTP traffic sends credentials across the wire in cleartext without TLS encryption, allowing anyone on the same local network or ISP path to sniff them.'
      },
      {
        stepNumber: 2,
        title: 'Inspect the TCP 3-Way Handshake SYN Packets',
        description: 'Filter for TCP SYN packets to analyze connection initiations and detect SYN flood port scans.',
        inputCommand: 'tcp.flags.syn == 1 && tcp.flags.ack == 0',
        expectedOutput: `No.   Time      Source         Destination    Protocol Length Info
1     0.000000  192.168.1.45   93.184.216.34  TCP      66     52104 → 80 [SYN] Seq=0 Win=64240 Len=0 MSS=1460 SACK_PERM
4     0.002100  192.168.1.45   93.184.216.34  TCP      66     52105 → 443 [SYN] Seq=0 Win=64240 Len=0 MSS=1460 SACK_PERM
7     0.004200  192.168.1.45   93.184.216.34  TCP      66     52106 → 8080 [SYN] Seq=0 Win=64240 Len=0 MSS=1460 SACK_PERM`,
        defenderInsight: 'Rapid sequential SYN packets from the same source to incrementing destination ports indicates an active Nmap TCP port scan (`nmap -sS`).'
      },
      {
        stepNumber: 3,
        title: 'Follow the Full TCP Stream to Extract Leaked Credentials',
        description: 'Right-click on packet #42 and choose `Follow -> TCP Stream` to reconstruct the complete bidirectional conversation.',
        inputCommand: 'Right-click Packet #42 -> Follow -> TCP Stream',
        expectedOutput: `[CLIENT REQUEST (RED)]
POST /api/v1/auth/login HTTP/1.1
Host: insecure-portal.corp
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Content-Type: application/x-www-form-urlencoded
Content-Length: 48

username=admin_sarah&password=ProductionSecret2026!

[SERVER RESPONSE (BLUE)]
HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: session_token=e4a91fbc8012; Path=/; HttpOnly

{"status":"success","role":"superadmin"}`,
        defenderInsight: 'The analyst can see the exact plaintext credentials (`admin_sarah` : `ProductionSecret2026!`). In incident documentation, capture the frame number, timestamp, and recommend immediate password reset plus mandatory HTTPS redirection.'
      }
    ]
  },
  {
    id: 'guide-splunk',
    title: 'Enterprise SIEM Log Hunting & SPL Queries',
    tool: 'Splunk Free / Splunk Cloud / Wazuh',
    category: 'SIEM & Logs',
    difficulty: 'Intermediate',
    estimatedTime: '40 mins',
    prerequisites: 'Free Splunk Enterprise (download 60-day trial / free license) or access to Splunk Boss of the SOC (BOTS) dataset.',
    setupInstructions: [
      'Install Splunk Free on your PC (runs locally at `http://localhost:8000`).',
      'Log in, go to `Settings -> Add Data`, and upload any Windows Event Log (.evtx) or sample web access log.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Query Windows Security Event Log for Failed Logons (Event ID 4625)',
        description: 'Search for all failed logon events in index=main and extract target accounts and source workstation IP addresses.',
        inputCommand: 'index=* sourcetype="WinEventLog:Security" EventCode=4625 | stats count by TargetUserName, IpAddress, Failure_Reason | sort - count',
        expectedOutput: `TargetUserName   IpAddress        Failure_Reason                           count
administrator    198.51.100.42    Unknown user name or bad password        342
service_account  198.51.100.42    Unknown user name or bad password        118
sarah.connor     10.0.4.12        Account currently locked out              12`,
        defenderInsight: 'A high volume of Event 4625 targeting administrator from an external IP indicates a dictionary attack. The single internal IP hitting "account locked out" indicates a user mistyping their password.'
      },
      {
        stepNumber: 2,
        title: 'Detect Audit Log Tampering (Event ID 1102 - Security Log Cleared)',
        description: 'Attackers clear the event log to eliminate forensic traces before disconnecting.',
        inputCommand: 'index=* sourcetype="WinEventLog:Security" EventCode=1102 | table _time, host, SubjectUserName, Message',
        expectedOutput: `_time                 host           SubjectUserName   Message
2026-08-31 04:12:00   DC-PRIMARY-01  backdoor_user     The audit log was cleared.`,
        defenderInsight: 'Event 1102 is a Tier 1 High-Severity trigger. Legitimate sysadmins almost never clear the security log manually. Treat this as an active confirmed intrusion.'
      },
      {
        stepNumber: 3,
        title: 'Detect Malicious Encoded PowerShell via Sysmon (Event ID 1)',
        description: 'Search Sysmon process creation telemetry for encoded or hidden PowerShell executions.',
        inputCommand: 'index=* sourcetype="XmlWinEventLog:Microsoft-Windows-Sysmon/Operational" EventCode=1 (Image="*powershell.exe" OR Image="*pwsh.exe") CommandLine="*-enc*" | table _time, Computer, ParentImage, CommandLine',
        expectedOutput: `_time                 Computer        ParentImage                                CommandLine
2026-08-31 05:22:15   WS-FINANCE-04   C:\\Program Files\\Microsoft Office\\OUTLOOK.EXE   powershell.exe -nop -w hidden -enc SQBFAFgA...`,
        defenderInsight: 'ParentImage is `OUTLOOK.EXE` spawning `powershell.exe` with hidden window parameters. This is a 100% true-positive malicious macro attachment executing a stage-1 dropper.'
      }
    ]
  },
  {
    id: 'guide-burp',
    title: 'Web AppSec Auditing with Burp Suite (OWASP Top 10)',
    tool: 'Burp Suite Community Edition',
    category: 'Web AppSec/OWASP',
    difficulty: 'Beginner',
    estimatedTime: '35 mins',
    prerequisites: 'Burp Suite Community Edition (portswigger.net) and OWASP Juice Shop or DVWA (running locally on Docker).',
    setupInstructions: [
      'Download and launch Burp Suite Community Edition.',
      'Go to the `Proxy -> Open Browser` tab (opens pre-configured Chromium with Burp proxy integrated).',
      'Navigate to your test application (e.g. `http://localhost:3000` or `https://juice-shop.herokuapp.com`).'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Intercept and Modify HTTP Request Parameters (IDOR Testing)',
        description: 'Enable Intercept in Burp Proxy, view account profile, and modify the user identifier in the URL.',
        inputCommand: 'GET /api/Users/2 HTTP/1.1 (Modified in Burp Repeater to /api/Users/1)',
        expectedOutput: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "email": "admin@juice-sh.op",
  "role": "administrator",
  "apiKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`,
        defenderInsight: 'If changing the numeric ID returns another user\'s private data without an Authorization 403 error, the application has an Insecure Direct Object Reference (Broken Object Level Authorization).'
      },
      {
        stepNumber: 2,
        title: 'Test SQL Injection Authentication Bypass in Login Form',
        description: 'Send a single quote payload in the email field to verify database error responses and logic bypass.',
        inputCommand: `POST /rest/user/login HTTP/1.1
Content-Type: application/json

{"email":"' OR 1=1 --","password":"test"}`,
        expectedOutput: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "authentication": {
    "token": "eyJ0eXAiOiJKV1QiLC...",
    "user": {
      "id": 1,
      "email": "admin@juice-sh.op",
      "role": "admin"
    }
  }
}`,
        defenderInsight: 'The backend database evaluated `\' OR 1=1 --` as true for all rows, logging the client in as the first database user (Admin). Remediation requires parameterized prepared statements.'
      }
    ]
  },
  {
    id: 'guide-python',
    title: 'Python Security Automation & Threat Intel Enrichment',
    tool: 'Python 3 / Terminal',
    category: 'Python Scripting',
    difficulty: 'Beginner',
    estimatedTime: '20 mins',
    prerequisites: 'Python 3 installed on your machine (`python --version`).',
    setupInstructions: [
      'Open a terminal or VS Code on your machine.',
      'Create a new folder: `mkdir soc-scripts && cd soc-scripts`',
      'Create a python file: `touch hash_checker.py` (or `New-Item hash_checker.py` in PowerShell).'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Compute SHA-256 Hash of Any Local File (IOC Extraction)',
        description: 'Save this Python script to compute cryptographic hashes for files suspected of containing malware.',
        inputCommand: `import hashlib
import sys

def get_file_sha256(filepath):
    sha256_hash = hashlib.sha256()
    with open(filepath, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

print("SHA-256:", get_file_sha256("test_payload.exe"))`,
        expectedOutput: `SHA-256: 275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f`,
        defenderInsight: 'Once you have this SHA-256 hash, query VirusTotal or AlienVault OTX to verify whether AV engines classify it as known ransomware or a trojan.'
      },
      {
        stepNumber: 2,
        title: 'Automate Log Parsing & IP Extraction with Regex',
        description: 'Extract all public IPv4 addresses from raw log files using regular expressions.',
        inputCommand: `import re

log_data = """
Failed password for root from 198.51.100.42 port 51204
Failed password for admin from 203.0.113.88 port 51206
Accepted password for dev from 192.168.1.10 port 51208
"""

ip_pattern = r'\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b'
found_ips = re.findall(ip_pattern, log_data)
print("Extracted IPs:", set(found_ips))`,
        expectedOutput: `Extracted IPs: {'198.51.100.42', '203.0.113.88', '192.168.1.10'}`,
        defenderInsight: 'Security automation scripts like this parse thousands of log lines in milliseconds, enabling automated threat intelligence lookups during live triage.'
      }
    ]
  },
  {
    id: 'guide-windows',
    title: 'Windows Sysmon & Endpoint Telemetry Inspection',
    tool: 'Windows Event Viewer (eventvwr.msc) / Sysmon',
    category: 'Windows/AD',
    difficulty: 'Intermediate',
    estimatedTime: '30 mins',
    prerequisites: 'Windows 10/11 machine with Administrator privileges.',
    setupInstructions: [
      'Download Microsoft Sysmon from Microsoft Sysinternals (learn.microsoft.com/sysinternals).',
      'Open PowerShell as Administrator and install Sysmon: `.\\Sysmon64.exe -i -accepteula`',
      'Open Windows Event Viewer (`Win + R` -> type `eventvwr.msc`). Navigate to: `Applications and Services Logs -> Microsoft -> Windows -> Sysmon -> Operational`.'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Generate and Inspect a Sysmon Event ID 1 (Process Creation)',
        description: 'Execute a test PowerShell command from CMD, then inspect the generated Sysmon Event ID 1 in Event Viewer.',
        inputCommand: 'In CMD/PowerShell run: powershell.exe -NoProfile -Command "Write-Host \'Testing Sysmon Telemetry\'"',
        expectedOutput: `Event ID: 1
Source: Microsoft-Windows-Sysmon
Task Category: Process Create (rule: ProcessCreate)
UtcTime: 2026-08-31 06:30:15.112
ProcessGuid: {a2b4c6d8-1000-0000-0010-000000000000}
ProcessId: 5824
Image: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe
CommandLine: powershell.exe -NoProfile -Command "Write-Host 'Testing Sysmon Telemetry'"
CurrentDirectory: C:\\Users\\Analyst\\
User: DOMAIN\\Analyst
ParentProcessGuid: {a2b4c6d8-0999-0000-0010-000000000000}
ParentProcessId: 4120
ParentImage: C:\\Windows\\System32\\cmd.exe
ParentCommandLine: "C:\\Windows\\system32\\cmd.exe"`,
        defenderInsight: 'Sysmon Event ID 1 provides exact process parent-child relationships (`ParentImage: cmd.exe` -> `Image: powershell.exe`) and full command-line arguments. This is the primary telemetry source used by EDR tools (CrowdStrike, SentinelOne).'
      },
      {
        stepNumber: 2,
        title: 'Detect Network Connections Originating from Non-Browser Binaries (Sysmon Event ID 3)',
        description: 'Sysmon Event ID 3 captures all TCP/UDP network connections initiated by any process on the system.',
        inputCommand: 'In PowerShell: curl.exe http://example.com',
        expectedOutput: `Event ID: 3
Source: Microsoft-Windows-Sysmon
Task Category: Network connection detected
Image: C:\\Windows\\System32\\curl.exe
User: DOMAIN\\Analyst
Protocol: tcp
Initiated: true
SourceIp: 192.168.1.15
SourcePort: 52140
DestinationIp: 93.184.216.34
DestinationPort: 80`,
        defenderInsight: 'If you observe processes like `cmd.exe`, `powershell.exe`, `rundll32.exe`, or `certutil.exe` making outbound network connections, it almost always indicates a C2 beacon or stage-2 payload download.'
      }
    ]
  }
];
