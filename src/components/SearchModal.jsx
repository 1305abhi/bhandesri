import React, { useState } from 'react';
import { Search, X, Layers, ArrowRight } from 'lucide-react';
import { getFullCurriculum } from '../data/curriculumData';

export default function SearchModal({ isOpen, onClose, onSelectDay }) {
  const [query, setQuery] = useState('');
  const allCurriculum = getFullCurriculum();

  if (!isOpen) return null;

  const filtered = allCurriculum.filter(item => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      `day ${item.day}`.includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="bg-white dark:bg-[#0b1122] border border-slate-200 dark:border-cyan-500/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-3">
        
        <div className="relative border-b border-slate-200 dark:border-slate-800 p-4">
          <Search className="w-5 h-5 text-sky-600 dark:text-cyan-400 absolute left-5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Quick jump: Search port 445, Wireshark, SQLi, Event ID 4625, Day 12..."
            className="w-full pl-10 pr-10 py-2 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-slate-900 text-xs font-mono"
          >
            ESC
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-3 space-y-2">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">
              Type keywords above to search all 90 chapters, protocols, and investigation tools.
            </div>
          ) : filtered.length > 0 ? (
            filtered.map(item => (
              <div
                key={item.day}
                onClick={() => {
                  onSelectDay(item.day);
                  onClose();
                }}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 hover:bg-sky-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800/80 hover:border-sky-400 transition-all cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-sky-700 dark:text-cyan-400">Day {item.day}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-mono border border-slate-200 dark:border-slate-800 font-medium">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">
              No curriculum chapters found for "{query}".
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
