import React, { useState } from 'react';
import { 
  BookOpen, 
  RotateCw, 
  CheckCircle2, 
  Shuffle, 
  ArrowLeft, 
  ArrowRight
} from 'lucide-react';
import { FLASHCARDS_DATA, FLASHCARD_CATEGORIES } from '../data/flashcardsData';

export default function FlashcardsDeck({ progress, toggleFlashcardMastery }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showOnlyUnmastered, setShowOnlyUnmastered] = useState(false);

  const filteredCards = FLASHCARDS_DATA.filter(card => {
    if (selectedCategory !== 'All' && card.category !== selectedCategory) return false;
    if (showOnlyUnmastered && progress.flashcardMastery[card.id]) return false;
    return true;
  });

  const currentCard = filteredCards[currentCardIdx] || filteredCards[0];
  const isMastered = currentCard ? !!progress.flashcardMastery[currentCard.id] : false;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIdx(prev => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentCardIdx(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentCardIdx(Math.floor(Math.random() * filteredCards.length));
  };

  const totalInCategory = FLASHCARDS_DATA.filter(c => selectedCategory === 'All' || c.category === selectedCategory).length;
  const masteredInCategory = FLASHCARDS_DATA.filter(c => (selectedCategory === 'All' || c.category === selectedCategory) && progress.flashcardMastery[c.id]).length;
  const masteryPct = totalInCategory > 0 ? Math.round((masteredInCategory / totalInCategory) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#0a1020] border border-slate-200 dark:border-cyan-500/20 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 card-subtle-shadow">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white font-mono">
              ACTIVE RECALL FLASHCARD DECKS
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Memorize critical ports, Windows Event IDs, MITRE ATT&CK tactics, and incident response phases for interviews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-cyan-300 font-bold">
            Mastery: <span className="text-sky-600 dark:text-white">{masteryPct}%</span> ({masteredInCategory}/{totalInCategory})
          </div>
          <button
            onClick={handleShuffle}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sky-400 text-slate-600 dark:text-slate-400 hover:text-slate-900 transition-all"
            title="Shuffle Deck"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {FLASHCARD_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentCardIdx(0);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Flashcard View */}
      {filteredCards.length > 0 ? (
        <div className="space-y-4">
          
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative min-h-[300px] sm:min-h-[340px] rounded-3xl bg-gradient-to-br from-white via-sky-50/40 to-blue-50/30 dark:from-[#0c1326] dark:via-[#0f1730] dark:to-[#121028] border-2 border-slate-200 dark:border-cyan-500/30 hover:border-sky-400 p-8 flex flex-col justify-between cursor-pointer transition-all shadow-lg select-none"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-sky-100 dark:bg-cyan-500/10 border border-sky-300 dark:border-cyan-500/30 text-sky-800 dark:text-cyan-300 font-mono text-xs font-bold">
                {currentCard.category}
              </span>

              <div className="flex items-center gap-2">
                {isMastered && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Mastered
                  </span>
                )}
                <span className="text-xs text-slate-400 font-mono font-semibold">
                  {currentCardIdx + 1} / {filteredCards.length}
                </span>
              </div>
            </div>

            {/* Center Question / Answer */}
            <div className="text-center py-6 space-y-4">
              {!isFlipped ? (
                <div className="space-y-3">
                  <span className="text-xs uppercase font-mono text-slate-400 tracking-wider font-bold">Concept / Term</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                    {currentCard.front}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center justify-center gap-1">
                    <RotateCw className="w-3 h-3 text-sky-600 dark:text-cyan-400" />
                    <span>Click card to reveal answer</span>
                  </p>
                </div>
              ) : (
                <div className="space-y-3 animate-fadeIn">
                  <span className="text-xs uppercase font-mono text-sky-700 dark:text-cyan-400 tracking-wider font-bold">Security Explanation</span>
                  <p className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200 leading-relaxed max-w-xl mx-auto font-sans">
                    {currentCard.back}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <span>Click to flip</span>
              <span className="text-sky-600 dark:text-cyan-400 font-bold">Card #{currentCard.id}</span>
            </div>
          </div>

          {/* Navigation & Mastery Controls */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold flex items-center gap-1.5 card-subtle-shadow"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => toggleFlashcardMastery(currentCard.id)}
              className={`px-5 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all ${
                isMastered
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isMastered ? 'Mastered ✓' : 'Mark as Mastered'}</span>
            </button>

            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs font-mono flex items-center gap-1.5 shadow-sm"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3 card-subtle-shadow">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">All Cards in this Deck Mastered!</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Switch category above to continue practicing.
          </p>
        </div>
      )}

    </div>
  );
}
