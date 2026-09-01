import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  X 
} from 'lucide-react';

export default function PomodoroTimer({ isOpen, onClose, onAddStudyTime }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus');

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'focus') {
        onAddStudyTime(25);
        alert('Focus Session Completed! Take a 5-minute break.');
        setMode('shortBreak');
        setTimeLeft(5 * 60);
      } else {
        alert('Break ended! Ready to focus?');
        setMode('focus');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  if (!isOpen) return null;

  const setTimerMode = (newMode, minutes) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(minutes * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="card-minimal rounded-2xl max-w-xs w-full p-5 text-center space-y-4 shadow-xl relative">
        
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-0.5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Study Timer</h3>
          <p className="text-xs text-slate-400">Pomodoro focus intervals</p>
        </div>

        <div className="flex items-center justify-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setTimerMode('focus', 25)}
            className={`px-3 py-1 rounded-md transition-colors ${
              mode === 'focus' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold' : 'text-slate-500'
            }`}
          >
            Focus (25m)
          </button>
          <button
            onClick={() => setTimerMode('shortBreak', 5)}
            className={`px-3 py-1 rounded-md transition-colors ${
              mode === 'shortBreak' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold' : 'text-slate-500'
            }`}
          >
            Break (5m)
          </button>
        </div>

        <div className="text-4xl font-bold font-mono text-slate-900 dark:text-white tracking-wider py-2">
          {formatTime(timeLeft)}
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium flex items-center gap-1.5"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isRunning ? 'Pause' : 'Start'}</span>
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
            }}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
