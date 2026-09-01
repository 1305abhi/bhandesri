import React, { useState } from 'react';
import { 
  Terminal, 
  Search, 
  BarChart2, 
  ChevronDown, 
  ChevronUp, 
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
    { label: 'Failed Logons (4625)', q: '4625 OR Failed' },
    { label: 'Cleared Logs (1102)', q: '1102 OR cleared' },
    { label: 'User Created (4720)', q: '4720' },
    { label: 'SQL Injection', q: 'UNION SELECT OR sqlmap' },
    { label: 'PowerShell Execution', q: 'powershell.exe' }
  ];

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
      case 'Critical': return 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-900';
      case 'High': return 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-900';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300 border-yellow-200 dark:border-yellow-900';
      default: return 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Minimal Header */}
      <div className="card-minimal rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span>SIEM Log Hunter</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Query across Windows Security, Sysmon, and Linux authentication logs.
          </p>
        </div>

        <button
          onClick={() => setShowStats(!showStats)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>{showStats ? 'Hide Aggregation' : 'View Stats'}</span>
        </button>
      </div>

      {/* Query Bar */}
      <div className="card-minimal rounded-2xl p-4 space-y-3">
        
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Filter logs (e.g. "4625", "198.51.100.42", "powershell", "UNION SELECT")...'
            className="w-full pl-8 pr-16 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 font-mono focus:outline-none focus:border-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] text-slate-400">Presets:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(p.q)}
              className="px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-mono"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Source Selector */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[11px] text-slate-400">Source:</span>
            {['All', 'Windows Security', 'Linux auth.log', 'Apache Access', 'Sysmon'].map(src => (
              <button
                key={src}
                onClick={() => setSelectedSource(src)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-mono whitespace-nowrap transition-colors ${
                  selectedSource === src
                    ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 font-semibold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {src}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-mono text-slate-400 shrink-0">
            {filteredLogs.length} Events
          </span>
        </div>
      </div>

      {/* Aggregate Stats Section */}
      {showStats && (
        <div className="card-minimal rounded-2xl p-4 space-y-2.5 animate-fadeIn">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
            Log Aggregation Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Top Attacking IP</span>
              <span className="font-mono font-semibold text-rose-600 dark:text-rose-400 text-xs block mt-0.5">198.51.100.42</span>
              <span className="text-[10px] text-slate-400">3 Failed Logons</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Targeted Accounts</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white text-xs block mt-0.5">administrator, root</span>
              <span className="text-[10px] text-slate-400">Privileged Accounts</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Critical Event Triggers</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white text-xs block mt-0.5">Event 4720 & 1102</span>
              <span className="text-[10px] text-slate-400">Account Created + Audit Cleared</span>
            </div>
          </div>
        </div>
      )}

      {/* Log Events Table */}
      <div className="card-minimal rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-3.5">Timestamp</th>
                <th className="py-2.5 px-3.5">Source</th>
                <th className="py-2.5 px-3.5">Host</th>
                <th className="py-2.5 px-3.5">Event ID</th>
                <th className="py-2.5 px-3.5">User</th>
                <th className="py-2.5 px-3.5">Source IP</th>
                <th className="py-2.5 px-3.5">Severity</th>
                <th className="py-2.5 px-3.5 text-right">Details</th>
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
                        className="hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer transition-colors"
                      >
                        <td className="py-2 px-3.5 whitespace-nowrap text-slate-400">{log.time}</td>
                        <td className="py-2 px-3.5 whitespace-nowrap font-medium text-slate-900 dark:text-slate-100">{log.source}</td>
                        <td className="py-2 px-3.5 whitespace-nowrap text-slate-600 dark:text-slate-400">{log.host}</td>
                        <td className="py-2 px-3.5 whitespace-nowrap font-semibold">{log.eventId}</td>
                        <td className="py-2 px-3.5 whitespace-nowrap">{log.user}</td>
                        <td className="py-2 px-3.5 whitespace-nowrap text-slate-500">{log.srcIp}</td>
                        <td className="py-2 px-3.5 whitespace-nowrap">
                          <span className={`px-1.5 py-0.2 rounded border text-[10px] font-medium ${getSeverityBadge(log.severity)}`}>
                            {log.severity}
                          </span>
                        </td>
                        <td className="py-2 px-3.5 text-right">
                          <button className="p-0.5 rounded text-slate-400 hover:text-slate-900">
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
                          <td colSpan={8} className="p-3.5 space-y-1.5">
                            <div className="flex items-center justify-between text-[11px] text-slate-500">
                              <span className="font-semibold">Raw Log Payload:</span>
                              <button 
                                onClick={() => navigator.clipboard.writeText(log.raw)}
                                className="flex items-center gap-1 hover:text-slate-900"
                              >
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </button>
                            </div>
                            <pre className="p-3 rounded-lg bg-[#0d1117] text-emerald-400 text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed font-mono">
                              {log.raw}
                            </pre>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-slate-400">
                    No log events matched your query.
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
