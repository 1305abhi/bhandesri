import React from 'react';
import { 
  Flame, 
  ArrowRight,
  Laptop,
  Terminal,
  Activity,
  Crosshair,
  FileCode,
  Shield
} from 'lucide-react';
import { MONTHS_DATA, getFullCurriculum } from '../data/curriculumData';

export default function Dashboard({ 
  progress, 
  onSelectDay, 
  setActiveTab, 
  completedCount, 
  overallPercentage 
}) {
  const allCurriculum = getFullCurriculum();
  
  // Find first incomplete day
  const currentDayItem = allCurriculum.find(item => !progress.completedDays[`day-${item.day}`]) || allCurriculum[0];

  const domains = [
    { name: 'Networking & Protocols', cat: 'Networking' },
    { name: 'Linux CLI & Administration', cat: 'Linux/CLI' },
    { name: 'Windows & Active Directory', cat: 'Windows/AD' },
    { name: 'Threat Intel & MITRE ATT&CK', cat: 'Threat Intelligence' },
    { name: 'SIEM & Log Correlation (SPL)', cat: 'SIEM & Logs' },
    { name: 'Web AppSec & OWASP Top 10', cat: 'Web AppSec/OWASP' },
    { name: 'Incident Response & Triage', cat: 'Incident Response' },
    { name: 'Python/Bash Automation', cat: 'Python Scripting' }
  ];

  const domainScores = domains.map(d => {
    const matchingDays = allCurriculum.filter(item => item.category === d.cat);
    const completed = matchingDays.filter(item => progress.completedDays[`day-${item.day}`]).length;
    const pct = matchingDays.length > 0 ? Math.round((completed / matchingDays.length) * 100) : 0;
    return { ...d, completed, totalCount: matchingDays.length, pct };
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Minimal Top Hero Box */}
      <div className="card-minimal rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>90-Day Cyber Defense Curriculum</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Master Cyber Defense & SOC Operations
            </h1>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Step-by-step path from networking and OS internals to enterprise SIEM hunting, packet forensics, alert triage, and incident response.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={() => onSelectDay(currentDayItem.day)}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium flex items-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                <span>Continue Day {currentDayItem.day}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('roadmap')}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
              >
                View Full Roadmap
              </button>
            </div>
          </div>

          {/* Minimal Metrics Panel */}
          <div className="w-full lg:w-64 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Readiness</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{overallPercentage}%</span>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-slate-900 dark:bg-white h-full rounded-full transition-all duration-300"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <span className="text-[11px] text-slate-500 block">Completed</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{completedCount} / 90</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Streak</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                  {progress.streakCount}d
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3-Month Progression */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Curriculum Roadmap</h2>
          <span className="text-xs text-slate-500">12 Weeks • 90 Daily Missions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {MONTHS_DATA.map((month) => {
            const monthDays = allCurriculum.filter(d => d.month === month.monthNumber);
            const doneInMonth = monthDays.filter(d => progress.completedDays[`day-${d.day}`]).length;
            const monthPct = Math.round((doneInMonth / monthDays.length) * 100);

            return (
              <div 
                key={month.id}
                onClick={() => setActiveTab('roadmap')}
                className="card-minimal card-minimal-hover rounded-xl p-4 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-medium text-slate-500">Month {month.monthNumber}</span>
                  <span className="text-xs font-mono text-slate-700 dark:text-slate-300">{doneInMonth}/{monthDays.length}</span>
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                  {month.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {month.subtitle}
                </p>

                <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-slate-900 dark:bg-white h-full rounded-full transition-all duration-300" 
                    style={{ width: `${monthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hands-On Practical Tool Guides */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Hands-On Practical Guides</h2>
          <button 
            onClick={() => setActiveTab('guides')}
            className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          
          <div 
            onClick={() => setActiveTab('guides')}
            className="card-minimal card-minimal-hover rounded-xl p-4 cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-slate-700 dark:text-slate-300 mb-2" />
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white">Linux & WSL Log Forensics</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Filter auth.log, count failed SSH attempts & audit sudo.</p>
          </div>

          <div 
            onClick={() => setActiveTab('guides')}
            className="card-minimal card-minimal-hover rounded-xl p-4 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-slate-700 dark:text-slate-300 mb-2" />
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white">Wireshark Packet Analysis</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Filter HTTP POSTs, analyze SYN scans & follow TCP streams.</p>
          </div>

          <div 
            onClick={() => setActiveTab('guides')}
            className="card-minimal card-minimal-hover rounded-xl p-4 cursor-pointer"
          >
            <Shield className="w-4 h-4 text-slate-700 dark:text-slate-300 mb-2" />
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white">Splunk SIEM SPL Hunting</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Query Event IDs 4625, 1102, and Sysmon encoded PowerShell.</p>
          </div>

          <div 
            onClick={() => setActiveTab('guides')}
            className="card-minimal card-minimal-hover rounded-xl p-4 cursor-pointer"
          >
            <Crosshair className="w-4 h-4 text-slate-700 dark:text-slate-300 mb-2" />
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white">Burp Suite & OWASP Lab</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Test IDOR parameters & SQL injection auth bypass.</p>
          </div>

          <div 
            onClick={() => setActiveTab('guides')}
            className="card-minimal card-minimal-hover rounded-xl p-4 cursor-pointer"
          >
            <FileCode className="w-4 h-4 text-slate-700 dark:text-slate-300 mb-2" />
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white">Python Security Automation</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Compute SHA-256 hashes & extract IP indicators with regex.</p>
          </div>

          <div 
            onClick={() => setActiveTab('guides')}
            className="card-minimal card-minimal-hover rounded-xl p-4 cursor-pointer"
          >
            <Laptop className="w-4 h-4 text-slate-700 dark:text-slate-300 mb-2" />
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white">Windows Sysmon Telemetry</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Install Sysmon and inspect Event ID 1 process creation.</p>
          </div>

        </div>
      </div>

      {/* Domain Mastery Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Competency Domains</h2>
          <span className="text-xs text-slate-500">8 Core Areas</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {domainScores.map((domain, i) => (
            <div key={i} className="card-minimal rounded-xl p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{domain.name}</span>
                <span className="text-xs font-mono font-semibold text-slate-900 dark:text-white">{domain.pct}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-slate-900 dark:bg-white transition-all duration-300"
                  style={{ width: `${domain.pct}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {domain.completed} / {domain.totalCount} completed
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Career Hub Link Card */}
      <div className="card-minimal rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Career & Technical Interview Preparation</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            50+ technical interview questions, home lab build guides (Wazuh & Splunk), and resume bullet points.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('career')}
          className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors whitespace-nowrap"
        >
          Open Career Hub
        </button>
      </div>

    </div>
  );
}
