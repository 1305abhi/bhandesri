import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  Clock, 
  Layers, 
  Search, 
  ArrowRight
} from 'lucide-react';
import { MONTHS_DATA, getFullCurriculum } from '../data/curriculumData';

export default function RoadmapView({ 
  progress, 
  onSelectDay, 
  toggleDayCompletion, 
  toggleBookmark 
}) {
  const allCurriculum = getFullCurriculum();
  
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const categories = [
    'All',
    'Security Principles',
    'Networking',
    'Linux/CLI',
    'Windows/AD',
    'Threat Intelligence',
    'SIEM & Logs',
    'Packet Analysis',
    'Python Scripting',
    'Web AppSec/OWASP',
    'Incident Response',
    'Home Labs',
    'Interview Prep'
  ];

  const filteredList = allCurriculum.filter(item => {
    if (selectedMonth !== 'all' && item.month !== Number(selectedMonth)) return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

    const isCompleted = !!progress.completedDays[`day-${item.day}`];
    const isBookmarked = progress.bookmarkedDays.includes(`day-${item.day}`);
    
    if (filterStatus === 'completed' && !isCompleted) return false;
    if (filterStatus === 'incomplete' && isCompleted) return false;
    if (filterStatus === 'bookmarked' && !isBookmarked) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      if (!matchTitle && !matchSummary && !matchCategory) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 card-minimal rounded-2xl p-5">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            90-Day Learning Roadmap
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Daily missions from foundational concepts to advanced detection and incident triage.
          </p>
        </div>

        {/* Minimal Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search chapters, ports, tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-slate-400 font-sans"
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="space-y-2.5">
        
        {/* Month Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedMonth('all')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedMonth === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                : 'card-minimal hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            All 90 Days
          </button>

          {MONTHS_DATA.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMonth(m.monthNumber)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedMonth === m.monthNumber
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                  : 'card-minimal hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Month {m.monthNumber}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat === 'All' ? 'all' : cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                (selectedCategory === 'all' && cat === 'All') || selectedCategory === cat
                  ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Filter:</span>
            {['all', 'incomplete', 'completed', 'bookmarked'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`capitalize px-2 py-0.5 rounded text-[11px] font-medium ${
                  filterStatus === st 
                    ? 'text-slate-900 dark:text-white font-semibold underline underline-offset-4' 
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-mono text-slate-400">
            {filteredList.length} Chapters
          </span>
        </div>
      </div>

      {/* Grid of Daily Missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredList.map((item) => {
          const isDone = !!progress.completedDays[`day-${item.day}`];
          const isBookmarked = progress.bookmarkedDays.includes(`day-${item.day}`);
          const quizScore = progress.quizScores[`quiz-day-${item.day}`];

          return (
            <div
              key={item.day}
              className={`card-minimal card-minimal-hover rounded-xl p-4 flex flex-col justify-between ${
                isDone ? 'border-emerald-200 dark:border-emerald-950 bg-emerald-50/20 dark:bg-emerald-950/10' : ''
              }`}
            >
              <div>
                {/* Top Row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white">
                      Day {item.day}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      W{item.week}
                    </span>
                  </div>

                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(`day-${item.day}`);
                      }}
                      className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        isBookmarked ? 'text-amber-500' : 'text-slate-400'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDayCompletion(`day-${item.day}`);
                      }}
                      className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        isDone ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                      }`}
                      title={isDone ? 'Mark Incomplete' : 'Mark Completed'}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Circle className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <span className="inline-block text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium mb-1.5">
                  {item.category}
                </span>

                {/* Chapter Title */}
                <h3 
                  onClick={() => onSelectDay(item.day)}
                  className="font-semibold text-slate-900 dark:text-white text-xs cursor-pointer hover:underline line-clamp-2"
                >
                  {item.title}
                </h3>

                {/* Chapter Summary */}
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Bottom Metadata & Launch Action */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.estimatedMinutes}m
                  </span>
                  {quizScore && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">
                      Quiz: {quizScore.score}%
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onSelectDay(item.day)}
                  className="text-xs font-medium text-slate-900 dark:text-white hover:underline flex items-center gap-1"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
