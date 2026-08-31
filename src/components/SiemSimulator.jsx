import React, { useState } from 'react';
import { 
  Terminal, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Shield, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  BarChart2,
  Copy
} from 'lucide-react';

const RAW_LOG_DATA = [
  // Windows Security Logs
  { id: 'log-1', time: '2026-08-31 02:15:10', source: 'Windows Security', host: 'DC-PRIMARY-01', eventId: '4625', user: 'administrator', srcIp: '198.51.100.42', severity: 'High', raw: 'EventID: 4625 | LogonType: 3 (Network) | TargetUserName: administrator | FailureReason: Unknown username or bad password | IpAddress: 198.51.100.42' },
  { id: 'log-2', time: '2026-08-31 02:15:12', source: 'Windows Security', host: 'DC-PRIMARY-01', eventId: '4625', user: 'admin', srcIp: '198.51.100.42', severity: 'High', raw: 'EventID: 4625 | LogonType: 3 (Network) | TargetUserName: admin | FailureReason: Unknown username or bad password | IpAddress: 198.51.100.42' },
  { id: 'log-3', time: '2026-08-31 02:15:15', source: 'Windows Security', host: 'DC-PRIMARY-01', eventId: '4625', user: 'root', srcIp: '198.51.100.42', severity: 'High', raw: 'EventID: 4625 | LogonType: 3 (Network) | TargetUserName: root | FailureReason: Unknown username or bad password | IpAddress: 198.51.100.42' },
  { id: 'log-4', time: '2026-08-31 02:16:00', source: 'Windows Security', host: 'DC-PRIMARY-01', eventId: '4624', user: 'svc_backup', srcIp: '10.0.1.20', severity: 'Low', raw: 'EventID: 4624 | LogonType: 3 (Network) | TargetUserName: svc_backup | TargetDomainName: CORP | IpAddress: 10.0.1.20' },
  { id: 'log-5', time: '2026-08-31 03:22:45', source: 'Windows Security', host: 'DC-PRIMARY-01', eventId: '4720', user: 'backdoor_admin', srcIp: '10.0.4.18', severity: 'Critical', raw: 'EventID: 4720 | A user account was created | TargetUserName: backdoor_admin | SubjectUserName: SYSTEM | TargetSid: S-1-5-21-3941-1002' },
  { id: 'log-6', time: '2026-08-31 03:23:01', source: 'Windows Security', host: 'DC-PRIMARY-01', eventId: '1102', user: 'backdoor_admin', srcIp: '10.0.4.18', severity: 'Critical', raw: 'EventID: 1102 | The audit log was cleared | SubjectUserName: backdoor_admin | Domain: CORP' },

  // Linux Auth Logs
  { id: 'log-7', time: '2026-08-31 04:10:01', source: 'Linux auth.log', host: 'srv-web-01', eventId: 'sshd_failed', user: 'root', srcIp: '203.0.113.88', severity: 'High', raw: 'sshd[4102]: Failed password for invalid user root from 203.0.113.88 port 51204 ssh2' },
  { id: 'log-8', time: '2026-08-31 04:10:04', source: 'Linux auth.log', host: 'srv-web-01', eventId: 'sshd_failed', user: 'ubuntu', srcIp: '203.0.113.88', severity: 'High', raw: 'sshd[4105]: Failed password for invalid user ubuntu from 203.0.113.88 port 51206 ssh2' },
  { id: 'log-9', time: '2026-08-31 04:10:20', source: 'Linux auth.log', host: 'srv-web-01', eventId: 'sshd_accept', user: 'dev_sarah', srcIp: '192.168.1.15', severity: 'Low', raw: 'sshd[4110]: Accepted publickey for dev_sarah from 192.168.1.15 port 51210 ssh2: RSA SHA256:8f...' },

  // Web Server Access Logs
  { id: 'log-10', time: '2026-08-31 05:40:12', source: 'Apache Access', host: 'srv-web-01', eventId: 'HTTP 404', user: 'anonymous', srcIp: '198.51.100.99', severity: 'Medium', raw: '198.51.100.99 - - [31/Aug/2026:05:40:12] "GET /phpmyadmin/index.php HTTP/1.1" 404 182 "-" "sqlmap/1.6#stable"' },
  { id: 'log-11', time: '2026-08-31 05:40:15', source: 'Apache Access', host: 'srv-web-01', eventId: 'HTTP 500', user: 'anonymous', srcIp: '198.51.100.99', severity: 'Critical', raw: '198.51.100.99 - - [31/Aug/2026:05:40:15] "GET /api/products?id=1%27%20UNION%20SELECT%20username,password%20FROM%20users-- HTTP/1.1" 500 520' },
  { id: 'log-12', time: '2026-08-31 05:42:00', source: 'Apache Access', host: 'srv-web-01', eventId: 'HTTP 200', user: 'customer_14', srcIp: '103.22.44.11', severity: 'Low', raw: '103.22.44.11 - - [31/Aug/2026:05:42:00] "GET /shop/item?id=45 HTTP/1.1" 200 4501 "https://google.com" "Mozilla/5.0"' },

  // Sysmon Endpoint Telemetry
  { id: 'log-13', time: '2026-08-31 06:14:20', source: 'Sysmon', host: 'WS-FINANCE-04', eventId: 'Sysmon 1', user: 'john.doe', srcIp: '192.168.10.45', severity: 'Critical', raw: 'Sysmon Event 1: Process Creation | Image: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe | CommandLine: powershell.exe -w hidden -enc SQBFAFgA... | ParentImage: OUTLOOK.EXE' }
];

