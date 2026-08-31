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
        alert('🎉 Focus Session Completed! Take a 5-minute break.');
        setMode('shortBreak');
        setTimeLeft(5 * 60);
      } else {
        alert('Break ended! Ready to dive back in?');
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0c1222] border border-amber-300 dark:border-amber-500/40 rounded-3xl max-w-sm w-full p-6 text-center space-y-6 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-400 text-[11px] font-mono font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>POMODORO STUDY TIMER</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-mono">Deep Focus Mode</h3>
        </div>

        <div className="flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-mono">
          <button
            onClick={() => setTimerMode('focus', 25)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              mode === 'focus' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Focus (25m)
          </button>
          <button
            onClick={() => setTimerMode('shortBreak', 5)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              mode === 'shortBreak' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Break (5m)
          </button>
        </div>

        <div className="text-5xl sm:text-6xl font-black text-amber-600 dark:text-amber-400 font-mono tracking-widest py-3">
          {formatTime(timeLeft)}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-2.5 rounded-xl font-mono font-bold text-xs flex items-center gap-2 shadow-sm transition-all ${
              isRunning 
                ? 'bg-rose-600 hover:bg-rose-500 text-white' 
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
            <span>{isRunning ? 'Pause Timer' : 'Start Focus'}</span>
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
            }}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] text-slate-500 font-mono">
          Each 25-minute focus interval builds your study streak & discipline.
        </p>

      </div>
    </div>
  );
}
