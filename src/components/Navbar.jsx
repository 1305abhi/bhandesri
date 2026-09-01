import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  Flame, 
  Search, 
  Layers, 
  BookOpen, 
  Briefcase, 
  Laptop, 
  Sun, 
  Moon, 
  Clock, 
  Download, 
  Upload, 
  RotateCcw,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ 
  theme,
  toggleTheme,
  activeTab, 
  setActiveTab, 
  streakCount, 
  onOpenTimer,
  onExportProgress,
  onImportProgress,
  onResetProgress,
  onSearchOpen
}) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const moreRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (text) {
          onImportProgress(text);
          setIsMoreOpen(false);
        }
      };
      reader.readAsText(file);
    }
  };

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'guides', label: 'Practical Guides' },
    { id: 'flashcards', label: 'Flashcards' },
    { id: 'career', label: 'Career Hub' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-sm border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Clean Brand Logo */}
        <div 
          onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} 
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-slate-900 dark:text-white">
            SOCReady
          </span>
        </div>

        {/* Center: 5 Clean Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Minimal 4 Controls */}
        <div className="flex items-center gap-2">
          
          {/* Search Trigger */}
          <button
            onClick={onSearchOpen}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Search (⌘K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Daily Streak */}
          <div className="flex items-center gap-1 text-xs font-mono text-slate-600 dark:text-slate-400 font-medium px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800">
            <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{streakCount}d</span>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* More Options Dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="More"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {isMoreOpen && (
              <div className="absolute right-0 mt-1.5 w-48 card-minimal rounded-xl p-1.5 shadow-lg z-50 animate-fadeIn text-xs space-y-0.5">
                <button
                  onClick={() => {
                    onOpenTimer();
                    setIsMoreOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2"
                >
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Focus Timer</span>
                </button>

                <button
                  onClick={() => {
                    onExportProgress();
                    setIsMoreOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Backup Progress</span>
                </button>

                <label className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Restore Progress</span>
                  <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                </label>

                <button
                  onClick={() => {
                    onResetProgress();
                    setIsMoreOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 mt-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Progress</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-0.5 animate-fadeIn pb-1 text-xs">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-left font-medium transition-colors ${
                  isActive 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
