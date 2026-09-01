import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  Flame, 
  Search, 
  Layers, 
  BookOpen, 
  Briefcase, 
  Terminal, 
  Activity, 
  Crosshair, 
  FileCode, 
  Sun, 
  Moon, 
  ChevronDown, 
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
  const [isLabsOpen, setIsLabsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const labsRef = useRef(null);
  const moreRef = useRef(null);

  const labItems = [
    { id: 'siem', label: 'SIEM Log Hunter', icon: Terminal, desc: 'Query logs & detect events' },
    { id: 'wireshark', label: 'Packet Inspector', icon: Activity, desc: 'Analyze PCAPs & TCP streams' },
    { id: 'owasp', label: 'OWASP Playground', icon: Crosshair, desc: 'SQLi, XSS, and IDOR lab' },
    { id: 'sandbox', label: 'Script Sandbox', icon: FileCode, desc: 'Python & Bash security scripts' },
    { id: 'soc-triage', label: 'SOC Alert Triage', icon: Shield, desc: 'Live incident queue investigation' },
  ];

  const isLabActive = labItems.some(item => item.id === activeTab);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (labsRef.current && !labsRef.current.contains(e.target)) {
        setIsLabsOpen(false);
      }
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

        {/* Center: Clean 4 Core Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'roadmap'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Roadmap
          </button>

          {/* Simulators Dropdown */}
          <div className="relative" ref={labsRef}>
            <button
              onClick={() => setIsLabsOpen(!isLabsOpen)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                isLabActive || isLabsOpen
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span>Simulators</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLabsOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLabsOpen && (
              <div className="absolute left-0 mt-1.5 w-60 card-minimal rounded-xl p-1.5 shadow-lg z-50 animate-fadeIn space-y-0.5">
                {labItems.map((item) => {
                  const Icon = item.icon;
                  const isCurrent = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsLabsOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg transition-colors flex items-start gap-2.5 ${
                        isCurrent 
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-medium">{item.label}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'flashcards'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Flashcards
          </button>

          <button
            onClick={() => setActiveTab('career')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'career'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Career Hub
          </button>
        </nav>

        {/* Right: Minimal 3 Controls */}
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
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Shield },
            { id: 'roadmap', label: '90-Day Roadmap', icon: Layers },
            { id: 'siem', label: 'SIEM Log Hunter', icon: Terminal },
            { id: 'wireshark', label: 'Packet Inspector', icon: Activity },
            { id: 'owasp', label: 'OWASP Lab', icon: Crosshair },
            { id: 'sandbox', label: 'Script Sandbox', icon: FileCode },
            { id: 'soc-triage', label: 'SOC Triage Queue', icon: Shield },
            { id: 'flashcards', label: 'Active Flashcards', icon: BookOpen },
            { id: 'career', label: 'Career Hub', icon: Briefcase },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-left font-medium transition-colors flex items-center gap-2.5 ${
                  isActive 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0 text-slate-500" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
