import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2
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
      
      {/* Header */}
      <div className="card-minimal rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span>SOC Alert Triage Queue</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Investigate incoming security tickets, correlate IOCs, and classify verdicts.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500">
          Resolved: <span className="font-semibold text-slate-900 dark:text-white">{progress.resolvedIncidents.length}</span> / {SOC_INCIDENTS_DATA.length}
        </div>
      </div>

      {/* Incident Queue Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {SOC_INCIDENTS_DATA.map((inc, idx) => {
          const resolved = progress.resolvedIncidents.includes(inc.id);
          const isSelected = selectedIncidentIdx === idx;

          return (
            <button
              key={inc.id}
              onClick={() => handleSelectIncident(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                  : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
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

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        <div className="lg:col-span-2 space-y-3">
          
          <div className="card-minimal rounded-2xl p-5 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="font-mono font-semibold text-slate-900 dark:text-white">{incident.alertId}</span>
              <span className="text-slate-500 font-medium">Severity: {incident.severity}</span>
            </div>

            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{incident.title}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">TARGET & HOST</span>
                <span className="font-semibold text-slate-900 dark:text-white">{incident.affectedHost}</span>
                <span className="text-slate-500 block text-[11px]">User: {incident.targetUser}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">ORIGIN</span>
                <span className="font-semibold text-slate-900 dark:text-white">{incident.sourceIp}</span>
                <span className="text-slate-500 block text-[11px]">{incident.timestamp}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">MITRE ATT&CK: </strong>
              {incident.mitreTactic} ➔ {incident.mitreTechnique}
            </div>
          </div>

          {/* Raw Log */}
          <div className="card-minimal rounded-2xl p-4 space-y-2">
            <span className="text-xs font-semibold text-slate-900 dark:text-white block">Raw Log Evidence:</span>
            <div className="p-3 rounded-xl bg-[#0d1117] space-y-1 overflow-x-auto text-[11px] text-emerald-400 font-mono">
              {incident.rawLogs.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          </div>

          {/* Threat Intel */}
          <div className="card-minimal rounded-2xl p-4 space-y-2">
            <span className="text-xs font-semibold text-slate-900 dark:text-white block">Threat Intel Enrichment:</span>
            <div className="space-y-1.5">
              {Object.entries(incident.threatIntel).map(([k, v]) => (
                <div key={k} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                  <span className="text-[10px] text-slate-400 font-mono block uppercase">{k}</span>
                  <span className="text-slate-800 dark:text-slate-200">{v}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Triage Worksheet */}
        <div className="space-y-3">
          
          <div className="card-minimal rounded-2xl p-5 space-y-3 text-xs">
            <h3 className="font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              Analyst Triage Worksheet
            </h3>

            <div className="space-y-1.5">
              <span className="text-slate-500 font-medium block">Investigation Checklist:</span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                {incident.investigationSteps.map((st, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-slate-400">•</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verdict */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="font-medium text-slate-900 dark:text-white block">Determine Verdict:</label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setUserVerdict('True Positive')}
                  className={`p-2.5 rounded-lg border text-xs font-medium transition-colors ${
                    userVerdict === 'True Positive'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                  }`}
                >
                  True Positive
                </button>

                <button
                  onClick={() => setUserVerdict('False Positive')}
                  className={`p-2.5 rounded-lg border text-xs font-medium transition-colors ${
                    userVerdict === 'False Positive'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                  }`}
                >
                  False Positive
                </button>
              </div>
            </div>

            {/* Analyst Comment */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-500 block">Notes & Remediation Action:</label>
              <textarea
                value={analystNotes}
                onChange={(e) => setAnalystNotes(e.target.value)}
                placeholder="Document observed IOCs and actions taken..."
                rows={3}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none resize-none"
              />
            </div>

            <button
              disabled={!userVerdict}
              onClick={handleSubmitTriage}
              className="w-full py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-xs disabled:opacity-30"
            >
              Submit Triage Report
            </button>

            {submitted && (
              <div className={`p-3 rounded-lg border text-xs ${
                isVerdictCorrect 
                  ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/40 text-emerald-800 dark:text-emerald-300' 
                  : 'border-amber-200 dark:border-amber-900 bg-amber-50/40 text-amber-800 dark:text-amber-300'
              }`}>
                <span className="font-semibold block">
                  {isVerdictCorrect ? 'Verdict Correct ✓' : 'Incorrect Assessment'}
                </span>
                <p className="text-[11px] mt-0.5">
                  {isVerdictCorrect
                    ? `Great analysis. This was indeed a ${incident.suggestedVerdict}.`
                    : `This alert was classified as a ${incident.suggestedVerdict}. Review the IOCs and context.`}
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
