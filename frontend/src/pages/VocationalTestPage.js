import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { submitVocationalTest } from '../redux/slices/authSlice';
import { Briefcase, ThumbsUp, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const questions = [
  "Arbeitest du gerne mit deinen Händen?",
  "Reparierst du gerne Dinge?",
  "Arbeitest du gerne draußen?",
  "Interessierst du dich für Maschinen?",
  "Baust oder bastelst du gerne etwas?",
  "Hilfst du gerne anderen Menschen?",
  "Hörst du anderen gerne zu?",
  "Arbeitest du gerne mit Kindern?",
  "Möchtest du Menschen gesund machen oder pflegen?",
  "Arbeitest du gerne im Team?",
  "Benutzt du gerne Computer?",
  "Lernst du gerne neue technische Dinge?",
  "Interessierst du dich für Elektronik?",
  "Löst du gerne Probleme?",
  "Arbeitest du gerne genau und sorgfältig?",
  "Zeichnest oder gestaltest du gerne?",
  "Fotografierst du gerne?",
  "Bist du kreativ?",
  "Hast du oft viele Ideen?",
  "Machst du gerne Musik oder Kunst?",
  "Sprichst du gerne mit Menschen?",
  "Kannst du andere gut überzeugen?",
  "Verkaufst du gerne etwas?",
  "Möchtest du später Verantwortung übernehmen?",
  "Organisierst du gerne Dinge?",
  "Arbeitest du gerne im Büro?",
  "Planst du gerne?",
  "Magst du Ordnung?",
  "Arbeitest du gerne mit Zahlen?",
  "Erledigst du Aufgaben zuverlässig?"
];

function VocationalTestPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // 'intro' | 'test' | 'outro'
  const [phase, setPhase] = useState('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('right');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startTest = () => {
    setPhase('test');
  };

  const handleAnswer = (answer) => {
    if (isAnimating) return;
    
    const newAnswers = [...answers];
    newAnswers[currentIndex] = { questionId: currentIndex + 1, question: questions[currentIndex], answer };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setDirection('right');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(curr => curr + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      finishTest(newAnswers);
    }
  };

  const finishTest = async (finalAnswers) => {
    setPhase('outro');
    setIsSubmitting(true);
    try {
      await dispatch(submitVocationalTest({ userId: user.id || user._id, results: finalAnswers })).unwrap();
    } catch (error) {
      console.error('Failed to submit test:', error);
      // Handle error gracefully
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToSpace = () => {
    navigate('/user/application');
  };

  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-neutral-950 flex flex-col items-center justify-center overflow-hidden px-4">
      
      {/* Intro Phase */}
      {phase === 'intro' && (
        <div className="max-w-lg w-full bg-white dark:bg-neutral-900 p-8 sm:p-12 rounded-[2rem] border border-gray-200 dark:border-neutral-800 shadow-xl text-center animate-fade-in">
          <div className="w-20 h-20 bg-[#00A693]/10 dark:bg-[#2dd4bf]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-[#00A693] dark:text-[#2dd4bf]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Welcome to your Journey!</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            To help us match you with the perfect opportunity in Germany, we'd like to get to know your professional interests better. It only takes a couple of minutes to answer these 30 quick questions.
          </p>
          <button 
            onClick={startTest}
            className="w-full py-4 px-8 bg-[#00A693] hover:bg-[#008f7d] dark:bg-[#2dd4bf] dark:hover:bg-[#14b8a6] text-white dark:text-neutral-900 font-bold rounded-2xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2"
          >
            Start Assessment <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Test Phase */}
      {phase === 'test' && (
        <div className="w-full max-w-lg flex flex-col items-center animate-fade-in">
          {/* Header Info */}
          <div className="w-full mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight flex items-center justify-center gap-2">
              <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-[#00A693] dark:text-[#2dd4bf]" />
              Career Interests
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="w-full mb-8">
            <div className="flex justify-between items-center mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#00A693] dark:bg-[#2dd4bf] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Card Container */}
          <div className="relative w-full max-w-md perspective-1000 h-[380px] sm:h-[420px]">
            {currentIndex < questions.length && (
              <div 
                className={`absolute inset-0 transition-all duration-300 ease-in-out transform
                  ${isAnimating && direction === 'right' ? '-translate-x-full opacity-0 rotate-y-12 scale-95' : 'translate-x-0 opacity-100 rotate-y-0 scale-100'}
                `}
              >
                <div className="bg-white dark:bg-neutral-900 w-full h-full rounded-[2rem] border border-gray-200 dark:border-neutral-800 shadow-xl shadow-black/5 dark:shadow-black/20 p-8 sm:p-10 flex flex-col justify-between items-center text-center">
                  
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#00A693]/10 dark:bg-[#2dd4bf]/10 rounded-full flex items-center justify-center mb-6 sm:mb-8 mt-2 sm:mt-4">
                    <span className="text-2xl sm:text-3xl font-bold text-[#00A693] dark:text-[#2dd4bf]">
                      {currentIndex + 1}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-100 mb-8 flex-grow flex items-center">
                    "{questions[currentIndex]}"
                  </h2>

                  <div className="w-full flex flex-col gap-3 sm:gap-4 mt-auto">
                    <button 
                      onClick={() => handleAnswer('Ja')}
                      className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-white dark:bg-neutral-800 border-2 border-[#00A693] dark:border-[#2dd4bf] text-[#00A693] dark:text-[#2dd4bf] font-semibold text-base sm:text-lg hover:bg-[#00A693] hover:text-white dark:hover:bg-[#2dd4bf] dark:hover:text-neutral-900 transition-all active:scale-95 flex justify-center items-center gap-2 group"
                    >
                      <ThumbsUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" /> 
                      Ja <span className="text-xs font-normal opacity-75">(Yes)</span>
                    </button>
                    
                    <div className="flex gap-3 sm:gap-4 w-full">
                      <button 
                        onClick={() => handleAnswer('Vielleicht')}
                        className="flex-1 py-3 sm:py-3.5 rounded-2xl bg-gray-50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all active:scale-95 flex flex-col items-center justify-center"
                      >
                        <span className="text-sm sm:text-base">Vielleicht</span>
                        <span className="text-[10px] sm:text-xs text-gray-400">(Maybe)</span>
                      </button>
                      <button 
                        onClick={() => handleAnswer('Nein')}
                        className="flex-1 py-3 sm:py-3.5 rounded-2xl bg-gray-50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:hover:border-red-900/30 transition-all active:scale-95 flex flex-col items-center justify-center"
                      >
                        <span className="text-sm sm:text-base">Nein</span>
                        <span className="text-[10px] sm:text-xs text-gray-400">(No)</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Outro Phase */}
      {phase === 'outro' && (
        <div className="max-w-lg w-full bg-white dark:bg-neutral-900 p-8 sm:p-12 rounded-[2rem] border border-gray-200 dark:border-neutral-800 shadow-xl text-center animate-scale-in">
          {isSubmitting ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 border-4 border-[#00A693]/30 dark:border-[#2dd4bf]/30 border-t-[#00A693] dark:border-t-[#2dd4bf] rounded-full animate-spin mb-6"></div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Saving your results...</h2>
              <p className="text-gray-500 dark:text-gray-400">Please wait a moment.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">All Done!</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                Thank you for completing the interest test. Your profile has been updated, and we're one step closer to finding your perfect fit.
              </p>
              <button 
                onClick={goToSpace}
                className="w-full py-4 px-8 bg-[#00A693] hover:bg-[#008f7d] dark:bg-[#2dd4bf] dark:hover:bg-[#14b8a6] text-white dark:text-neutral-900 font-bold rounded-2xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2"
              >
                Go to My Space <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default VocationalTestPage;
