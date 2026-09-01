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
    { id: 'roadmap', label: 'Roadmap', icon: Layers },
    { id: 'siem', label: 'SIEM', icon: Terminal },
    { id: 'wireshark', label: 'Packets', icon: Activity },
    { id: 'owasp', label: 'OWASP', icon: Crosshair },
    { id: 'sandbox', label: 'Sandbox', icon: Terminal },
    { id: 'soc-triage', label: 'SOC Triage', icon: Shield },
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
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} 
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">SOCReady</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">90 Days</span>
            </div>
          </div>
        </div>

        {/* Desktop Minimal Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Quick Search */}
          <button
            onClick={onSearchOpen}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400 transition-colors flex items-center gap-2 text-xs"
            title="Search (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px] text-slate-400">Search...</span>
            <kbd className="hidden md:inline text-[9px] px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">⌘K</kbd>
          </button>

          {/* Focus Timer */}
          <button
            onClick={onOpenTimer}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs transition-colors"
            title="Focus Timer"
          >
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline text-[11px] font-medium">Focus</span>
          </button>

          {/* Daily Streak */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{streakCount}d</span>
          </div>

          {/* Readiness Meter */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            title="Overall Readiness Score"
          >
            <span className="text-slate-500 text-[11px]">Progress:</span>
            <span className="font-semibold font-mono text-slate-900 dark:text-white">{overallPercentage}%</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 transition-colors"
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Settings / Backup */}
          <div className="relative">
            <button
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
              title="Options"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {showSettingsDropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-1.5 z-50 text-xs space-y-0.5">
                <button
                  onClick={() => {
                    onExportProgress();
                    setShowSettingsDropdown(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Backup Data (JSON)</span>
                </button>

                <label className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Restore Data</span>
                  <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                </label>

                <button
                  onClick={() => {
                    onResetProgress();
                    setShowSettingsDropdown(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 mt-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Progress</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-1.5 animate-fadeIn pb-1">
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
                className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${
                  isActive 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
