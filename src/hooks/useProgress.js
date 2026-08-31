import { useState, useEffect } from 'react';

const STORAGE_KEY = 'socready_user_progress_v2';
const THEME_KEY = 'socready_theme_preference';

const initialProgress = {
  completedDays: {}, // { 'day-1': { completedAt: '2026-08-31', status: 'completed' } }
  bookmarkedDays: [], // ['day-1', 'day-12']
  quizScores: {}, // { 'quiz-1': { score: 80, passed: true, completedAt: '2026-08-31' } }
  flashcardMastery: {}, // { 'fc-1': true }
  chapterNotes: {}, // { 'day-1': 'My custom note...' }
  streakCount: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  studyMinutesTotal: 45,
  resolvedIncidents: [], // ['alert-101']
  completedLabs: [], // ['lab-wazuh']
  targetStartDate: new Date().toISOString().split('T')[0],
};

export function useProgress() {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme) return savedTheme;
    } catch (e) {}
    return 'light'; // Default to clean light theme as requested!
  });

  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...initialProgress, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    return initialProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Check and update streak
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastActiveDate !== today) {
      const lastDate = new Date(progress.lastActiveDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        setProgress(prev => ({
          ...prev,
          streakCount: prev.streakCount + 1,
          lastActiveDate: today
        }));
      } else if (diffDays > 1) {
        setProgress(prev => ({
          ...prev,
          streakCount: 1,
          lastActiveDate: today
        }));
      }
    }
  }, []);

  const toggleDayCompletion = (dayId) => {
    setProgress(prev => {
      const isDone = !!prev.completedDays[dayId];
      const newCompleted = { ...prev.completedDays };
      if (isDone) {
        delete newCompleted[dayId];
      } else {
        newCompleted[dayId] = {
          completedAt: new Date().toISOString(),
          status: 'completed'
        };
      }
      return { ...prev, completedDays: newCompleted };
    });
  };

  const toggleBookmark = (dayId) => {
    setProgress(prev => {
      const exists = prev.bookmarkedDays.includes(dayId);
      return {
        ...prev,
        bookmarkedDays: exists
          ? prev.bookmarkedDays.filter(id => id !== dayId)
          : [...prev.bookmarkedDays, dayId]
      };
    });
  };

  const saveQuizScore = (quizId, score, passed) => {
    setProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [quizId]: {
          score,
          passed,
          completedAt: new Date().toISOString()
        }
      }
    }));
  };

  const saveChapterNote = (dayId, noteText) => {
    setProgress(prev => ({
      ...prev,
      chapterNotes: {
        ...prev.chapterNotes,
        [dayId]: noteText
      }
    }));
  };

  const toggleFlashcardMastery = (cardId) => {
    setProgress(prev => {
      const isMastered = !!prev.flashcardMastery[cardId];
      return {
        ...prev,
        flashcardMastery: {
          ...prev.flashcardMastery,
          [cardId]: !isMastered
        }
      };
    });
  };

  const addStudyTime = (minutes) => {
    setProgress(prev => ({
      ...prev,
      studyMinutesTotal: prev.studyMinutesTotal + minutes
    }));
  };

  const markIncidentResolved = (incidentId) => {
    setProgress(prev => ({
      ...prev,
      resolvedIncidents: prev.resolvedIncidents.includes(incidentId)
        ? prev.resolvedIncidents
        : [...prev.resolvedIncidents, incidentId]
    }));
  };

  const toggleLabCompleted = (labId) => {
    setProgress(prev => ({
      ...prev,
      completedLabs: prev.completedLabs.includes(labId)
        ? prev.completedLabs.filter(id => id !== labId)
        : [...prev.completedLabs, labId]
    }));
  };

  const resetAllProgress = () => {
    if (window.confirm("Are you sure you want to reset all your learning progress? This cannot be undone.")) {
      setProgress(initialProgress);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const exportProgressJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `socready-progress-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importProgressJSON = (jsonData) => {
    try {
      const parsed = JSON.parse(jsonData);
      setProgress(parsed);
      return true;
    } catch (e) {
      alert("Invalid JSON backup file.");
      return false;
    }
  };

  // Calculated metrics
  const totalDays = 90;
  const completedCount = Object.keys(progress.completedDays).length;
  const overallPercentage = Math.round((completedCount / totalDays) * 100);

  return {
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
    overallPercentage,
  };
}
