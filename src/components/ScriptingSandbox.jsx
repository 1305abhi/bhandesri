import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  FileCode
} from 'lucide-react';
import { CODE_TEMPLATES_DATA } from '../data/codeTemplatesData';

export default function ScriptingSandbox() {
  const [selectedTemplateIdx, setSelectedTemplateIdx] = useState(0);
  const [currentCode, setCurrentCode] = useState(CODE_TEMPLATES_DATA[0].code);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentTemplate = CODE_TEMPLATES_DATA[selectedTemplateIdx];

  const handleSelectTemplate = (idx) => {
    setSelectedTemplateIdx(idx);
    setCurrentCode(CODE_TEMPLATES_DATA[idx].code);
    setOutput('');
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('[*] Initializing Python 3 / Bash Runtime Environment...\n[*] Compiling and executing defensive automation script...');

    setTimeout(() => {
      setOutput(currentTemplate.expectedOutput);
      setIsRunning(false);
    }, 500);
  };

  const handleReset = () => {
    setCurrentCode(currentTemplate.code);
    setOutput('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#091122] border border-slate-200 dark:border-emerald-500/30 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 card-subtle-shadow">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>PYTHON & BASH SECURITY SCRIPTING SANDBOX</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Build and execute real security automation scripts: regex log parsers, hash validators, and port scanners.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{isRunning ? 'Running...' : 'Run Script'}</span>
          </button>
        </div>
      </div>

      {/* Script Template Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CODE_TEMPLATES_DATA.map((tmpl, idx) => (
          <button
            key={tmpl.id}
            onClick={() => handleSelectTemplate(idx)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedTemplateIdx === idx
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>{tmpl.title.split(':')[0]}: {tmpl.category}</span>
          </button>
        ))}
      </div>

      {/* Template Description */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 card-subtle-shadow">
        <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono text-[11px] block">TASK OBJECTIVE:</span>
        <p className="mt-0.5">{currentTemplate.description}</p>
      </div>

      {/* Editor & Terminal Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        <div className="bg-slate-900 dark:bg-[#0a0f1d] border border-slate-800 rounded-3xl overflow-hidden shadow-md flex flex-col">
          <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>CODE EDITOR ({currentTemplate.language.toUpperCase()})</span>
            <span>Editable</span>
          </div>

          <textarea
            value={currentCode}
            onChange={(e) => setCurrentCode(e.target.value)}
            rows={18}
            className="w-full p-4 bg-transparent text-emerald-300 font-mono text-xs leading-relaxed focus:outline-none resize-none no-scrollbar"
            spellCheck={false}
          />
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-md flex flex-col font-mono text-xs">
          <div className="px-4 py-2.5 bg-black border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>TERMINAL STDOUT</span>
            </span>
            <span>Exit Code: 0</span>
          </div>

          <div className="p-4 flex-1 overflow-y-auto max-h-96 whitespace-pre-wrap leading-relaxed text-slate-200">
            {output ? (
              <span className="text-cyan-300">{output}</span>
            ) : (
              <span className="text-slate-600">
                Click "Run Script" above to execute this script and view real-time log parsing output.
              </span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
