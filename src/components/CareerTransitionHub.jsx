import React, { useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  Award, 
  HelpCircle, 
  Terminal, 
  Check, 
  Copy, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Layers,
  ArrowRight,
  Shield,
  Search
} from 'lucide-react';
import { INTERVIEW_QUESTIONS_DATA, INTERVIEW_CATEGORIES } from '../data/interviewQuestionsData';
import { LAB_PROJECTS_DATA } from '../data/labProjectsData';

export default function CareerTransitionHub({ progress, toggleLabCompleted }) {
  const [activeTab, setActiveTab] = useState('resume'); // 'resume', 'labs', 'interview'
  const [selectedInterviewCategory, setSelectedInterviewCategory] = useState('All');
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [interviewSearch, setInterviewSearch] = useState('');
  const [copiedBulletIdx, setCopiedBulletIdx] = useState(null);

  const resumeBullets = [
    {
      title: 'API Security & Authorization Testing',
      bullet: 'Evaluated enterprise API authorization controls using Postman and Burp Suite; discovered critical Broken Object Level Authorization (IDOR) and OTP rate-limiting vulnerabilities, authoring detailed reproduction workflows prior to production rollout.'
    },
    {
      title: 'Home SOC Telemetry & SIEM Engineering',
      bullet: 'Architected a virtualized enterprise security monitoring lab utilizing Wazuh SIEM and Windows Sysmon; authored custom XML correlation rules to detect brute-force logons, Mimikatz credential dumping, and obfuscated PowerShell execution.'
    },
    {
      title: 'Network Traffic & Incident Investigation',
      bullet: 'Investigated enterprise attack captures in Wireshark and Splunk SPL using Boss of the SOC (BOTS); reconstructed multi-stage intrusion timelines, extracted malicious IOCs, and mapped adversary tradecraft to the MITRE ATT&CK matrix.'
    },
    {
      title: 'Defensive Security Scripting & Automation',
      bullet: 'Authored Python security automation scripts utilizing regular expressions to parse authentication logs, calculate cryptographic SHA-256 hashes, and automate threat intelligence enrichment via REST APIs.'
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
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#120e29] border border-slate-200 dark:border-purple-500/30 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 card-subtle-shadow">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>QA-TO-CYBER CAREER & INTERVIEW ACCELERATOR</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Everything you need to land your first SOC Analyst / Junior Cyber Security job: resume bullets, lab portfolio, and 50+ interview Q&As.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'resume', label: '📄 Resume Strategy', icon: FileText },
            { id: 'labs', label: '🧪 Home Lab Projects', icon: Terminal },
            { id: 'interview', label: '🎯 50+ Interview Q&A', icon: HelpCircle }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900'
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
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-[#0b101e] border border-purple-200 dark:border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-4 card-subtle-shadow">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Recommended Resume Professional Summary Formula</span>
            </h2>
            <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-slate-950 border border-purple-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-300 leading-relaxed font-sans font-medium">
              "Cybersecurity Analyst with a strong background in QA testing, Network Defense, SIEM Log Analysis (Splunk & Wazuh), Packet Inspection (Wireshark), and Web Vulnerability Assessment (OWASP Top 10). Proven track record identifying high-severity API authorization flaws (IDOR) and authentication vulnerabilities in production applications. Experienced in architecting virtualized home SOC detection pipelines and investigating incident alert lifecycles."
            </div>
          </div>

          {/* High-Impact Resume Bullets */}
          <div className="bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 card-subtle-shadow">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Tailored Resume Experience Bullets</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Click copy to include these proven bullet points on your resume.</p>
            </div>

            <div className="space-y-3">
              {resumeBullets.map((item, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-purple-400 transition-all space-y-2 card-subtle-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-300">{item.title}</span>
                    <button
                      onClick={() => handleCopyBullet(item.bullet, idx)}
                      className="px-3 py-1 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 hover:border-purple-400 text-slate-700 dark:text-slate-300 text-[11px] font-mono font-bold flex items-center gap-1 transition-all"
                    >
                      {copiedBulletIdx === idx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedBulletIdx === idx ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">{item.bullet}</p>
                </div>
              ))}
            </div>
          </div>

          {/* QA-to-SOC Terminology Translation Table */}
          <div className="bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 card-subtle-shadow">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">QA ➔ Cybersecurity Vocabulary Mapping</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 text-[10px] uppercase">
                  <tr>
                    <th className="py-3 px-4">QA Testing Phrase</th>
                    <th className="py-3 px-4 text-purple-700 dark:text-purple-400">Cybersecurity Resume Translation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-300">
                  <tr>
                    <td className="py-3 px-4">Writing bug reports</td>
                    <td className="py-3 px-4 text-purple-900 dark:text-purple-300 font-bold font-sans">Authoring High-Fidelity Incident & Defect Triage Reports</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Postman API Testing</td>
                    <td className="py-3 px-4 text-purple-900 dark:text-purple-300 font-bold font-sans">API Security Assessment, Rate-Limiting & Auth Bypass Testing</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Burp Suite Proxy Interception</td>
                    <td className="py-3 px-4 text-purple-900 dark:text-purple-300 font-bold font-sans">Web Traffic Interception & Insecure Direct Object Reference (IDOR) Validation</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Edge-case testing</td>
                    <td className="py-3 px-4 text-purple-900 dark:text-purple-300 font-bold font-sans">Threat Modeling, Negative Input Fuzzing & Anomaly Discovery</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: HOME LAB PROJECTS */}
      {activeTab === 'labs' && (
        <div className="space-y-6">
          {LAB_PROJECTS_DATA.map((lab) => {
            const isCompleted = progress.completedLabs.includes(lab.id);

            return (
              <div key={lab.id} className="bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 card-subtle-shadow">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 text-[11px] font-mono font-bold">
                        {lab.badge}
                      </span>
                      <span className="text-xs text-slate-500 font-mono font-semibold">
                        Estimated: {lab.estimatedHours} Hours • {lab.difficulty}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{lab.title}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{lab.overview}</p>
                  </div>

                  <button
                    onClick={() => toggleLabCompleted(lab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                      isCompleted 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-400'
                    }`}
                  >
                    {isCompleted ? 'Lab Completed ✓' : 'Mark Lab Completed'}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 text-cyan-300 font-mono text-xs whitespace-pre-wrap">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Architecture Topology:</span>
                  {lab.architecture}
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider font-mono">Step-by-Step Build Guide:</h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {lab.stepByStepGuide.map(step => (
                      <div key={step.step} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-700 dark:text-purple-300">
                          <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950 border border-purple-300 dark:border-purple-500/40 flex items-center justify-center text-[10px]">
                            {step.step}
                          </span>
                          <span>{step.title}</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 pl-7">{step.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/30 text-xs text-purple-900 dark:text-purple-200 space-y-1 font-sans">
                  <span className="font-bold text-purple-700 dark:text-purple-400 font-mono text-[10px] block">MATCHING RESUME BULLET:</span>
                  <p className="font-medium">{lab.resumeBullet}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: 50+ INTERVIEW QUESTIONS */}
      {activeTab === 'interview' && (
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-[#0b101c] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4 card-subtle-shadow">
            <div className="relative">
              <Search className="w-4 h-4 text-purple-600 dark:text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={interviewSearch}
                onChange={(e) => setInterviewSearch(e.target.value)}
                placeholder="Search 50+ technical and behavioral SOC interview questions..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {INTERVIEW_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedInterviewCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                    selectedInterviewCategory === cat
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-slate-900 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredQuestions.map((q, idx) => {
              const isExpanded = expandedQuestionId === q.id;

              return (
                <div
                  key={q.id}
                  className="bg-white dark:bg-[#0b101c] border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden transition-all card-subtle-shadow"
                >
                  <div
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 border border-purple-300 dark:border-purple-500/30 text-purple-800 dark:text-purple-300">
                          {q.category}
                        </span>
                        <span className="text-slate-400 text-xs font-mono font-semibold">Q#{idx + 1}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">{q.question}</h3>
                    </div>

                    <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 space-y-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-xs leading-relaxed animate-fadeIn">
                      <div className="flex flex-wrap items-center gap-1.5 pt-2">
                        <span className="text-[11px] font-mono text-purple-700 dark:text-purple-400 font-bold">Key Terms:</span>
                        {q.keywords.map((kw, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sky-700 dark:text-cyan-300 font-mono font-semibold">
                            {kw}
                          </span>
                        ))}
                      </div>

                      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed">
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
