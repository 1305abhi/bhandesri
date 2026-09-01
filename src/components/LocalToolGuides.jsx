import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Clock, 
  ChevronRight, 
  HelpCircle, 
  CheckCircle2, 
  Laptop,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { LOCAL_TOOL_GUIDES } from '../data/localToolGuidesData';

export default function LocalToolGuides() {
  const [selectedGuideIdx, setSelectedGuideIdx] = useState(0);
  const [copiedKey, setCopiedKey] = useState(null);

  const guide = LOCAL_TOOL_GUIDES[selectedGuideIdx];

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="card-minimal rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              Hands-On Practical Tool Guides
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Step-by-step instructions to execute real cybersecurity investigations directly on your own machine.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500">
          Guide {selectedGuideIdx + 1} of {LOCAL_TOOL_GUIDES.length}
        </div>
      </div>

      {/* Guide Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {LOCAL_TOOL_GUIDES.map((g, idx) => (
          <button
            key={g.id}
            onClick={() => setSelectedGuideIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              selectedGuideIdx === idx
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>{g.title}</span>
          </button>
        ))}
      </div>

      {/* Main Guide Content */}
      <div className="space-y-4">
        
        {/* Guide Overview Banner */}
        <div className="card-minimal rounded-2xl p-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1 text-xs text-slate-500 font-mono">
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white">
                  {guide.category}
                </span>
                <span>•</span>
                <span>{guide.difficulty}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {guide.estimatedTime}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {guide.title}
              </h2>
            </div>

            <div className="text-xs font-mono text-slate-500 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
              Tool: <strong className="text-slate-900 dark:text-white">{guide.tool}</strong>
            </div>
          </div>

          {/* Prerequisites & Setup */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider block font-mono">
              Prerequisites & Local Setup
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {guide.prerequisites}
            </p>
            
            <div className="space-y-1.5 pt-1">
              {guide.setupInstructions.map((inst, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-mono flex items-start gap-2">
                  <span className="text-slate-400 select-none">[{i + 1}]</span>
                  <span>{inst}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step-by-Step Practical Executions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Practical Steps ({guide.steps.length} Steps)
            </h3>
            <span className="text-xs text-slate-400">Run on your local terminal / tool</span>
          </div>

          {guide.steps.map((step) => {
            const copyKey = `step-${step.stepNumber}`;
            const isCopied = copiedKey === copyKey;

            return (
              <div key={step.stepNumber} className="card-minimal rounded-2xl p-6 space-y-4">
                
                {/* Step Header */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold flex items-center justify-center font-mono">
                      {step.stepNumber}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 ml-7">
                    {step.description}
                  </p>
                </div>

                {/* Section 1: Exact Input Command */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-slate-700 dark:text-slate-300 text-[11px] uppercase">
                      📥 Command / Input to Run:
                    </span>
                    <button
                      onClick={() => handleCopy(step.inputCommand, copyKey)}
                      className="px-2.5 py-0.5 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-mono flex items-center gap-1 transition-colors"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <pre className="p-3.5 rounded-xl bg-[#0d1117] text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 whitespace-pre-wrap">
                    <code>{step.inputCommand}</code>
                  </pre>
                </div>

                {/* Section 2: Expected Terminal Output */}
                <div className="space-y-1.5">
                  <span className="font-mono font-semibold text-slate-700 dark:text-slate-300 text-[11px] uppercase block">
                    📤 Expected Output on Your Machine:
                  </span>
                  
                  <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 whitespace-pre-wrap">
                    <code>{step.expectedOutput}</code>
                  </pre>
                </div>

                {/* Section 3: Defender Insight & Analysis */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                    <ShieldAlert className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                    <span>Defender Analysis & Interview Insight:</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                    {step.defenderInsight}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
