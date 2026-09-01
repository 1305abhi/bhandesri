import React, { useState } from 'react';
import { 
  Shield, 
  Flame, 
  Clock, 
  BookOpen, 
  Terminal, 
  Activity, 
  Search, 
  Layers, 
  Crosshair, 
  Briefcase, 
  Download, 
  Upload, 
  RotateCcw,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ 
  theme,
  toggleTheme,
  activeTab, 
  setActiveTab, 
  streakCount, 
  overallPercentage, 
  completedCount, 
  totalDays = 90,
  onOpenTimer,
  onExportProgress,
  onImportProgress,
  onResetProgress,
  onSearchOpen
}) {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'roadmap', label: '90-Day Roadmap', icon: Layers },
    { id: 'siem', label: 'SIEM Hunter', icon: Terminal },
    { id: 'wireshark', label: 'Packet Inspector', icon: Activity },
    { id: 'owasp', label: 'OWASP Lab', icon: Crosshair },
    { id: 'sandbox', label: 'Python/Bash Sandbox', icon: Terminal },
    { id: 'soc-triage', label: 'SOC Triage Queue', icon: Shield },
    { id: 'flashcards', label: 'Flashcards', icon: BookOpen },
    { id: 'career', label: 'Career Hub', icon: Briefcase },
  ];

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (text) {
          onImportProgress(text);
          setShowSettingsDropdown(false);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0a0f1d]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 py-2.5 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} 
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-500/20 via-sky-500/40 to-blue-600/30 border border-sky-400/40 flex items-center justify-center group-hover:scale-105 transition-all">
            <Shield className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-wider font-mono">SOC<span className="text-sky-600 dark:text-cyan-400">READY</span></span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-100 dark:bg-cyan-950 border border-sky-300 dark:border-cyan-500/40 text-sky-700 dark:text-cyan-300 font-mono font-bold">ZERO → SOC</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">Beginner to Job-Ready Cybersecurity Course</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-white dark:bg-gradient-to-r dark:from-cyan-500/20 dark:to-blue-600/20 text-sky-600 dark:text-cyan-300 shadow-xs border border-slate-200/80 dark:border-cyan-500/40'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          
          {/* Quick Search */}
          <button
            onClick={onSearchOpen}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-400 text-slate-600 dark:text-slate-300 transition-all flex items-center gap-1.5 text-xs"
            title="Search Curriculum (⌘K)"
          >
            <Search className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            <span className="hidden md:inline text-[10px] text-slate-400 font-mono">⌘K</span>
          </button>

          {/* Pomodoro Focus Timer */}
          <button
            onClick={onOpenTimer}
            className="px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 hover:border-amber-400 text-amber-700 dark:text-amber-400 flex items-center gap-1.5 text-xs font-mono font-semibold transition-all"
            title="Open Focus Timer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Focus</span>
          </button>

          {/* Daily Streak */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-100/80 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-mono font-bold" title="Consecutive Day Study Streak">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{streakCount}d</span>
          </div>

          {/* Job Readiness Meter */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-slate-900/90 border border-sky-200 dark:border-cyan-500/30 text-xs cursor-pointer hover:border-sky-400 transition-all"
            title="Overall Readiness Score"
          >
            <span className="text-slate-600 dark:text-slate-400 font-medium text-[11px]">Readiness:</span>
            <span className="text-sky-700 dark:text-cyan-300 font-bold font-mono">{overallPercentage}%</span>
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-400 text-slate-700 dark:text-slate-300 transition-all"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Settings & Backup Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all"
              title="Backup & Data Options"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {showSettingsDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1">
                <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800">
                  Data & Backup Sync
                </div>
                <button
                  onClick={() => {
                    onExportProgress();
                    setShowSettingsDropdown(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                  Backup Progress (JSON)
                </button>

                <label className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-emerald-600 dark:text-green-400" />
                  <span>Restore from Backup</span>
                  <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                </label>

                <button
                  onClick={() => {
                    onResetProgress();
                    setShowSettingsDropdown(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/20 text-rose-600 dark:text-red-400 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800/80"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-600 dark:text-red-400" />
                  Reset All Progress
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-2 animate-fadeIn pb-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  isActive 
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
