import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  Clock, 
  Layers, 
  Search, 
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { MONTHS_DATA, getFullCurriculum } from '../data/curriculumData';

export default function RoadmapView({ 
  progress, 
  onSelectDay, 
  toggleDayCompletion, 
  toggleBookmark 
}) {
  const allCurriculum = getFullCurriculum();
  
  const [selectedMonth, setSelectedMonth] = useState('all'); // 'all', 1, 2, 3
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'completed', 'incomplete', 'bookmarked'

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

  // Filtering logic
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

  const getCategoryBadge = (cat) => {
    switch (cat) {
      case 'Security Principles': return 'bg-sky-100 text-sky-800 dark:bg-cyan-500/10 dark:text-cyan-400 border-sky-300 dark:border-cyan-500/30';
      case 'Networking': return 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400 border-blue-300 dark:border-blue-500/30';
      case 'Linux/CLI': return 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400 border-amber-300 dark:border-amber-500/30';
      case 'Windows/AD': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-400 border-indigo-300 dark:border-indigo-500/30';
      case 'Threat Intelligence': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30';
      case 'SIEM & Logs': return 'bg-purple-100 text-purple-800 dark:bg-purple-500/10 dark:text-purple-400 border-purple-300 dark:border-purple-500/30';
      case 'Packet Analysis': return 'bg-teal-100 text-teal-800 dark:bg-sky-500/10 dark:text-sky-400 border-teal-300 dark:border-sky-500/30';
      case 'Python Scripting': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-400 border-yellow-300 dark:border-yellow-500/30';
      case 'Web AppSec/OWASP': return 'bg-rose-100 text-rose-800 dark:bg-red-500/10 dark:text-red-400 border-rose-300 dark:border-red-500/30';
      case 'Incident Response': return 'bg-pink-100 text-pink-800 dark:bg-rose-500/10 dark:text-rose-400 border-pink-300 dark:border-rose-500/30';
      case 'Home Labs': return 'bg-cyan-100 text-cyan-800 dark:bg-teal-500/10 dark:text-teal-400 border-cyan-300 dark:border-teal-500/30';
      case 'Interview Prep': return 'bg-violet-100 text-violet-800 dark:bg-violet-500/10 dark:text-violet-400 border-violet-300 dark:border-violet-500/30';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white dark:bg-[#0a1020] border border-slate-200 dark:border-cyan-500/20 p-5 rounded-3xl card-subtle-shadow">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
            <span>90-Day Daily Learning Roadmap</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Structured day-by-day path from beginner fundamentals to entry-level cybersecurity & SOC analyst.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search topics, ports, tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 font-sans"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-3">
        {/* Month Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedMonth('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedMonth === 'all'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
            }`}
          >
            All 3 Months (90 Days)
          </button>

          {MONTHS_DATA.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMonth(m.monthNumber)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedMonth === m.monthNumber
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>Month {m.monthNumber}: {m.title.split(':')[0]}</span>
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat === 'All' ? 'all' : cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                (selectedCategory === 'all' && cat === 'All') || selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-cyan-300 shadow-xs'
                  : 'bg-white dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Filter Toggles */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Status:</span>
            {['all', 'incomplete', 'completed', 'bookmarked'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`capitalize px-2.5 py-0.5 rounded-md text-[11px] font-medium ${
                  filterStatus === st 
                    ? 'text-sky-700 dark:text-cyan-300 font-bold bg-sky-100 dark:bg-cyan-950/60 border border-sky-300 dark:border-cyan-500/30' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Showing {filteredList.length} Chapters
          </span>
        </div>
      </div>

      {/* Grid of Daily Missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredList.map((item) => {
          const isDone = !!progress.completedDays[`day-${item.day}`];
          const isBookmarked = progress.bookmarkedDays.includes(`day-${item.day}`);
          const quizScore = progress.quizScores[`quiz-day-${item.day}`];

          return (
            <div
              key={item.day}
              className={`group relative rounded-2xl border p-5 transition-all flex flex-col justify-between card-hover-shadow ${
                isDone 
                  ? 'bg-sky-50/40 dark:bg-[#09111e]/90 border-sky-300 dark:border-cyan-500/30' 
                  : 'bg-white dark:bg-[#0b101c] border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-cyan-500/40'
              }`}
            >
              <div>
                {/* Top Row */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sky-700 dark:text-cyan-400">
                      Day {item.day}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-semibold">
                      W{item.week} • M{item.month}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(`day-${item.day}`);
                      }}
                      className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                        isBookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark for Review'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDayCompletion(`day-${item.day}`);
                      }}
                      className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                        isDone ? 'text-emerald-600 dark:text-cyan-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                      title={isDone ? 'Mark Incomplete' : 'Mark Completed'}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-cyan-400 fill-emerald-100 dark:fill-cyan-500/20" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Category Pill */}
                <span className={`inline-block text-[10px] px-2 py-0.5 rounded-md border mb-2 font-mono font-semibold ${getCategoryBadge(item.category)}`}>
                  {item.category}
                </span>

                {/* Chapter Title */}
                <h3 
                  onClick={() => onSelectDay(item.day)}
                  className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-2"
                >
                  {item.title}
                </h3>

                {/* Chapter Summary */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Bottom Metadata & Launch Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.estimatedMinutes}m
                  </span>
                  {quizScore && (
                    <span className="px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 font-mono text-[10px] font-bold">
                      Quiz: {quizScore.score}%
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onSelectDay(item.day)}
                  className="text-xs font-bold text-sky-600 dark:text-cyan-400 hover:text-sky-500 dark:hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
