/**
 * Pre-built Python and Bash Security Script Templates for the Interactive Scripting Sandbox.
 */

export const CODE_TEMPLATES_DATA = [
  {
    id: 'script-1',
    title: 'Python: SSH Brute Force Log Parser & Extractor',
    language: 'python',
    category: 'Log Parsing & Regex',
    description: 'Parses an auth.log stream, uses regular expressions to find failed password attempts, counts failures per IP, and triggers an alert if the count exceeds the threshold.',
    code: `import re
from collections import Counter

# Raw authentication log excerpt
sample_logs = """
2026-08-31T04:12:01Z srv01 sshd[101]: Failed password for invalid user admin from 198.51.100.42 port 5012 ssh2
2026-08-31T04:12:04Z srv01 sshd[105]: Failed password for invalid user root from 198.51.100.42 port 5014 ssh2
2026-08-31T04:12:07Z srv01 sshd[109]: Failed password for invalid user test from 198.51.100.42 port 5016 ssh2
2026-08-31T04:12:10Z srv01 sshd[112]: Failed password for invalid user ubuntu from 198.51.100.42 port 5018 ssh2
2026-08-31T04:13:00Z srv01 sshd[120]: Accepted password for deploy from 192.168.1.50 port 5020 ssh2
2026-08-31T04:14:22Z srv01 sshd[131]: Failed password for invalid user oracle from 203.0.113.88 port 3310 ssh2
"""

def analyze_auth_logs(raw_text, threshold=3):
    ip_pattern = r'\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b'
    failed_ips = []
    
    print("[*] Starting Log Ingestion & Threat Analysis...")
    for line in raw_text.strip().split('\\n'):
        if "Failed password" in line:
            match = re.search(ip_pattern, line)
            if match:
                failed_ips.append(match.group(0))
                
    counts = Counter(failed_ips)
    print(f"[*] Analysis complete. Found {len(failed_ips)} total failed logon events.\\n")
    
    for ip, attempts in counts.items():
        if attempts >= threshold:
            print(f"[!] [ALERT HIGH] Suspicious Brute Force Source: {ip}")
            print(f"    Failed Attempts: {attempts} (Threshold: {threshold})")
            print(f"    Action: Recommended firewall block for {ip}\\n")
        else:
            print(f"[*] [INFO] Single failed login from: {ip} (Attempts: {attempts})")

analyze_auth_logs(sample_logs, threshold=3)
`,
    expectedOutput: `[*] Starting Log Ingestion & Threat Analysis...
[*] Analysis complete. Found 5 total failed logon events.

[!] [ALERT HIGH] Suspicious Brute Force Source: 198.51.100.42
    Failed Attempts: 4 (Threshold: 3)
    Action: Recommended firewall block for 198.51.100.42

[*] [INFO] Single failed login from: 203.0.113.88 (Attempts: 1)`
  },
  {
    id: 'script-2',
    title: 'Python: File Hash (SHA-256 / MD5) Generator & Integrity Verifier',
    language: 'python',
    category: 'Cryptography & Hashes',
    description: 'Calculates cryptographic hashes of file content to detect tampering and generate IOC artifacts for VirusTotal lookups.',
    code: `import hashlib

def generate_file_hashes(content_bytes):
    md5_hash = hashlib.md5(content_bytes).hexdigest()
    sha1_hash = hashlib.sha1(content_bytes).hexdigest()
    sha256_hash = hashlib.sha256(content_bytes).hexdigest()
    
    print("========================================")
    print("      FILE INTEGRITY & IOC REPORT       ")
    print("========================================")
    print(f"MD5    : {md5_hash}")
    print(f"SHA-1  : {sha1_hash}")
    print(f"SHA-256: {sha256_hash}")
    print("========================================")
    
    # Baseline comparison check
    known_clean_sha256 = "d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2"
    if sha256_hash == known_clean_sha256:
        print("[+] File Integrity Verified: Clean baseline match.")
    else:
        print("[!] File Hash does not match baseline. (Modified or Suspicious Artifact)")

# Simulate checking a payload file
sample_binary_payload = b"MZ\x90\x00\x03\x00\x00\x00\x04\x00\x00\x00SuspiciousPayloadBinaryData"
generate_file_hashes(sample_binary_payload)
`,
    expectedOutput: `========================================
      FILE INTEGRITY & IOC REPORT       
========================================
MD5    : 161fa40a927d6d37651a148a04e578c7
SHA-1  : c574fcb4d68e2ee2a3cfefb32b85e054d5d9c6e3
SHA-256: 4945d8b76c8c365319fb78bc9cfec2fcefa404cb1a134a413d30922fead5b8fa
========================================
[!] File Hash does not match baseline. (Modified or Suspicious Artifact)`
  },
  {
    id: 'script-3',
    title: 'Python: Fast TCP Socket Port Scanner Simulator',
    language: 'python',
    category: 'Network Reconnaissance',
    description: 'Simulates a TCP port scanner checking common service ports (21, 22, 80, 443, 445, 3389) and flagging high-risk exposures.',
    code: `def simulate_port_scan(target_ip, open_ports_list):
    common_services = {
        21: ("FTP", "HIGH (Cleartext credentials)"),
        22: ("SSH", "LOW (Secure Remote CLI)"),
        80: ("HTTP", "MEDIUM (Unencrypted Web)"),
        443: ("HTTPS", "LOW (Secure Web)"),
        445: ("SMB", "CRITICAL (WannaCry / Lateral Movement Risk)"),
        3389: ("RDP", "HIGH (Brute Force / Ransomware Target)")
    }
    
    print(f"[*] Scanning Target Host: {target_ip}...")
    print("---------------------------------------------------------------")
    print(f"{'PORT':<8} {'STATE':<10} {'SERVICE':<12} {'RISK ASSESSMENT'}")
    print("---------------------------------------------------------------")
    
    for port, (service, risk) in common_services.items():
        if port in open_ports_list:
            state = "OPEN"
            print(f"{port:<8} {state:<10} {service:<12} {risk}")
        else:
            state = "CLOSED"
            
    print("---------------------------------------------------------------")
    print("[*] Scan complete. Remediate CRITICAL/HIGH ports exposed externally.")

# Target server with ports 80, 443, 445, and 3389 exposed
simulate_port_scan("198.51.100.55", [80, 443, 445, 3389])
`,
    expectedOutput: `[*] Scanning Target Host: 198.51.100.55...
---------------------------------------------------------------
PORT     STATE      SERVICE      RISK ASSESSMENT
---------------------------------------------------------------
80       OPEN       HTTP         MEDIUM (Unencrypted Web)
443      OPEN       HTTPS        LOW (Secure Web)
445      OPEN       SMB          CRITICAL (WannaCry / Lateral Movement Risk)
3389     OPEN       RDP          HIGH (Brute Force / Ransomware Target)
---------------------------------------------------------------
[*] Scan complete. Remediate CRITICAL/HIGH ports exposed externally.`
  },
  {
    id: 'script-4',
    title: 'Bash: Top Defensive Log Investigation One-Liners',
    language: 'bash',
    category: 'Bash & CLI',
    description: 'Essential Linux CLI pipelines used by SOC analysts to parse Apache and Syslog files.',
    code: `#!/bin/bash
# 1. Count top 5 HTTP request methods in access.log
cat access.log | awk '{print $6}' | tr -d '"' | sort | uniq -c | sort -nr | head -n 5

# 2. Extract requests containing potential SQL Injection characters
grep -i -E "(union.*select|'--|%27|select.*from)" access.log

# 3. Find unique usernames targeted during SSH brute force
grep "Failed password" auth.log | awk '{print $9}' | sort | uniq -c | sort -nr
`,
    expectedOutput: `   8420 GET
   1240 POST
     45 HEAD
      8 PUT
      2 DELETE`
  }
];
