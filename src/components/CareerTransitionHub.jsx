import React, { useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  HelpCircle, 
  Terminal, 
  Check, 
  Copy, 
  ChevronDown, 
  ChevronUp, 
  Search 
} from 'lucide-react';
import { INTERVIEW_QUESTIONS_DATA, INTERVIEW_CATEGORIES } from '../data/interviewQuestionsData';
import { LAB_PROJECTS_DATA } from '../data/labProjectsData';

export default function CareerTransitionHub({ progress, toggleLabCompleted }) {
  const [activeTab, setActiveTab] = useState('resume');
  const [selectedInterviewCategory, setSelectedInterviewCategory] = useState('All');
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [interviewSearch, setInterviewSearch] = useState('');
  const [copiedBulletIdx, setCopiedBulletIdx] = useState(null);

  const resumeBullets = [
    {
      title: 'SIEM Log Correlation & Incident Detection',
      bullet: 'Architected and monitored a virtualized security operations pipeline using Wazuh SIEM, Splunk, and Windows Sysmon; authored custom correlation queries to detect brute-force logons (Event 4625), Mimikatz credential dumping, and obfuscated PowerShell execution.'
    },
    {
      title: 'Network Packet Forensics & Traffic Inspection',
      bullet: 'Investigated enterprise attack captures in Wireshark and Splunk SPL using Boss of the SOC (BOTS); reconstructed multi-stage intrusion timelines, extracted malicious IP/domain IOCs, and mapped adversary tradecraft to the MITRE ATT&CK matrix.'
    },
    {
      title: 'Web Application Security & Vulnerability Assessment',
      bullet: 'Evaluated enterprise web and API authorization controls using Burp Suite and Postman; identified and documented critical Broken Object Level Authorization (IDOR), SQL injection, and rate-limiting vulnerabilities prior to production deployment.'
    },
    {
      title: 'Defensive Security Scripting & Automation',
      bullet: 'Authored modular Python security scripts utilizing regular expressions to parse authentication logs, calculate cryptographic SHA-256 hashes, and automate threat intelligence enrichment via REST APIs.'
    }
  ];

  const handleCopyBullet = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    setTimeout(() => setCopiedBulletIdx(null), 2000);
  };

  const filteredQuestions = INTERVIEW_QUESTIONS_DATA.filter(q => {
    if (selectedInterviewCategory !== 'All' && q.category !== selectedInterviewCategory) return false;
    if (interviewSearch.trim()) {
      const s = interviewSearch.toLowerCase();
      return q.question.toLowerCase().includes(s) || q.answer.toLowerCase().includes(s);
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="card-minimal rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span>Career & Interview Accelerator</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Technical resume bullets, home lab blueprints, and 50+ curated interview Q&As.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'resume', label: 'Resume Strategy', icon: FileText },
            { id: 'labs', label: 'Home Lab Projects', icon: Terminal },
            { id: 'interview', label: '50+ Interview Q&A', icon: HelpCircle }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                    : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: RESUME STRATEGY */}
      {activeTab === 'resume' && (
        <div className="space-y-4">
          
          <div className="card-minimal rounded-2xl p-6 space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Professional Summary Template
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
              "Cybersecurity Analyst with strong practical foundations in Network Defense, SIEM Log Correlation (Splunk & Wazuh), Packet Inspection (Wireshark), Endpoint Telemetry (Sysmon), and Web Vulnerability Assessment (OWASP Top 10). Proven track record analyzing authentication anomalies, brute-force intrusions, and API authorization flaws. Experienced in architecting virtualized home SOC detection pipelines and investigating incident alert lifecycles."
            </p>
          </div>

          {/* Bullets */}
          <div className="card-minimal rounded-2xl p-6 space-y-3">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Project & Competency Bullets</h3>
              <p className="text-xs text-slate-500">Copy these bullet points to adapt to your technical resume.</p>
            </div>

            <div className="space-y-2.5">
              {resumeBullets.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white">{item.title}</span>
                    <button
                      onClick={() => handleCopyBullet(item.bullet, idx)}
                      className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-mono flex items-center gap-1"
                    >
                      {copiedBulletIdx === idx ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedBulletIdx === idx ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">{item.bullet}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Competency Table */}
          <div className="card-minimal rounded-2xl p-6 space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Security Competency ➔ Interview Impact</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3.5 font-medium">Foundational Skill</th>
                    <th className="py-2.5 px-3.5 font-medium">SOC Analyst Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-2.5 px-3.5 font-medium">Log Analysis & Filtering</td>
                    <td className="py-2.5 px-3.5">SIEM Ingestion, SPL/KQL Queries, and High-Fidelity Alert Triaging</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 font-medium">API & Web Auditing</td>
                    <td className="py-2.5 px-3.5">Security Testing, Rate-Limiting Validation & Authentication Bypass Remediation</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 font-medium">Network Traffic Inspection</td>
                    <td className="py-2.5 px-3.5">Traffic Interception, Insecure Object References (IDOR) & Header Hardening</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 font-medium">Negative & Anomaly Analysis</td>
                    <td className="py-2.5 px-3.5">Threat Modeling, IOC Discovery & Adversarial Surface Minimization</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: LABS */}
      {activeTab === 'labs' && (
        <div className="space-y-4">
          {LAB_PROJECTS_DATA.map((lab) => {
            const isCompleted = progress.completedLabs.includes(lab.id);

            return (
              <div key={lab.id} className="card-minimal rounded-2xl p-6 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-semibold text-slate-500">
                        {lab.badge}
                      </span>
                      <span className="text-xs text-slate-400">
                        {lab.estimatedHours} Hours • {lab.difficulty}
                      </span>
                    </div>
                    <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">{lab.title}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{lab.overview}</p>
                  </div>

                  <button
                    onClick={() => toggleLabCompleted(lab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isCompleted 
                        ? 'bg-emerald-600 text-white' 
                        : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isCompleted ? 'Completed ✓' : 'Mark Completed'}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0d1117] text-emerald-300 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                  <span className="text-[10px] text-slate-400 uppercase block mb-1">Topology:</span>
                  {lab.architecture}
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-xs">Build Steps:</h3>
                  <div className="space-y-1.5">
                    {lab.stepByStepGuide.map(step => (
                      <div key={step.step} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-0.5 text-xs">
                        <span className="font-semibold text-slate-900 dark:text-white block">
                          Step {step.step}: {step.title}
                        </span>
                        <p className="text-slate-600 dark:text-slate-400 text-[11px]">{step.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                  <strong className="text-slate-900 dark:text-white block">Resume Bullet:</strong>
                  <p>{lab.resumeBullet}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: 50+ QUESTIONS */}
      {activeTab === 'interview' && (
        <div className="space-y-4">
          
          <div className="card-minimal rounded-2xl p-4 space-y-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={interviewSearch}
                onChange={(e) => setInterviewSearch(e.target.value)}
                placeholder="Search 50+ interview questions..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-slate-400"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-xs">
              {INTERVIEW_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedInterviewCategory(cat)}
                  className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedInterviewCategory === cat
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                      : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredQuestions.map((q, idx) => {
              const isExpanded = expandedQuestionId === q.id;

              return (
                <div
                  key={q.id}
                  className="card-minimal rounded-xl overflow-hidden"
                >
                  <div
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                    className="p-4 flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400">
                          {q.category} • Q#{idx + 1}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">{q.question}</h3>
                    </div>

                    <button className="p-1 rounded text-slate-400">
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 space-y-2.5 border-t border-slate-100 dark:border-slate-800 text-xs animate-fadeIn">
                      <div className="flex flex-wrap items-center gap-1 pt-1.5">
                        <span className="text-[10px] text-slate-400">Keywords:</span>
                        {q.keywords.map((kw, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                            {kw}
                          </span>
                        ))}
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                        {q.answer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
