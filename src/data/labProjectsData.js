/**
 * Practical Home SOC Lab Blueprints & Portfolio Project Guides for Fresher Cyber Security Roles.
 */

export const LAB_PROJECTS_DATA = [
  {
    id: 'lab-1',
    title: 'Enterprise Home SOC Lab: Wazuh SIEM + Windows 11 & Sysmon',
    badge: 'Flagship Portfolio Project',
    difficulty: 'Intermediate',
    estimatedHours: 6,
    overview: 'Deploy a full open-source enterprise SIEM environment on your PC using VirtualBox, an Ubuntu Wazuh Manager, and a Windows 11 victim endpoint with Sysmon telemetry.',
    skillsDemonstrated: [
      'Wazuh SIEM Manager & Indexer deployment',
      'Windows Sysmon installation & SwiftOnSecurity config',
      'Active Directory / Local Security Event forwarding',
      'Authoring custom XML correlation rules for brute force & Mimikatz'
    ],
    architecture: `
[ Host Machine (VirtualBox / VMware) ]
  ├── VM 1: Wazuh SIEM Server (Ubuntu Server 22.04 LTS - 4GB RAM)
  └── VM 2: Windows 11 Target Endpoint + Wazuh Agent + Sysmon (4GB RAM)
    `,
    stepByStepGuide: [
      {
        step: 1,
        title: 'Install VirtualBox & Deploy Ubuntu Server',
        details: 'Download VirtualBox 7.x. Download Ubuntu Server 22.04 LTS ISO. Allocate 2 vCPUs and 4GB RAM. Set Network Adapter to "Bridged" or "Host-Only" so both VMs can communicate.'
      },
      {
        step: 2,
        title: 'Deploy Wazuh SIEM via Quick Install Script',
        details: 'On the Ubuntu VM, execute: `curl -sO https://packages.wazuh.com/4.8/wazuh-install.sh && sudo bash ./wazuh-install.sh -a`. Save the generated admin credentials and verify you can log into `https://<Ubuntu_IP>`.'
      },
      {
        step: 3,
        title: 'Install Sysmon on Windows 11 Target',
        details: 'Download Sysmon from Microsoft Sysinternals. Download the industry standard SwiftOnSecurity sysmonconfig.xml. Run: `sysmon.exe -i sysmonconfig.xml -accepteula` in Administrator PowerShell.'
      },
      {
        step: 4,
        title: 'Install Wazuh Agent & Connect to Server',
        details: 'From Wazuh Web UI, click "Add Agent" -> Select Windows -> Paste the installation command in Windows PowerShell -> Start the Wazuh service.'
      },
      {
        step: 5,
        title: 'Simulate Attacks & Verify Alerts',
        details: 'Simulate 10 failed logins, execute encoded PowerShell, and observe the high-severity alert triggers appear in real time on the Wazuh Security Events dashboard!'
      }
    ],
    resumeBullet: 'Engineered a virtualized enterprise SOC detection lab utilizing Wazuh SIEM and Windows Sysmon; configured custom XML correlation rules to alert on privilege escalation and brute-force events in real time.'
  },
  {
    id: 'lab-2',
    title: 'Splunk Boss of the SOC (BOTS) Enterprise Incident Investigation',
    badge: 'SOC Triage Project',
    difficulty: 'Intermediate',
    estimatedHours: 4,
    overview: 'Investigate a real-world APT cyber attack dataset using Splunk Free. Trace an adversary from initial external port scan and web attack to credential dumping and C2 beaconing.',
    skillsDemonstrated: [
      'Splunk Search Processing Language (SPL) mastery',
      'Correlating firewall, web proxy, and Windows event logs',
      'Reconstructing attack timelines from initial access to impact',
      'Authoring a formal SOC Incident post-mortem report'
    ],
    architecture: `
[ Splunk Free Enterprise Instance ]
  └── Ingested Dataset: BOTSv1 / BOTSv2 (Real attack telemetry containing IIS, Suricata, Sysmon, and Auth logs)
    `,
    stepByStepGuide: [
      {
        step: 1,
        title: 'Install Splunk Free & Download BOTS Dataset',
        details: 'Download Splunk Enterprise Free Trial (converts to free 500MB/day). Download the BOTSv1 dataset from GitHub/Splunk.'
      },
      {
        step: 2,
        title: 'Identify Initial Web Attack',
        details: 'Run SPL: `index=botsv1 sourcetype=stream:http | stats count by src_ip, uri` to pinpoint the attacker scanning for vulnerable Joomla / WordPress plugins.'
      },
      {
        step: 3,
        title: 'Trace Lateral Movement & Host Compromise',
        details: 'Run SPL: `index=botsv1 sourcetype=XmlWinEventLog:Microsoft-Windows-Sysmon/Operational EventCode=1` to observe the webshell spawning cmd.exe and dumping hashes.'
      },
      {
        step: 4,
        title: 'Document Complete Attack Timeline',
        details: 'Compile IOCs (Attacker IP, malicious domain, dropped executable hash) and write a 2-page executive summary incident report.'
      }
    ],
    resumeBullet: 'Analyzed enterprise attack datasets in Splunk SPL using Boss of the SOC (BOTS); reconstructed multi-stage intrusion timelines and mapped malicious behaviors to the MITRE ATT&CK framework.'
  },
  {
    id: 'lab-3',
    title: 'Python Security Automation: Log Parser & Threat Intel Enricher',
    badge: 'Automation Project',
    difficulty: 'Beginner - Intermediate',
    estimatedHours: 3,
    overview: 'Build a standalone Python CLI tool that parses raw server authentication logs, extracts attacker IPs using regular expressions, queries AbuseIPDB / VirusTotal APIs, and generates an alert report.',
    skillsDemonstrated: [
      'Python `re` regular expression parsing',
      'REST API integration with `requests` / `urllib`',
      'Defensive automation and alert scoring logic',
      'JSON and Markdown report generation'
    ],
    architecture: `
[ Raw Authentication Log File (auth.log / access.log) ]
       ↓
[ Python Script (Regex Parser + Counter) ]
       ↓
[ Threat Intelligence API Query (AbuseIPDB / VirusTotal) ]
       ↓
[ Formatted SOC Alert Summary (JSON / HTML) ]
    `,
    stepByStepGuide: [
      {
        step: 1,
        title: 'Create Python Script & Regex Extractor',
        details: 'Write regex patterns to extract IPv4 addresses, timestamps, and usernames from failed authentication log lines.'
      },
      {
        step: 2,
        title: 'Integrate Threat Intel API',
        details: 'Register for a free AbuseIPDB API key. Send HTTP GET requests to check confidence of abuse score for extracted external IPs.'
      },
      {
        step: 3,
        title: 'Build Alerting & Reporting Output',
        details: 'Generate a clean terminal dashboard and export findings to a CSV or JSON file.'
      }
    ],
    resumeBullet: 'Developed an automated Python security log triage utility utilizing regex and REST APIs to ingest authentication logs, detect brute-force thresholds, and enrich attacker IPs with live threat intelligence.'
  }
];