export default function SiemSimulator() {
  const [query, setQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('All');
  const [expandedLogId, setExpandedLogId] = useState(null);
  const [showStats, setShowStats] = useState(false);

  const presets = [
    { label: 'Brute Force Attempts (4625 / Failed)', q: '4625 OR Failed' },
    { label: 'High-Severity Anti-Forensics (1102 / Cleared)', q: '1102 OR cleared' },
    { label: 'Unauthorized Account Creation (4720)', q: '4720' },
    { label: 'SQL Injection Signatures', q: 'UNION SELECT OR sqlmap' },
    { label: 'Suspicious PowerShell Execution', q: 'powershell.exe' }
  ];

  // Filtering
  const filteredLogs = RAW_LOG_DATA.filter(item => {
    if (selectedSource !== 'All' && item.source !== selectedSource) return false;
    
    if (query.trim()) {
      const q = query.toLowerCase();
      const matchRaw = item.raw.toLowerCase().includes(q);
      const matchHost = item.host.toLowerCase().includes(q);
      const matchUser = item.user.toLowerCase().includes(q);
      const matchIp = item.srcIp.toLowerCase().includes(q);
      const matchId = item.eventId.toLowerCase().includes(q);
      if (!matchRaw && !matchHost && !matchUser && !matchIp && !matchId) return false;
    }
    return true;
  });

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'Critical': return 'bg-rose-100 text-rose-800 dark:bg-red-500/20 dark:text-red-400 border-rose-300 dark:border-red-500/40 font-bold';
      case 'High': return 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 border-amber-300 dark:border-amber-500/40 font-bold';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400 border-yellow-300 dark:border-yellow-500/40 font-medium';
      default: return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/40 font-medium';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#0a0f1e] border border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 card-subtle-shadow">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 dark:bg-cyan-400 animate-pulse" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
              <Terminal className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
              <span>SIEM LOG HUNTER & QUERY ENGINE</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Simulate real Splunk SPL / Elastic KQL queries across Windows Event Logs, Sysmon, and Linux authentication logs.
          </p>
        </div>

        <button
          onClick={() => setShowStats(!showStats)}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-400 text-slate-700 dark:text-cyan-300 text-xs font-mono font-semibold flex items-center gap-2"
        >
          <BarChart2 className="w-4 h-4" />
          <span>{showStats ? 'Hide Aggregates' : 'View SPL Stats'}</span>
        </button>
      </div>

      {/* Query Bar & Presets */}
      <div className="bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4 card-subtle-shadow">
        
        {/* Search Query Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-sky-600 dark:text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Enter SPL / Search filter (e.g., "EventID=4625", "198.51.100.42", "powershell", "UNION SELECT")...'
            className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:border-sky-500 text-xs text-slate-900 dark:text-cyan-200 placeholder-slate-400 font-mono focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500 hover:text-slate-900 px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Query Presets */}
        <div className="space-y-1.5">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-sky-600 dark:text-cyan-400" />
            <span>Threat Hunting Presets:</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(p.q)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-400 text-slate-700 dark:text-slate-300 text-[11px] font-mono transition-all font-medium"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Source Selector Pills */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] text-slate-400">Source:</span>
            {['All', 'Windows Security', 'Linux auth.log', 'Apache Access', 'Sysmon'].map(src => (
              <button
                key={src}
                onClick={() => setSelectedSource(src)}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono whitespace-nowrap transition-all ${
                  selectedSource === src
                    ? 'bg-sky-100 text-sky-800 dark:bg-cyan-950 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/40 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {src}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono shrink-0">
            {filteredLogs.length} Events Matched
          </span>
        </div>
      </div>

      {/* Aggregate Stats Section */}
      {showStats && (
        <div className="bg-white dark:bg-[#0d1528] border border-slate-200 dark:border-cyan-500/30 rounded-3xl p-5 space-y-3 animate-fadeIn card-subtle-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
              <span>SPL AGGREGATION: | stats count by src_ip, user, severity</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Calculated from current view</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Top Attacking IP</span>
              <span className="text-rose-600 dark:text-red-400 font-bold text-sm block mt-1">198.51.100.42</span>
              <span className="text-[10px] text-slate-400">3 Failed Logons (Brute Force)</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">High-Risk Users Targeted</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold text-sm block mt-1">administrator, root</span>
              <span className="text-[10px] text-slate-400">Privileged Accounts</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Critical Event Triggers</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold text-sm block mt-1">Event 4720 & 1102</span>
              <span className="text-[10px] text-slate-400">Backdoor Account + Audit Cleared</span>
            </div>
          </div>
        </div>
      )}

      {/* Log Events Table */}
      <div className="bg-white dark:bg-[#0b101c] border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden card-subtle-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Timestamp (UTC)</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Host</th>
                <th className="py-3 px-4">Event ID / Code</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Source IP</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4 text-right">Raw</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {filteredLogs.length > 0 ? (
                filteredLogs.map(log => {
                  const isExpanded = expandedLogId === log.id;
                  return (
                    <React.Fragment key={log.id}>
                      <tr 
                        onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                        className="hover:bg-slate-50 dark:hover:bg-slate-900/60 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-4 whitespace-nowrap text-slate-500">{log.time}</td>
                        <td className="py-3 px-4 whitespace-nowrap font-semibold text-sky-700 dark:text-cyan-300">{log.source}</td>
                        <td className="py-3 px-4 whitespace-nowrap text-slate-800 dark:text-slate-200">{log.host}</td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-bold text-slate-800 dark:text-cyan-400">
                            {log.eventId}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap font-bold text-slate-900 dark:text-slate-200">{log.user}</td>
                        <td className="py-3 px-4 whitespace-nowrap text-slate-600 dark:text-slate-400">{log.srcIp}</td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded-md border text-[10px] ${getSeverityBadge(log.severity)}`}>
                            {log.severity}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900">
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Raw Log Detail */}
                      {isExpanded && (
                        <tr className="bg-slate-50 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-800">
                          <td colSpan={8} className="p-4 space-y-2">
                            <div className="flex items-center justify-between text-[11px] text-slate-500">
                              <span className="font-bold text-sky-700 dark:text-cyan-400">RAW SECURITY LOG PAYLOAD:</span>
                              <button 
                                onClick={() => navigator.clipboard.writeText(log.raw)}
                                className="flex items-center gap-1 hover:text-sky-600 font-medium"
                              >
                                <Copy className="w-3 h-3" />
                                <span>Copy Log</span>
                              </button>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed font-mono">
                              {log.raw}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No log events matched your search query. Try typing `4625` or selecting `All`.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
