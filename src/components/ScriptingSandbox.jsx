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
    setOutput('[*] Initializing environment...\n[*] Executing security script...');

    setTimeout(() => {
      setOutput(currentTemplate.expectedOutput);
      setIsRunning(false);
    }, 400);
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
      <div className="card-minimal rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span>Scripting Sandbox</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Test and run Python & Bash defensive automation scripts.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-mono flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleReset}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
        </div>
      </div>

      {/* Template Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {CODE_TEMPLATES_DATA.map((tmpl, idx) => (
          <button
            key={tmpl.id}
            onClick={() => handleSelectTemplate(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              selectedTemplateIdx === idx
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>{tmpl.title.split(':')[0]}: {tmpl.category}</span>
          </button>
        ))}
      </div>

      {/* Editor & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        
        <div className="card-minimal rounded-2xl overflow-hidden flex flex-col">
          <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500 uppercase flex items-center justify-between">
            <span>CODE EDITOR ({currentTemplate.language.toUpperCase()})</span>
            <span>Editable</span>
          </div>

          <textarea
            value={currentCode}
            onChange={(e) => setCurrentCode(e.target.value)}
            rows={16}
            className="w-full p-3.5 bg-transparent font-mono text-xs text-slate-900 dark:text-slate-100 leading-relaxed focus:outline-none resize-none no-scrollbar"
            spellCheck={false}
          />
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1117] flex flex-col font-mono text-xs">
          <div className="px-3.5 py-2 bg-[#161b22] border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>TERMINAL OUTPUT</span>
            </span>
            <span>Exit Code: 0</span>
          </div>

          <div className="p-3.5 flex-1 overflow-y-auto max-h-80 whitespace-pre-wrap leading-relaxed text-slate-200">
            {output ? (
              <span className="text-emerald-300">{output}</span>
            ) : (
              <span className="text-slate-500">
                Click "Run" to execute this script.
              </span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
