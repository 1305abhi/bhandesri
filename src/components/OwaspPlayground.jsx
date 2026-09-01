import React, { useState } from 'react';
import { 
  Crosshair, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function OwaspPlayground() {
  const [activeLab, setActiveLab] = useState('sqli');

  // --- SQLi State ---
  const [sqlInput, setSqlInput] = useState("admin' OR '1'='1");
  const [useParameterized, setUseParameterized] = useState(false);

  // --- XSS State ---
  const [xssInput, setXssInput] = useState("<script>alert('Cookie Stealer: ' + document.cookie)</script>");
  const [enableHttpOnly, setEnableHttpOnly] = useState(false);
  const [enableEncoding, setEnableEncoding] = useState(false);

  // --- IDOR State ---
  const [targetUserId, setTargetUserId] = useState(103);
  const [enableServerAuthCheck, setEnableServerAuthCheck] = useState(false);

  // --- Headers State ---
  const [headers, setHeaders] = useState({
    csp: true,
    hsts: true,
    xfo: true,
    nosniff: true
  });

  const mockUsersDb = {
    102: { id: 102, name: 'John Doe (You)', role: 'Employee', salary: '$55,000' },
    103: { id: 103, name: 'Alice Smith (CEO)', role: 'Executive', salary: '$320,000' },
    104: { id: 104, name: 'Robert Chen (CFO)', role: 'Executive', salary: '$290,000' }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="card-minimal rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span>OWASP Security Playground</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Test web vulnerability payloads (SQLi, XSS, IDOR, Headers) and observe defensive fixes.
          </p>
        </div>

        {/* Lab Switcher */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'sqli', label: '1. SQL Injection' },
            { id: 'xss', label: '2. XSS' },
            { id: 'idor', label: '3. IDOR' },
            { id: 'headers', label: '4. Headers' }
          ].map(lab => (
            <button
              key={lab.id}
              onClick={() => setActiveLab(lab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeLab === lab.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                  : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {lab.label}
            </button>
          ))}
        </div>
      </div>

      {/* LAB 1: SQLi */}
      {activeLab === 'sqli' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card-minimal rounded-2xl p-5 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="font-semibold text-slate-900 dark:text-white text-xs">SQL Injection (CWE-89)</span>
              <span className="text-slate-400">Payload input</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-600 dark:text-slate-400 font-medium block">Username Input:</label>
              <input
                type="text"
                value={sqlInput}
                onChange={(e) => setSqlInput(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-slate-400"
              />
              <div className="flex gap-1.5 pt-1">
                <button onClick={() => setSqlInput("admin' OR '1'='1")} className="text-[10px] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">admin' OR '1'='1</button>
                <button onClick={() => setSqlInput("1' UNION SELECT username,password FROM users--")} className="text-[10px] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">UNION SELECT</button>
              </div>
            </div>

            {/* Defense Toggle */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-800 dark:text-slate-200">Defense Mode:</span>
                <button
                  onClick={() => setUseParameterized(!useParameterized)}
                  className={`px-2.5 py-1 rounded text-xs font-medium ${
                    useParameterized ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {useParameterized ? 'Parameterized ON' : 'String Concat'}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 font-sans">
                Prepared statements treat untrusted input strictly as literal parameter data.
              </p>
            </div>
          </div>

          <div className="card-minimal rounded-2xl p-5 space-y-3 font-mono text-xs">
            <span className="font-semibold text-slate-900 dark:text-white text-xs block border-b border-slate-100 dark:border-slate-800 pb-2">
              Database Execution
            </span>

            <div className="p-3.5 rounded-xl bg-[#0d1117] text-xs space-y-1">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Executed SQL:</span>
              {!useParameterized ? (
                <div className="text-rose-400 font-semibold whitespace-pre-wrap">
                  SELECT * FROM users WHERE username = '{sqlInput}' AND password = '***';
                </div>
              ) : (
                <div className="text-emerald-400 font-semibold whitespace-pre-wrap">
                  SELECT * FROM users WHERE username = ? AND password = ?<br />
                  PARAMS: ['{sqlInput}', '***']
                </div>
              )}
            </div>

            <div className={`p-3.5 rounded-xl border ${
              !useParameterized && sqlInput.includes("'") 
                ? 'border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200' 
                : 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
            }`}>
              <div className="flex items-center gap-1.5 font-semibold mb-0.5">
                {!useParameterized && sqlInput.includes("'") ? (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Auth Bypass Triggered (Exploited)</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Protected (Safe parameter isolation)</span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                {!useParameterized && sqlInput.includes("'")
                  ? "Untrusted string input changed the SQL query structure."
                  : "Input was evaluated as parameter data only. Query structure was preserved."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LAB 2: XSS */}
      {activeLab === 'xss' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card-minimal rounded-2xl p-5 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="font-semibold text-slate-900 dark:text-white">Cross-Site Scripting (CWE-79)</span>
              <span className="text-slate-400">Input</span>
            </div>

            <textarea
              value={xssInput}
              onChange={(e) => setXssInput(e.target.value)}
              rows={3}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none resize-none"
            />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300">HTML Entity Encoding</span>
                <button
                  onClick={() => setEnableEncoding(!enableEncoding)}
                  className={`px-2.5 py-0.5 rounded text-xs font-medium ${
                    enableEncoding ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  {enableEncoding ? 'Active' : 'Off'}
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300">Cookie HttpOnly Flag</span>
                <button
                  onClick={() => setEnableHttpOnly(!enableHttpOnly)}
                  className={`px-2.5 py-0.5 rounded text-xs font-medium ${
                    enableHttpOnly ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  {enableHttpOnly ? 'Active' : 'Off'}
                </button>
              </div>
            </div>
          </div>

          <div className="card-minimal rounded-2xl p-5 space-y-3 font-mono text-xs">
            <span className="font-semibold text-slate-900 dark:text-white block border-b border-slate-100 dark:border-slate-800 pb-2">
              Browser Render
            </span>

            <div className="p-3.5 rounded-xl bg-[#0d1117] text-xs">
              <span className="text-[10px] text-slate-400 block mb-1">Output in DOM:</span>
              {enableEncoding ? (
                <span className="text-emerald-400">{xssInput.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
              ) : (
                <span className="text-rose-400">[Unsanitized Script Executing in Browser]</span>
              )}
            </div>

            <div className={`p-3.5 rounded-xl border ${
              !enableEncoding && !enableHttpOnly 
                ? 'border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30' 
                : 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/30'
            }`}>
              <span className="font-semibold block mb-0.5">
                {!enableEncoding && !enableHttpOnly ? 'Cookie Leak Vulnerable' : 'Defenses Active'}
              </span>
              <p className="text-[11px] text-slate-500 font-sans">
                {!enableEncoding && !enableHttpOnly
                  ? "JavaScript can access document.cookie."
                  : enableHttpOnly
                  ? "HttpOnly flag blocks JavaScript cookie reads."
                  : "HTML encoding neutralizes executable script tags."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LAB 3: IDOR */}
      {activeLab === 'idor' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card-minimal rounded-2xl p-5 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="font-semibold text-slate-900 dark:text-white">IDOR (CWE-639)</span>
              <span className="text-slate-400">User #102</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-600 dark:text-slate-400 block">Requested Object ID:</label>
              <div className="flex items-center gap-1.5">
                {[102, 103, 104].map(id => (
                  <button
                    key={id}
                    onClick={() => setTargetUserId(id)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-medium ${
                      targetUserId === id 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold' 
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    user_id={id}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300">Server Authorization Check</span>
              <button
                onClick={() => setEnableServerAuthCheck(!enableServerAuthCheck)}
                className={`px-2.5 py-0.5 rounded text-xs font-medium ${
                  enableServerAuthCheck ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'
                }`}
              >
                {enableServerAuthCheck ? 'Enforced' : 'Missing'}
              </button>
            </div>
          </div>

          <div className="card-minimal rounded-2xl p-5 space-y-3 font-mono text-xs">
            <span className="font-semibold text-slate-900 dark:text-white block border-b border-slate-100 dark:border-slate-800 pb-2">
              API Server Response
            </span>

            {enableServerAuthCheck && targetUserId !== 102 ? (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-xs block text-slate-900 dark:text-white">HTTP 403 Forbidden</span>
                <p className="text-[11px] mt-0.5 font-sans">
                  Unauthorized: User #102 cannot access User #{targetUserId}'s record.
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-[#0d1117] border border-slate-800 text-slate-200 space-y-1">
                <span className="text-emerald-400 font-semibold block">HTTP 200 OK</span>
                <pre className="text-xs text-slate-300">
                  {JSON.stringify(mockUsersDb[targetUserId], null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LAB 4: HEADERS */}
      {activeLab === 'headers' && (
        <div className="card-minimal rounded-2xl p-5 space-y-3">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white">Security Headers Config</h3>
            <p className="text-xs text-slate-500">Toggle HTTP response security headers</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { key: 'csp', name: 'Content-Security-Policy', desc: 'Restricts script execution sources.', val: headers.csp },
              { key: 'hsts', name: 'Strict-Transport-Security', desc: 'Enforces HTTPS communication.', val: headers.hsts },
              { key: 'xfo', name: 'X-Frame-Options: DENY', desc: 'Prevents iframe clickjacking.', val: headers.xfo },
              { key: 'nosniff', name: 'X-Content-Type-Options', desc: 'Blocks MIME-type sniffing.', val: headers.nosniff }
            ].map(h => (
              <div key={h.key} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="font-mono font-semibold text-xs text-slate-900 dark:text-white block">{h.name}</span>
                  <p className="text-slate-500 text-xs">{h.desc}</p>
                </div>
                <button
                  onClick={() => setHeaders(prev => ({ ...prev, [h.key]: !prev[h.key] }))}
                  className={`px-2 py-0.5 rounded text-xs font-medium shrink-0 ${
                    h.val ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {h.val ? 'On' : 'Off'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
