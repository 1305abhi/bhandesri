import React, { useState } from 'react';
import { 
  Crosshair, 
  Shield, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  Code, 
  Terminal, 
  Zap, 
  Sparkles,
  Server
} from 'lucide-react';

export default function OwaspPlayground() {
  const [activeLab, setActiveLab] = useState('sqli'); // 'sqli', 'xss', 'idor', 'headers'

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
    102: { id: 102, name: 'John Doe (You)', role: 'Employee', salary: '$55,000', ssn: '***-**-1042' },
    103: { id: 103, name: 'Alice Smith (CEO)', role: 'Executive', salary: '$320,000', ssn: '984-21-9901' },
    104: { id: 104, name: 'Robert Chen (CFO)', role: 'Executive', salary: '$290,000', ssn: '741-92-3814' }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#0f0e24] border border-slate-200 dark:border-red-500/30 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 card-subtle-shadow">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-rose-600 dark:text-red-400" />
              <span>OWASP TOP 10 INTERACTIVE SECURITY PLAYGROUND</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Test real web vulnerabilities (SQLi, XSS, IDOR, Headers) and observe how defensive controls fix them in code.
          </p>
        </div>

        {/* Lab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'sqli', label: '1. SQL Injection' },
            { id: 'xss', label: '2. Cross-Site Scripting (XSS)' },
            { id: 'idor', label: '3. Broken Auth / IDOR' },
            { id: 'headers', label: '4. Security Headers' }
          ].map(lab => (
            <button
              key={lab.id}
              onClick={() => setActiveLab(lab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                activeLab === lab.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              {lab.label}
            </button>
          ))}
        </div>
      </div>

      {/* LAB 1: SQL INJECTION */}
      {activeLab === 'sqli' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 font-mono text-xs card-subtle-shadow">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="font-bold text-rose-600 dark:text-red-400 text-sm">SQL INJECTION (SQLi) LAB</span>
              <span className="text-slate-400">CWE-89</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-400 font-bold block">Login Username Input Payload:</label>
              <input
                type="text"
                value={sqlInput}
                onChange={(e) => setSqlInput(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-rose-700 dark:text-red-300 font-mono text-xs focus:border-rose-500 focus:outline-none"
              />
              <div className="flex gap-2 pt-1">
                <button onClick={() => setSqlInput("admin' OR '1'='1")} className="text-[10px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-rose-600 font-bold border border-slate-200 dark:border-slate-800">admin' OR '1'='1</button>
                <button onClick={() => setSqlInput("1' UNION SELECT username,password FROM users--")} className="text-[10px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-rose-600 font-bold border border-slate-200 dark:border-slate-800">UNION SELECT</button>
              </div>
            </div>

            {/* Defense Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-900 dark:text-white font-bold">Defensive Mode:</span>
                <button
                  onClick={() => setUseParameterized(!useParameterized)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    useParameterized 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-rose-100 text-rose-800 dark:bg-red-500/20 dark:text-red-400 border border-rose-300 dark:border-red-500/40'
                  }`}
                >
                  {useParameterized ? '✅ Parameterized Queries ON' : '❌ Vulnerable String Concat'}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Prepared statements treat untrusted input as literal data strings instead of executable SQL syntax.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 font-mono text-xs card-subtle-shadow">
            <span className="font-bold text-sky-700 dark:text-cyan-400 text-sm block border-b border-slate-100 dark:border-slate-800 pb-3">
              BACKEND DATABASE QUERY EXECUTION
            </span>

            <div className="p-4 rounded-2xl bg-slate-900 text-xs text-slate-300 space-y-2">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Compiled SQL Query:</span>
              {!useParameterized ? (
                <div className="text-rose-400 font-bold whitespace-pre-wrap">
                  SELECT * FROM users WHERE username = '{sqlInput}' AND password = '***';
                </div>
              ) : (
                <div className="text-emerald-400 font-bold whitespace-pre-wrap">
                  PREPARED STATEMENT: SELECT * FROM users WHERE username = ? AND password = ?<br />
                  PARAMS: ['{sqlInput}', '***']
                </div>
              )}
            </div>

            <div className={`p-4 rounded-2xl border ${
              !useParameterized && sqlInput.includes("'") 
                ? 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-red-950/40 dark:border-red-500 dark:text-red-200' 
                : 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-500 dark:text-emerald-200'
            }`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                {!useParameterized && sqlInput.includes("'") ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-red-400" />
                    <span>AUTHENTICATION BYPASSED! (Logged in as Administrator)</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>LOGIN REJECTED (Safe: Input treated as literal username string)</span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                {!useParameterized && sqlInput.includes("'")
                  ? "Because untrusted input was concatenated, the 'OR 1=1' condition evaluated to TRUE for all database rows."
                  : "The database safely isolated parameters from query logic. No SQL injection occurred."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LAB 2: XSS */}
      {activeLab === 'xss' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 font-mono text-xs card-subtle-shadow">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="font-bold text-rose-600 dark:text-red-400 text-sm">STORED / REFLECTED XSS LAB</span>
              <span className="text-slate-400">CWE-79</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-400 font-bold block">User Comment Payload:</label>
              <textarea
                value={xssInput}
                onChange={(e) => setXssInput(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-amber-800 dark:text-amber-300 font-mono text-xs focus:border-amber-500 focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-800 dark:text-slate-200 font-medium">Output HTML Entity Encoding</span>
                <button
                  onClick={() => setEnableEncoding(!enableEncoding)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    enableEncoding ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {enableEncoding ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-800 dark:text-slate-200 font-medium">Set-Cookie: HttpOnly Flag</span>
                <button
                  onClick={() => setEnableHttpOnly(!enableHttpOnly)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    enableHttpOnly ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {enableHttpOnly ? 'Protected' : 'No HttpOnly'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 font-mono text-xs card-subtle-shadow">
            <span className="font-bold text-sky-700 dark:text-cyan-400 text-sm block border-b border-slate-100 dark:border-slate-800 pb-3">
              CLIENT-SIDE BROWSER DOM EXECUTION
            </span>

            <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 space-y-2">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Rendered Page Preview:</span>
              <div className="p-3 rounded-xl bg-slate-950 text-slate-200">
                {enableEncoding ? (
                  <span className="text-emerald-400">{xssInput.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
                ) : (
                  <span className="text-rose-400">[Executing Unsanitized Script in Browser Context]</span>
                )}
              </div>
            </div>

            <div className={`p-4 rounded-2xl border ${
              !enableEncoding && !enableHttpOnly 
                ? 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-red-950/40 dark:border-red-500 dark:text-red-200' 
                : 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-500 dark:text-emerald-200'
            }`}>
              <span className="font-bold block mb-1">
                {!enableEncoding && !enableHttpOnly 
                  ? '🚨 SESSION COOKIE STOLEN VIA JAVASCRIPT!' 
                  : '🛡️ DEFENSES ACTIVE (Cookie Protected / Script Encoded)'}
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                {!enableEncoding && !enableHttpOnly
                  ? "Attacker script accessed document.cookie and transmitted it to attacker server."
                  : enableHttpOnly
                  ? "HttpOnly blocked JavaScript from reading document.cookie."
                  : "HTML entity encoding turned `<` into `&lt;`, neutralizing injection."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LAB 3: IDOR */}
      {activeLab === 'idor' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 font-mono text-xs card-subtle-shadow">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="font-bold text-rose-600 dark:text-red-400 text-sm">INSECURE DIRECT OBJECT REFERENCE (IDOR)</span>
              <span className="text-slate-400">CWE-639</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 space-y-1">
              <span className="text-[10px] text-sky-700 dark:text-cyan-400 block font-bold">CURRENT AUTHENTICATED SESSION:</span>
              <p>Logged in as: <strong>John Doe (User ID #102)</strong></p>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-400 font-bold block">Tamper API Parameter (Target User ID):</label>
              <div className="flex items-center gap-2">
                {[102, 103, 104].map(id => (
                  <button
                    key={id}
                    onClick={() => setTargetUserId(id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      targetUserId === id 
                        ? 'bg-sky-600 text-white shadow-sm' 
                        : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    /api/profile?user_id={id}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-800 dark:text-slate-200 font-medium">Server-Side Authorization Check:</span>
              <button
                onClick={() => setEnableServerAuthCheck(!enableServerAuthCheck)}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  enableServerAuthCheck ? 'bg-emerald-600 text-white' : 'bg-rose-100 text-rose-800 dark:bg-red-500/20 dark:text-red-400 border border-rose-300 dark:border-red-500/40'
                }`}
              >
                {enableServerAuthCheck ? 'Enforced' : 'Missing (Vulnerable)'}
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 font-mono text-xs card-subtle-shadow">
            <span className="font-bold text-sky-700 dark:text-cyan-400 text-sm block border-b border-slate-100 dark:border-slate-800 pb-3">
              API SERVER RESPONSE
            </span>

            {enableServerAuthCheck && targetUserId !== 102 ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-500 dark:text-emerald-300 space-y-2">
                <span className="font-bold text-sm block">HTTP/1.1 403 FORBIDDEN</span>
                <p className="text-xs">
                  {`{"error": "Access Denied: Authenticated User #102 is not authorized to view User #${targetUserId}'s record."}`}
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 space-y-2">
                <span className="text-emerald-400 font-bold block">HTTP/1.1 200 OK</span>
                <pre className="text-xs text-sky-300">
                  {JSON.stringify(mockUsersDb[targetUserId], null, 2)}
                </pre>
                {targetUserId !== 102 && !enableServerAuthCheck && (
                  <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[11px] mt-2 font-sans font-medium">
                    ⚠️ CRITICAL: Private salary and SSN for {mockUsersDb[targetUserId].name} leaked without authorization!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* LAB 4: SECURITY HEADERS */}
      {activeLab === 'headers' && (
        <div className="bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-6 card-subtle-shadow">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">HTTP Security Headers Configuration Lab</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Toggle defensive HTTP response headers and observe the protection score.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'csp', name: 'Content-Security-Policy', desc: 'Restricts script sources to self; defeats XSS injections.', val: headers.csp },
              { key: 'hsts', name: 'Strict-Transport-Security', desc: 'Forces browser to only load site via HTTPS for 1 year.', val: headers.hsts },
              { key: 'xfo', name: 'X-Frame-Options: DENY', desc: 'Prevents page from rendering in hidden iframes (Clickjacking).', val: headers.xfo },
              { key: 'nosniff', name: 'X-Content-Type-Options', desc: 'Blocks MIME-type sniffing by browsers.', val: headers.nosniff }
            ].map(h => (
              <div key={h.key} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="font-mono font-bold text-sky-700 dark:text-cyan-400 text-xs block">{h.name}</span>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">{h.desc}</p>
                </div>
                <button
                  onClick={() => setHeaders(prev => ({ ...prev, [h.key]: !prev[h.key] }))}
                  className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 ${
                    h.val ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {h.val ? 'Active' : 'Missing'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
