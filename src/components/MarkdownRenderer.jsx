import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Terminal } from 'lucide-react';

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
      <div className="my-3 rounded-xl overflow-hidden border border-slate-800 bg-[#0d1117] text-slate-100">
        <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#161b22] border-b border-slate-800 text-[11px] font-mono text-slate-400">
          <span className="font-semibold uppercase text-slate-300">{language || 'CODE'}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors text-[10px]"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <pre className="p-3.5 text-xs font-mono overflow-x-auto text-emerald-300 leading-relaxed no-scrollbar">
          <code>{codeString}</code>
        </pre>
      </div>
    );
  }

  return (
    <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-[11px] font-medium border border-slate-200 dark:border-slate-700">
      {children}
    </code>
  );
}

export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  return (
    <div className="rich-content space-y-3.5 text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-sans">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-5 mb-2.5 pt-1 border-b border-slate-100 dark:border-slate-800 pb-2 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-semibold text-slate-900 dark:text-white mt-4 mb-2 tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mt-3.5 mb-1.5 tracking-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-3 mb-1 uppercase tracking-wider font-mono">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-2.5 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="space-y-1 my-2.5 pl-4 list-disc text-slate-700 dark:text-slate-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-1 my-2.5 pl-4 list-decimal text-slate-700 dark:text-slate-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed pl-1">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <div className="my-3 p-3 rounded-lg border-l-2 border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs italic">
              {children}
            </div>
          ),
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs font-sans">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium text-[11px]">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-[#090d16] text-slate-700 dark:text-slate-300">
              {children}
            </tbody>
          ),
          th: ({ children }) => (
            <th className="py-2.5 px-3.5 font-semibold">{children}</th>
          ),
          td: ({ children }) => (
            <td className="py-2.5 px-3.5 text-xs leading-relaxed">{children}</td>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900 dark:text-white">
              {children}
            </strong>
          ),
          hr: () => (
            <hr className="my-4 border-slate-200 dark:border-slate-800" />
          ),
          code: CodeBlock
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
