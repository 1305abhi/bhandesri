import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Terminal, Shield, Sparkles } from 'lucide-react';

function CodeBlock({ node, inline, className, children, ...props }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!inline && (language || codeString.includes('\n') || codeString.includes('['))) {
    return (
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 text-slate-100 shadow-md">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-sky-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>{language || 'TERMINAL / ARCHITECTURE'}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-[10px]"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <pre className="p-4 text-xs font-mono overflow-x-auto text-emerald-300 leading-relaxed no-scrollbar">
          <code>{codeString}</code>
        </pre>
      </div>
    );
  }

  return (
    <code className="px-1.5 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-sky-800 dark:text-cyan-300 font-mono text-[11px] font-semibold border border-slate-300 dark:border-slate-700">
      {children}
    </code>
  );
}

export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  return (
    <div className="rich-content space-y-4 text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-sans">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-6 mb-3 pt-2 border-b border-slate-200 dark:border-slate-800 pb-2 tracking-tight flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-sky-500 shrink-0" />
              <span>{children}</span>
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-5 mb-2 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-purple-500 shrink-0" />
              <span>{children}</span>
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-4 mb-2 tracking-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-sm font-bold text-sky-700 dark:text-cyan-400 mt-3 mb-1 uppercase font-mono tracking-wider">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-3 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-[15px]">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="space-y-1.5 my-3 pl-2 list-none">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-1.5 my-3 pl-4 list-decimal text-slate-700 dark:text-slate-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300 text-sm sm:text-[15px] leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
              <div className="flex-1">{children}</div>
            </li>
          ),
          blockquote: ({ children }) => (
            <div className="my-4 p-4 rounded-2xl bg-sky-50/80 dark:bg-slate-900/90 border-l-4 border-sky-500 dark:border-cyan-400 text-slate-800 dark:text-slate-200 text-sm italic shadow-xs">
              {children}
            </div>
          ),
          table: ({ children }) => (
            <div className="my-5 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <table className="w-full text-left text-xs font-sans">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-100/90 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 font-mono uppercase text-[10px] tracking-wider">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-[#0c1220] text-slate-700 dark:text-slate-300">
              {children}
            </tbody>
          ),
          th: ({ children }) => (
            <th className="py-3 px-4 font-bold">{children}</th>
          ),
          td: ({ children }) => (
            <td className="py-3 px-4 text-xs leading-relaxed">{children}</td>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-slate-900 dark:text-white">
              {children}
            </strong>
          ),
          hr: () => (
            <hr className="my-6 border-slate-200 dark:border-slate-800" />
          ),
          code: CodeBlock
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
