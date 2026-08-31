import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import RoadmapView from './components/RoadmapView';
import ChapterReader from './components/ChapterReader';
import SiemSimulator from './components/SiemSimulator';
import WiresharkSimulator from './components/WiresharkSimulator';
import OwaspPlayground from './components/OwaspPlayground';
import ScriptingSandbox from './components/ScriptingSandbox';
import SocAlertTriage from './components/SocAlertTriage';
import FlashcardsDeck from './components/FlashcardsDeck';
import CareerTransitionHub from './components/CareerTransitionHub';
import QuizModal from './components/QuizModal';
import PomodoroTimer from './components/PomodoroTimer';
import SearchModal from './components/SearchModal';
import { useProgress } from './hooks/useProgress';
import { getFullCurriculum } from './data/curriculumData';

export default function App() {
  const {
    theme,
    toggleTheme,
    progress,
    toggleDayCompletion,
    toggleBookmark,
    saveQuizScore,
    saveChapterNote,
    toggleFlashcardMastery,
    addStudyTime,
    markIncidentResolved,
    toggleLabCompleted,
    resetAllProgress,
    exportProgressJSON,
    importProgressJSON,
    completedCount,
    overallPercentage
  } = useProgress();

  const allCurriculum = getFullCurriculum();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDayNumber, setSelectedDayNumber] = useState(1);
  
  const [activeQuizId, setActiveQuizId] = useState(null);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectDay = (dayNum) => {
    setSelectedDayNumber(dayNum);
    setActiveTab('chapter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedDayItem = allCurriculum.find(d => d.day === selectedDayNumber) || allCurriculum[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070a13] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-sky-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streakCount={progress.streakCount}
        overallPercentage={overallPercentage}
        completedCount={completedCount}
        onOpenTimer={() => setIsTimerOpen(true)}
        onExportProgress={exportProgressJSON}
        onImportProgress={importProgressJSON}
        onResetProgress={resetAllProgress}
        onSearchOpen={() => setIsSearchOpen(true)}
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-6">
        
        {activeTab === 'dashboard' && (
          <Dashboard
            progress={progress}
            onSelectDay={handleSelectDay}
            setActiveTab={setActiveTab}
            completedCount={completedCount}
            overallPercentage={overallPercentage}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView
            progress={progress}
            onSelectDay={handleSelectDay}
            toggleDayCompletion={toggleDayCompletion}
            toggleBookmark={toggleBookmark}
          />
        )}

        {activeTab === 'chapter' && (
          <ChapterReader
            dayItem={selectedDayItem}
            progress={progress}
            onBackToRoadmap={() => setActiveTab('roadmap')}
            onNavigateDay={(newDay) => handleSelectDay(newDay)}
            toggleDayCompletion={toggleDayCompletion}
            toggleBookmark={toggleBookmark}
            saveChapterNote={saveChapterNote}
            onOpenQuiz={(quizId) => setActiveQuizId(quizId)}
          />
        )}

        {activeTab === 'siem' && (
          <SiemSimulator />
        )}

        {activeTab === 'wireshark' && (
          <WiresharkSimulator />
        )}

        {activeTab === 'owasp' && (
          <OwaspPlayground />
        )}

        {activeTab === 'sandbox' && (
          <ScriptingSandbox />
        )}

        {activeTab === 'soc-triage' && (
          <SocAlertTriage
            progress={progress}
            markIncidentResolved={markIncidentResolved}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsDeck
            progress={progress}
            toggleFlashcardMastery={toggleFlashcardMastery}
          />
        )}

        {activeTab === 'career' && (
          <CareerTransitionHub
            progress={progress}
            toggleLabCompleted={toggleLabCompleted}
          />
        )}

      </main>

      {/* Quiz Modal */}
      {activeQuizId && (
        <QuizModal
          quizId={activeQuizId}
          onClose={() => setActiveQuizId(null)}
          onSaveScore={(quizId, score, passed) => {
            saveQuizScore(quizId, score, passed);
          }}
        />
      )}

      {/* Pomodoro Focus Timer */}
      <PomodoroTimer
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        onAddStudyTime={addStudyTime}
      />

      {/* Spotlight Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDay={handleSelectDay}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#060810] py-6 px-4 text-center text-xs text-slate-500 font-mono transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <span className="text-slate-700 dark:text-slate-300 font-bold">SOCReady Platform</span>
            <span>•</span>
            <span>QA to Cyber Security Analyst Accelerator</span>
          </div>
          <div>
            <span>90 Days • 12 Weeks • 8 Competency Domains • Light & Dark Mode</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
