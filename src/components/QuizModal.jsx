import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw
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
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="card-minimal rounded-2xl p-6 max-w-sm w-full text-center space-y-3 shadow-lg">
          <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Assessment In Progress</h3>
          <p className="text-xs text-slate-500">
            This quiz is currently being finalized.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-xs"
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
          particleCount: 50,
          spread: 60,
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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="card-minimal rounded-2xl max-w-xl w-full p-6 sm:p-7 space-y-4 shadow-xl relative my-8">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
        >
          <X className="w-4 h-4" />
        </button>

        {!quizFinished ? (
          <>
            <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Assessment</span>
                <span>Question {currentIdx + 1} of {totalQuestions}</span>
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">{quiz.title}</h2>

              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-slate-900 dark:bg-white h-full rounded-full transition-all duration-200"
                  style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
              {currentQ.question}
            </div>

            <div className="space-y-2">
              {currentQ.options.map((opt, optIdx) => {
                const isCurrentSelected = userChoice === optIdx;
                const isCorrect = currentQ.correctAnswer === optIdx;

                let btnStyle = 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300';
                
                if (showExplanation) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-medium';
                  } else if (isCurrentSelected && !isCorrect) {
                    btnStyle = 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                  } else {
                    btnStyle = 'border-slate-200 dark:border-slate-800 text-slate-400 opacity-50';
                  }
                } else if (isCurrentSelected) {
                  btnStyle = 'border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm leading-relaxed transition-colors flex items-start justify-between gap-3 ${btnStyle}`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-xs text-slate-400 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span>{opt}</span>
                    </div>

                    {showExplanation && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {showExplanation && isCurrentSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs leading-relaxed space-y-0.5 animate-fadeIn">
                <span className="font-semibold text-slate-900 dark:text-white block">Explanation:</span>
                <p className="text-slate-600 dark:text-slate-400">{currentQ.explanation}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400 font-mono">
                Passing: {quiz.passingScore}%
              </span>

              {!showExplanation ? (
                <button
                  disabled={!isSelected}
                  onClick={handleCheckAnswer}
                  className="px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 disabled:opacity-30 font-medium text-xs"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-xs flex items-center gap-1"
                >
                  <span>{currentIdx < totalQuestions - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 py-3">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {passed ? 'Quiz Passed ✓' : 'Quiz Completed'}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Score: <span className="font-mono font-semibold text-slate-900 dark:text-white">{finalScore}%</span> ({correctCount} / {totalQuestions} correct)
            </p>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={handleRestart}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-xs"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
