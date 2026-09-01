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

  const filteredCards = FLASHCARDS_DATA.filter(card => {
    if (selectedCategory !== 'All' && card.category !== selectedCategory) return false;
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
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      
      {/* Header */}
      <div className="card-minimal rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span>Active Recall Flashcards</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Spaced repetition for ports, Event IDs, MITRE tactics, and incident response.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs font-mono text-slate-500">
            Mastery: <span className="font-semibold text-slate-900 dark:text-white">{masteryPct}%</span> ({masteredInCategory}/{totalInCategory})
          </div>
          <button
            onClick={handleShuffle}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500"
            title="Shuffle"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
        {FLASHCARD_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentCardIdx(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card */}
      {filteredCards.length > 0 ? (
        <div className="space-y-3">
          
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="card-minimal rounded-2xl min-h-[260px] p-8 flex flex-col justify-between cursor-pointer select-none transition-colors hover:border-slate-400 dark:hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-500">
                {currentCard.category}
              </span>

              <div className="flex items-center gap-2">
                {isMastered && (
                  <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Mastered
                  </span>
                )}
                <span className="text-slate-400 font-mono text-xs">
                  {currentCardIdx + 1} / {filteredCards.length}
                </span>
              </div>
            </div>

            {/* Center Content */}
            <div className="text-center py-4 space-y-2">
              {!isFlipped ? (
                <div className="space-y-2">
                  <span className="text-[11px] uppercase text-slate-400 font-mono">Concept</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-mono tracking-tight">
                    {currentCard.front}
                  </h2>
                  <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 pt-1 font-sans">
                    <RotateCw className="w-3 h-3" />
                    <span>Click to reveal explanation</span>
                  </p>
                </div>
              ) : (
                <div className="space-y-2 animate-fadeIn">
                  <span className="text-[11px] uppercase text-slate-400 font-mono">Explanation</span>
                  <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed max-w-xl mx-auto font-sans">
                    {currentCard.back}
                  </p>
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-400 font-mono text-right">
              Card #{currentCard.id}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              onClick={handlePrev}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => toggleFlashcardMastery(currentCard.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isMastered
                  ? 'bg-emerald-600 text-white'
                  : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {isMastered ? 'Mastered ✓' : 'Mark Mastered'}
            </button>

            <button
              onClick={handleNext}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium flex items-center gap-1"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      ) : null}

    </div>
  );
}
