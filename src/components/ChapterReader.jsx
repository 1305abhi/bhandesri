import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Bookmark, 
  Clock, 
  BookOpen, 
  Terminal, 
  Copy, 
  Check, 
  HelpCircle, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck,
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
  const [activeTab, setActiveTab] = useState('theory'); // 'theory', 'practical-context', 'code', 'cheatsheet', 'notes'
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
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 card-minimal rounded-xl p-3.5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToRoadmap}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            title="Back to Roadmap"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span>Month {dayItem.month}</span>
              <span>•</span>
              <span>Week {dayItem.week}</span>
              <span>•</span>
              <span className="font-semibold text-slate-900 dark:text-white">Day {dayItem.day} of 90</span>
            </div>
            <span className="text-[11px] text-slate-500">{dayItem.category}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => toggleBookmark(`day-${dayItem.day}`)}
            className={`px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isBookmarked 
                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300' 
                : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            <span>{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={() => toggleDayCompletion(`day-${dayItem.day}`)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isDone
                ? 'bg-emerald-600 text-white'
                : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isDone ? 'Completed' : 'Mark Done'}</span>
          </button>

          {hasQuiz && (
            <button
              onClick={() => onOpenQuiz(dayItem.quizId)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{quizResult ? `Quiz: ${quizResult.score}%` : 'Quiz'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Chapter Title Banner */}
      <div className="card-minimal rounded-2xl p-6 space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
            DAY {dayItem.day}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {dayItem.estimatedMinutes} Mins
          </span>
          <span>•</span>
          <span>{dayItem.difficulty}</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {dayItem.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          {dayItem.summary}
        </p>
      </div>

      {/* Content Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar text-xs">
        <button
          onClick={() => setActiveTab('theory')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'theory'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Core Theory</span>
        </button>

        <button
          onClick={() => setActiveTab('practical-context')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'practical-context'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Defender Context</span>
        </button>

        {dayItem.codeSnippet && (
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Commands & Code</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('cheatsheet')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'cheatsheet'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Cheat Sheet</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'notes'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Notes {noteText ? '•' : ''}</span>
        </button>
      </div>

      {/* Tab 1: Core Theory */}
      {activeTab === 'theory' && (
        <div className="card-minimal rounded-2xl p-6 sm:p-8">
          <MarkdownRenderer content={dayItem.theory} />
        </div>
      )}

      {/* Tab 2: Real-World Defender Context */}
      {activeTab === 'practical-context' && (
        <div className="card-minimal rounded-2xl p-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Real-World Defender Insight</h2>
            <p className="text-xs text-slate-500">Connecting this chapter's concept to enterprise SOC analyst workflows</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 font-sans">
            <p className="font-medium text-slate-900 dark:text-white">{dayItem.qaBridge}</p>
            <p className="text-xs text-slate-500">
              <strong>Interview & Investigation Tip:</strong> When evaluating alerts related to this topic, explain both the detection indicator and how engineers address the root-cause vulnerability.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Commands & Code */}
      {activeTab === 'code' && dayItem.codeSnippet && (
        <div className="card-minimal rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white">{dayItem.codeSnippet.title}</h3>
            <button
              onClick={() => handleCopyCode(dayItem.codeSnippet.code)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-[#0d1117] border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
            <code>{dayItem.codeSnippet.code}</code>
          </pre>
        </div>
      )}

      {/* Tab 4: Cheat Sheet */}
      {activeTab === 'cheatsheet' && (
        <div className="space-y-4">
          <div className="card-minimal rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Key Takeaways</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {dayItem.cheatSheet.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-0.5">
                  <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white block">{item.key}</span>
                  <span className="text-slate-600 dark:text-slate-400 text-xs block">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-minimal rounded-2xl p-5 space-y-1.5">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white">Today's Practice Mission</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {dayItem.practicalExercise}
            </p>
          </div>
        </div>
      )}

      {/* Tab 5: Notes */}
      {activeTab === 'notes' && (
        <div className="card-minimal rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white">Personal Chapter Notes</h3>
            {noteSaved && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                Saved ✓
              </span>
            )}
          </div>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Type your notes for Day "
            rows={8}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-slate-400 font-mono leading-relaxed resize-y"
          />

          <div className="flex justify-end">
            <button
              onClick={handleSaveNote}
              className="px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium"
            >
              Save Notes
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="flex items-center justify-between pt-2">
        <button
          disabled={dayItem.day <= 1}
          onClick={() => onNavigateDay(dayItem.day - 1)}
          className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous (Day {dayItem.day - 1})</span>
        </button>

        <button
          disabled={dayItem.day >= 90}
          onClick={() => onNavigateDay(dayItem.day + 1)}
          className="px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-xs flex items-center gap-1 transition-colors"
        >
          <span>Next (Day {dayItem.day + 1})</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
