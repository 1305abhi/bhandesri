import React from 'react';
import { 
  Shield, 
  Terminal, 
  Activity, 
  Crosshair, 
  Layers, 
  Briefcase, 
  BookOpen, 
  CheckCircle2, 
  Flame, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  ArrowRight,
  Bookmark,
  Award,
  AlertTriangle,
  FileCode,
  Zap
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
  
  // Find current day to learn (first incomplete day)
  const currentDayItem = allCurriculum.find(item => !progress.completedDays[`day-${item.day}`]) || allCurriculum[0];

  // Calculate domain readiness scores
  const domains = [
    { name: 'Networking & Protocols', total: 14, cat: 'Networking', color: 'from-blue-500 to-sky-400', barBg: 'bg-sky-500' },
    { name: 'Linux CLI & Administration', total: 10, cat: 'Linux/CLI', color: 'from-amber-500 to-orange-400', barBg: 'bg-amber-500' },
    { name: 'Windows & Active Directory', total: 10, cat: 'Windows/AD', color: 'from-indigo-500 to-blue-500', barBg: 'bg-indigo-500' },
    { name: 'Threat Intel & MITRE ATT&CK', total: 12, cat: 'Threat Intelligence', color: 'from-emerald-500 to-teal-400', barBg: 'bg-emerald-500' },
    { name: 'SIEM & Log Correlation (SPL/KQL)', total: 14, cat: 'SIEM & Logs', color: 'from-purple-500 to-pink-500', barBg: 'bg-purple-500' },
    { name: 'Web AppSec & OWASP Top 10', total: 12, cat: 'Web AppSec/OWASP', color: 'from-rose-500 to-red-500', barBg: 'bg-rose-500' },
    { name: 'Incident Response & Triage', total: 12, cat: 'Incident Response', color: 'from-sky-500 to-blue-600', barBg: 'bg-blue-600' },
    { name: 'Python/Bash Automation', total: 6, cat: 'Python Scripting', color: 'from-amber-400 to-yellow-500', barBg: 'bg-amber-500' }
  ];

  const domainScores = domains.map(d => {
    const matchingDays = allCurriculum.filter(item => item.category === d.cat);
    const completed = matchingDays.filter(item => progress.completedDays[`day-${item.day}`]).length;
    const pct = matchingDays.length > 0 ? Math.round((completed / matchingDays.length) * 100) : 0;
    return { ...d, completed, totalCount: matchingDays.length, pct };
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-sky-50/50 to-blue-50/40 dark:from-[#0d1527] dark:via-[#0e1b33] dark:to-[#14122e] border border-slate-200 dark:border-cyan-500/30 p-6 sm:p-8 card-subtle-shadow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/30 dark:bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-cyan-500/10 border border-sky-300 dark:border-cyan-500/30 text-sky-800 dark:text-cyan-300 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
              <span>QA Tester → Junior SOC Analyst Roadmap</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Transform Your QA Background into <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-teal-300 dark:to-blue-400">Cyber Defense Mastery</span>
            </h1>
            
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              You already know how systems break, how APIs communicate, and how to spot edge cases. 
              Over the next 90 days, we connect your testing mindset directly to log hunting, packet inspection, SIEM alert triage, and enterprise threat detection.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectDay(currentDayItem.day)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02]"
              >
                <span>Continue Day {currentDayItem.day}: {currentDayItem.title.slice(0, 28)}...</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('roadmap')}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all card-subtle-shadow"
              >
                <Layers className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                <span>View 12-Week Roadmap</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Card */}
          <div className="w-full lg:w-72 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-cyan-500/30 rounded-2xl p-4 shadow-lg backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Job Readiness Score</span>
              <span className="text-sm font-extrabold text-sky-600 dark:text-cyan-400 font-mono">{overallPercentage}%</span>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
              <div 
                className="bg-gradient-to-r from-sky-500 to-blue-600 dark:from-cyan-500 dark:to-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                <span className="block text-slate-500 text-[10px] uppercase font-mono font-semibold">Completed</span>
                <span className="text-slate-900 dark:text-white font-bold font-mono text-sm">{completedCount} / 90</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                <span className="block text-slate-500 text-[10px] uppercase font-mono font-semibold">Streak</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold font-mono text-sm flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {progress.streakCount} Days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Month High-Level Progression Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
            <span>The 3-Month Transition Blueprint</span>
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">12 Weeks • 90 Daily Missions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MONTHS_DATA.map((month) => {
            const monthDays = allCurriculum.filter(d => d.month === month.monthNumber);
            const doneInMonth = monthDays.filter(d => progress.completedDays[`day-${d.day}`]).length;
            const monthPct = Math.round((doneInMonth / monthDays.length) * 100);

            return (
              <div 
                key={month.id}
                onClick={() => setActiveTab('roadmap')}
                className="group relative bg-white dark:bg-[#0c1222] hover:bg-slate-50 dark:hover:bg-[#10182f] border border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-cyan-500/40 rounded-2xl p-5 transition-all cursor-pointer card-hover-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-cyan-500/10 border border-sky-300 dark:border-cyan-500/30 flex items-center justify-center text-sky-700 dark:text-cyan-300 font-mono font-bold text-sm">
                    M{month.monthNumber}
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">{doneInMonth} / {monthDays.length} ({monthPct}%)</span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors">
                  {month.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {month.subtitle}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                  {month.domains.map((dom, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                      {dom}
                    </span>
                  ))}
                </div>

                <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-sky-500 dark:bg-cyan-400 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${monthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Hands-On Tools Launchpad */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            <span>Defensive Simulators & Interactive Labs</span>
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">Practice enterprise SOC tools in browser</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          <div 
            onClick={() => setActiveTab('siem')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-cyan-400/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer group card-subtle-shadow"
          >
            <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-cyan-500/10 text-sky-600 dark:text-cyan-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Terminal className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-300">SIEM Log Hunter</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Query logs, filter Event IDs & detect threats.</p>
          </div>

          <div 
            onClick={() => setActiveTab('wireshark')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-400/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer group card-subtle-shadow"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Activity className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300">Packet Inspector</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Inspect PCAPs, TCP streams & DNS tunnels.</p>
          </div>

          <div 
            onClick={() => setActiveTab('owasp')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-rose-400 dark:hover:border-red-400/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer group card-subtle-shadow"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-red-500/10 text-rose-600 dark:text-red-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Crosshair className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-red-300">OWASP Web Lab</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Test SQLi, XSS, IDOR & Security Headers.</p>
          </div>

          <div 
            onClick={() => setActiveTab('sandbox')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-400/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer group card-subtle-shadow"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <FileCode className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300">Script Sandbox</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Run Python log parsers, hashes & scanners.</p>
          </div>

          <div 
            onClick={() => setActiveTab('soc-triage')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-400/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer group card-subtle-shadow"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Shield className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300">SOC Triage Queue</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Investigate enterprise alerts & IOC tickets.</p>
          </div>

        </div>
      </div>

      {/* Domain Readiness Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
            <span>Cyber Competency Domain Mastery</span>
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">8 Core Competencies for Job Readiness</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {domainScores.map((domain, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#0c111e] border border-slate-200 dark:border-slate-800 space-y-2 card-subtle-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-300">{domain.name}</span>
                <span className="text-xs font-extrabold font-mono text-sky-600 dark:text-cyan-400">{domain.pct}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800/80 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${domain.color} transition-all duration-500`}
                  style={{ width: `${domain.pct}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-500 font-mono text-right">
                {domain.completed} of {domain.totalCount} completed
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Transition & Interview Quick Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-50 via-indigo-50 to-sky-50 dark:from-purple-950/40 dark:via-slate-900 dark:to-slate-900 border border-purple-200 dark:border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 card-subtle-shadow">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-[11px] font-mono font-bold">
            <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Interview & Resume Ready</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">How to Market Your QA Experience to Cyber Recruiters</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            Access pre-written QA-to-SOC resume bullet points, home lab setup blueprints (Wazuh & Splunk BOTS), and 50+ technical interview questions with model answers.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('career')}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 whitespace-nowrap shadow-md shadow-purple-600/20 transition-all hover:scale-105 shrink-0"
        >
          <Briefcase className="w-4 h-4" />
          <span>Open Career Transition Hub</span>
        </button>
      </div>

    </div>
  );
}
