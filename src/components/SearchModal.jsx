import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="card-minimal rounded-2xl max-w-xl w-full overflow-hidden shadow-xl">
        
        <div className="relative border-b border-slate-100 dark:border-slate-800 p-3.5">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chapters, ports, tools (e.g. 445, Wireshark, SQLi)..."
            className="w-full pl-8 pr-12 py-1 bg-transparent text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 text-[10px] font-mono"
          >
            ESC
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-xs text-slate-400">
              Type keywords above to search all 90 chapters.
            </div>
          ) : filtered.length > 0 ? (
            filtered.map(item => (
              <div
                key={item.day}
                onClick={() => {
                  onSelectDay(item.day);
                  onClose();
                }}
                className="p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer flex items-center justify-between gap-3 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white">Day {item.day}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      • {item.category}
                    </span>
                  </div>
                  <h4 className="text-xs text-slate-700 dark:text-slate-300">
                    {item.title}
                  </h4>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-xs text-slate-400">
              No chapters found for "{query}".
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
