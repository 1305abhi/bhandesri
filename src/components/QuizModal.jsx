import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZZES_DATA } from '../data/quizData';

export default function QuizModal({ quizId, onClose, onSaveScore }) {
  const quiz = QUIZZES_DATA[quizId];
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!quiz) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quiz Under Preparation</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The assessment for this chapter is being compiled. Continue with your reading and check out the practical commands!
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentIdx];
  const isSelected = selectedAnswers[currentIdx] !== undefined;
  const userChoice = selectedAnswers[currentIdx];

  const handleSelectOption = (idx) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: idx
    }));
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / quiz.questions.length) * 100);
    const passed = scorePct >= quiz.passingScore;

    onSaveScore(quiz.id, scorePct, passed);
    setQuizFinished(true);

    if (passed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  const totalQuestions = quiz.questions.length;
  let correctCount = 0;
  quiz.questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctAnswer) correctCount++;
  });
  const finalScore = Math.round((correctCount / totalQuestions) * 100);
  const passed = finalScore >= quiz.passingScore;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-cyan-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900"
        >
          <X className="w-4 h-4" />
        </button>

        {!quizFinished ? (
          <>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 text-[11px] font-mono font-bold">
                  CHAPTER ASSESSMENT
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-semibold">
                  Question {currentIdx + 1} of {totalQuestions}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{quiz.title}</h2>

              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-500 to-purple-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-slate-100 leading-relaxed font-sans">
              {currentQ.question}
            </div>

            <div className="space-y-2.5">
              {currentQ.options.map((opt, optIdx) => {
                const isCurrentSelected = userChoice === optIdx;
                const isCorrect = currentQ.correctAnswer === optIdx;

                let btnStyle = 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-sky-400 hover:bg-slate-50';
                
                if (showExplanation) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 dark:bg-emerald-950/60 dark:border-emerald-500 dark:text-emerald-200 font-bold';
                  } else if (isCurrentSelected && !isCorrect) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 dark:bg-rose-950/60 dark:border-rose-500 dark:text-rose-200';
                  } else {
                    btnStyle = 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-900 text-slate-400 opacity-50';
                  }
                } else if (isCurrentSelected) {
                  btnStyle = 'bg-sky-50 border-sky-500 text-sky-900 dark:bg-cyan-950/60 dark:border-cyan-400 dark:text-cyan-200 font-bold shadow-xs';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {showExplanation && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {showExplanation && isCurrentSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm leading-relaxed space-y-1 animate-fadeIn font-sans">
                <span className="font-bold text-sky-700 dark:text-cyan-400 font-mono text-xs block">
                  Defensive Analysis & Explanation:
                </span>
                <p className="text-slate-700 dark:text-slate-300">{currentQ.explanation}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400 font-mono font-semibold">
                Passing: {quiz.passingScore}%
              </span>

              {!showExplanation ? (
                <button
                  disabled={!isSelected}
                  onClick={handleCheckAnswer}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold text-xs shadow-sm transition-all"
                >
                  Verify Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <span>{currentIdx < totalQuestions - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center bg-sky-100 dark:bg-cyan-500/20 border border-sky-300 dark:border-cyan-400/40">
              {passed ? (
                <Award className="w-8 h-8 text-sky-600 dark:text-cyan-400" />
              ) : (
                <RotateCcw className="w-8 h-8 text-amber-500" />
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {passed ? 'Assessment Passed! 🎉' : 'Keep Practicing! 💪'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                You scored <span className="font-bold text-sky-600 dark:text-cyan-400 text-sm font-mono">{finalScore}%</span> ({correctCount} / {totalQuestions} correct).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              {passed ? (
                <span>Excellent comprehension of core principles! Your score has been logged to your overall job readiness profile.</span>
              ) : (
                <span>Review the chapter theory and practical commands to solidify your understanding, then retake the quiz.</span>
              )}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-sm"
              >
                Done & Return
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
