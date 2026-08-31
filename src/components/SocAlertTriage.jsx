import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Terminal, 
  Crosshair, 
  Layers, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { SOC_INCIDENTS_DATA } from '../data/socIncidentsData';

export default function SocAlertTriage({ progress, markIncidentResolved }) {
  const [selectedIncidentIdx, setSelectedIncidentIdx] = useState(0);
  const [userVerdict, setUserVerdict] = useState('');
  const [analystNotes, setAnalystNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const incident = SOC_INCIDENTS_DATA[selectedIncidentIdx];
  const isResolved = progress.resolvedIncidents.includes(incident.id);

  const handleSelectIncident = (idx) => {
    setSelectedIncidentIdx(idx);
    setUserVerdict('');
    setAnalystNotes('');
    setSubmitted(false);
  };

  const handleSubmitTriage = () => {
    if (!userVerdict) return;
    markIncidentResolved(incident.id);
    setSubmitted(true);
  };

  const isVerdictCorrect = userVerdict === incident.suggestedVerdict;

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#0e0c24] border border-slate-200 dark:border-purple-500/30 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 card-subtle-shadow">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>TIER 1 SOC ANALYST ALERT TRIAGE QUEUE</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Step into the shoes of a Tier 1 SOC Analyst. Investigate alerts, correlate logs with threat intel, and make escalation verdicts.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 font-bold">
          Resolved: <span className="text-purple-600 dark:text-purple-400">{progress.resolvedIncidents.length}</span> / {SOC_INCIDENTS_DATA.length}
        </div>
      </div>

      {/* Incident Queue Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {SOC_INCIDENTS_DATA.map((inc, idx) => {
          const resolved = progress.resolvedIncidents.includes(inc.id);
          const isSelected = selectedIncidentIdx === idx;

          return (
            <button
              key={inc.id}
              onClick={() => handleSelectIncident(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {resolved ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              )}
              <span>{inc.alertId}: {inc.category}</span>
            </button>
          );
        })}
      </div>

      {/* Main Investigation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-white dark:bg-[#0b101c] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 font-mono text-xs card-subtle-shadow">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="font-bold text-purple-600 dark:text-purple-400 text-sm">{incident.alertId}</span>
              <span className={`px-2.5 py-0.5 rounded-md border text-[11px] font-bold ${
                incident.severity === 'Critical' ? 'bg-rose-100 text-rose-800 dark:bg-red-500/20 dark:text-red-400 border-rose-300 dark:border-red-500/40' :
                incident.severity === 'High' ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 border-amber-300 dark:border-amber-500/40' :
                'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400 border-blue-300 dark:border-blue-500/40'
              }`}>
                Severity: {incident.severity}
              </span>
            </div>

            <h2 className="text-base font-bold text-slate-900 dark:text-white font-sans">{incident.title}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold">AFFECTED ASSET & USER</span>
                <span className="text-slate-900 dark:text-slate-200 font-bold">{incident.affectedHost}</span>
                <span className="text-slate-600 dark:text-slate-400 block text-[11px]">User: {incident.targetUser}</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold">SOURCE / DESTINATION</span>
                <span className="text-slate-900 dark:text-slate-200 font-bold">{incident.sourceIp}</span>
                <span className="text-slate-600 dark:text-slate-400 block text-[11px]">{incident.timestamp}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/30 text-purple-900 dark:text-purple-300 space-y-1 font-sans">
              <span className="text-[10px] text-purple-700 dark:text-purple-400 block font-bold font-mono">MITRE ATT&CK MAPPING:</span>
              <p className="font-semibold text-xs">{incident.mitreTactic} ➔ {incident.mitreTechnique}</p>
            </div>
          </div>

          {/* Raw Log Evidence */}
          <div className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-3 font-mono text-xs card-subtle-shadow">
            <span className="font-bold text-sky-700 dark:text-cyan-400 text-xs block uppercase">RAW SIEM LOG EVIDENCE STREAM</span>
            <div className="p-4 rounded-2xl bg-slate-900 space-y-1.5 overflow-x-auto text-[11px] text-emerald-400 leading-relaxed font-mono">
              {incident.rawLogs.map((l, i) => (
                <div key={i} className="hover:bg-slate-800/60 px-1.5 py-0.5 rounded">
                  {l}
                </div>
              ))}
            </div>
          </div>

          {/* Threat Intelligence Enrichment */}
          <div className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-3 font-mono text-xs card-subtle-shadow">
            <span className="font-bold text-amber-600 dark:text-amber-400 text-xs block uppercase">THREAT INTELLIGENCE ENRICHMENT</span>
            <div className="grid grid-cols-1 gap-2.5">
              {Object.entries(incident.threatIntel).map(([k, v]) => (
                <div key={k} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 font-sans">
                  <span className="text-[10px] text-slate-500 font-mono uppercase font-bold block">{k}</span>
                  <span className="text-slate-800 dark:text-slate-200 text-xs mt-0.5 block font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Triage Worksheet */}
        <div className="space-y-4">
          
          <div className="bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-purple-500/30 rounded-3xl p-5 space-y-4 font-mono text-xs card-subtle-shadow">
            <span className="font-bold text-slate-900 dark:text-white text-sm block border-b border-slate-100 dark:border-slate-800 pb-3">
              ANALYST TRIAGE WORKSHEET
            </span>

            <div className="space-y-2">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase block">Standard Triage Checklist:</span>
              <ul className="space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300 font-sans">
                {incident.investigationSteps.map((st, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 font-bold mt-0.5">•</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verdict Selection */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-slate-900 dark:text-white font-bold block font-sans">Determine Triage Verdict:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setUserVerdict('True Positive')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                    userVerdict === 'True Positive'
                      ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  🚨 True Positive (Active Attack)
                </button>

                <button
                  onClick={() => setUserVerdict('False Positive')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                    userVerdict === 'False Positive'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  🛡️ False Positive (Benign Admin)
                </button>
              </div>
            </div>

            {/* Analyst Comment */}
            <div className="space-y-1.5 font-sans">
              <label className="text-slate-500 text-[10px] block uppercase font-bold font-mono">Escalation Handover Notes:</label>
              <textarea
                value={analystNotes}
                onChange={(e) => setAnalystNotes(e.target.value)}
                placeholder="Document observed IOCs, containment actions taken, and escalation rationale..."
                rows={4}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-purple-500 resize-none font-sans"
              />
            </div>

            {/* Submit Button */}
            <button
              disabled={!userVerdict}
              onClick={handleSubmitTriage}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold text-xs shadow-sm transition-all font-mono"
            >
              Submit SOC Triage Report
            </button>

            {/* Submission Result */}
            {submitted && (
              <div className={`p-4 rounded-2xl border animate-fadeIn font-sans ${
                isVerdictCorrect 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-500 dark:text-emerald-200' 
                  : 'bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/40 dark:border-amber-500 dark:text-amber-200'
              }`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  {isVerdictCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Verdict Correct! Incident Logged ✓</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>Incorrect Verdict Assessment</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  {isVerdictCorrect
                    ? `Great investigation! This incident was indeed a ${incident.suggestedVerdict}. Your Tier 1 triage ticket was accepted.`
                    : `This alert was actually a ${incident.suggestedVerdict}. Re-read the logs and threat intelligence context to understand why.`}
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
