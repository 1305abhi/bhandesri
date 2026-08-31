import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Bookmark, 
  Clock, 
  BookOpen, 
  Terminal, 
  Sparkles, 
  Copy, 
  Check, 
  HelpCircle, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Lightbulb, 
  Award 
} from 'lucide-react';
import { QUIZZES_DATA } from '../data/quizData';
import MarkdownRenderer from './MarkdownRenderer';

export default function ChapterReader({ 
  dayItem, 
  progress, 
  onBackToRoadmap, 
  onNavigateDay, 
  toggleDayCompletion, 
  toggleBookmark,
  saveChapterNote,
  onOpenQuiz
}) {
  const [activeTab, setActiveTab] = useState('theory'); // 'theory', 'qa-bridge', 'code', 'cheatsheet', 'notes'
  const [copied, setCopied] = useState(false);
  const [noteText, setNoteText] = useState(progress.chapterNotes[`day-${dayItem.day}`] || '');
  const [noteSaved, setNoteSaved] = useState(false);

  const isDone = !!progress.completedDays[`day-${dayItem.day}`];
  const isBookmarked = progress.bookmarkedDays.includes(`day-${dayItem.day}`);
  const hasQuiz = !!QUIZZES_DATA[dayItem.quizId];
  const quizResult = progress.quizScores[dayItem.quizId];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNote = () => {
    saveChapterNote(`day-${dayItem.day}`, noteText);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
      
      {/* Top Header & Navigation Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0a1020] border border-slate-200 dark:border-cyan-500/20 p-4 rounded-2xl card-subtle-shadow">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToRoadmap}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-400 text-slate-700 dark:text-slate-300 transition-all"
            title="Back to Roadmap"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-700 dark:text-cyan-400 font-bold">
              <span>Month {dayItem.month}</span>
              <span>•</span>
              <span>Week {dayItem.week}</span>
              <span>•</span>
              <span className="text-slate-900 dark:text-white">Day {dayItem.day} of 90</span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans font-medium">{dayItem.category}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={() => toggleBookmark(`day-${dayItem.day}`)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isBookmarked 
                ? 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-500/10 dark:border-amber-500/40 dark:text-amber-400'
                : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button
            onClick={() => toggleDayCompletion(`day-${dayItem.day}`)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isDone
                ? 'bg-emerald-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-sky-500'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isDone ? 'Mastered ✓' : 'Mark Done'}</span>
          </button>

          {hasQuiz && (
            <button
              onClick={() => onOpenQuiz(dayItem.quizId)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{quizResult ? `Quiz: ${quizResult.score}%` : 'Take Quiz'}</span>
            </button>
          )}

        </div>
      </div>

      {/* Main Chapter Title Banner */}
      <div className="bg-white dark:bg-[#0b1224] border border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-3 card-subtle-shadow">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-sky-100 dark:bg-cyan-500/10 border border-sky-300 dark:border-cyan-500/30 text-sky-800 dark:text-cyan-300 text-xs font-mono font-bold">
            MISSION DAY #{dayItem.day}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs flex items-center gap-1 font-mono font-medium">
            <Clock className="w-3 h-3" />
            {dayItem.estimatedMinutes} Mins Study
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-mono font-medium">
            Level: {dayItem.difficulty}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {dayItem.title}
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          {dayItem.summary}
        </p>
      </div>

      {/* Content Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('theory')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'theory'
              ? 'bg-sky-500 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Core Theory & Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab('qa-bridge')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'qa-bridge'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>QA-to-SOC Transition Bridge</span>
        </button>

        {dayItem.codeSnippet && (
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'code'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Practical Commands & Scripts</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('cheatsheet')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'cheatsheet'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Cheat Sheet & Exercise</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'notes'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>My Notes {noteText ? '•' : ''}</span>
        </button>
      </div>

      {/* Tab 1: Core Theory Rendered via MarkdownRenderer */}
      {activeTab === 'theory' && (
        <div className="bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 card-subtle-shadow">
          <MarkdownRenderer content={dayItem.theory} />
        </div>
      )}

      {/* Tab 2: QA Transition Bridge */}
      {activeTab === 'qa-bridge' && (
        <div className="bg-white dark:bg-[#0c1024] border border-purple-200 dark:border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 card-subtle-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-500/20 border border-purple-300 dark:border-purple-500/40 flex items-center justify-center text-purple-700 dark:text-purple-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">How Your QA Background Connects Here</h2>
              <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">Translating testing experience into defensive cyber superpowers</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/20 text-slate-800 dark:text-slate-200 text-sm leading-relaxed space-y-3">
            <p className="font-semibold text-purple-900 dark:text-purple-200">{dayItem.qaBridge}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              <strong>Recruiter Strategy Tip:</strong> When interviewers ask about your transition, cite this specific parallel. 
              Explain that experienced QA engineers don\'t just verify "happy paths"—they design adversarial negative test cases to find unhandled exceptions, which is identical to how SOC threat hunters hypothesize adversary intrusion paths.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Practical Commands & Code */}
      {activeTab === 'code' && dayItem.codeSnippet && (
        <div className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 card-subtle-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">{dayItem.codeSnippet.title}</h3>
            </div>
            <button
              onClick={() => handleCopyCode(dayItem.codeSnippet.code)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 text-xs flex items-center gap-1.5 transition-all font-mono"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="relative rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 p-4 overflow-x-auto font-mono text-xs text-emerald-300 leading-relaxed">
            <pre>{dayItem.codeSnippet.code}</pre>
          </div>
        </div>
      )}

      {/* Tab 4: Cheat Sheet & Practical Mission */}
      {activeTab === 'cheatsheet' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 card-subtle-shadow">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Key Takeaways & Interview Cheat Sheet</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dayItem.cheatSheet.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="font-bold text-sky-700 dark:text-cyan-400 font-mono text-xs block">{item.key}</span>
                  <span className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed block">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-sky-50 dark:bg-[#0d1629] border border-sky-200 dark:border-cyan-500/30 rounded-3xl p-6 space-y-3 card-subtle-shadow">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
              <span>Today\'s Hands-On Mission</span>
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {dayItem.practicalExercise}
            </p>
          </div>
        </div>
      )}

      {/* Tab 5: Personal Notes */}
      {activeTab === 'notes' && (
        <div className="bg-white dark:bg-[#0b101c] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 card-subtle-shadow">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Personal Chapter Notes</span>
            </h3>
            {noteSaved && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono font-bold">
                <Check className="w-3.5 h-3.5" />
                Saved to LocalStorage
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Write your thoughts, command notes, or questions to revisit later.
          </p>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Type your notes for Day "
            rows={8}
            className="w-full rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 font-mono leading-relaxed resize-y"
          />

          <div className="flex justify-end">
            <button
              onClick={handleSaveNote}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-sm transition-all"
            >
              Save Notes
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          disabled={dayItem.day <= 1}
          onClick={() => onNavigateDay(dayItem.day - 1)}
          className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5 transition-all card-subtle-shadow"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous (Day {dayItem.day - 1})</span>
        </button>

        <button
          disabled={dayItem.day >= 90}
          onClick={() => onNavigateDay(dayItem.day + 1)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
        >
          <span>Next (Day {dayItem.day + 1})</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
