import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useVocationalApi } from '../hooks/useVocationalApi';
import { Briefcase, ThumbsUp, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, Home } from 'lucide-react';

function VocationalTestPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { submitVocationalTest } = useVocationalApi();
  const { user } = useSelector((state) => state.auth);
  const { questions } = useSelector((state) => state.vocational);

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

  const goBack = () => {
    if (currentIndex > 0 && !isAnimating) {
      setDirection('left');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(curr => curr - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const finishTest = async (finalAnswers) => {
    setPhase('outro');
    setIsSubmitting(true);
    try {
      await submitVocationalTest({ userId: user.id || user._id, results: finalAnswers });
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
        <div className="w-full flex flex-col items-center">
          <div className="max-w-xl w-full bg-white dark:bg-neutral-900 p-10 sm:p-14 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-none text-center animate-fade-in">
            <div className="w-20 h-20 bg-[#00A693]/10 dark:bg-[#2dd4bf]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-[#00A693] dark:text-[#2dd4bf]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {user?.hasCompletedVocationalTest ? 'Update Your Career Interests' : 'Welcome to your Journey!'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              {user?.hasCompletedVocationalTest 
                ? "It looks like you've already completed the vocational assessment. If your interests have changed, you can retake the assessment to update your profile and receive better opportunity matches."
                : "To help us match you with the perfect opportunity in Germany, we'd like to get to know your professional interests better. It only takes a couple of minutes to answer these 30 quick questions."}
            </p>
            <button 
              onClick={startTest}
              className="w-full py-4 sm:py-5 px-8 bg-[#00A693] hover:bg-[#008f7d] dark:bg-[#2dd4bf] dark:hover:bg-[#14b8a6] text-white dark:text-neutral-900 font-bold rounded-full text-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2 shadow-lg shadow-[#00A693]/30 dark:shadow-[#2dd4bf]/20"
            >
              {user?.hasCompletedVocationalTest ? 'Retake Assessment' : 'Start Assessment'} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
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
          <div className="relative w-full max-w-xl perspective-1000 h-[400px] sm:h-[460px]">
            {currentIndex < questions.length && (
              <div 
                className={`absolute inset-0 transition-all duration-300 ease-in-out transform
                  ${isAnimating ? (direction === 'right' ? '-translate-x-full opacity-0 rotate-y-12 scale-95' : 'translate-x-full opacity-0 -rotate-y-12 scale-95') : 'translate-x-0 opacity-100 rotate-y-0 scale-100'}
                `}
              >
                <div className="bg-white dark:bg-neutral-900 w-full h-full rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-none p-8 sm:p-12 flex flex-col justify-between items-center text-center relative">
                  
                  {currentIndex > 0 && (
                    <button 
                      onClick={goBack}
                      className="absolute top-6 left-6 sm:top-8 sm:left-8 px-3 sm:px-4 py-2 rounded-full flex items-center justify-center gap-1.5 sm:gap-2 bg-gray-100 dark:bg-neutral-800 text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-neutral-700 dark:text-gray-400 dark:hover:text-white transition-colors group"
                      title="Previous Question"
                    >
                      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
                      <span className="text-xs sm:text-sm font-medium">Back</span>
                    </button>
                  )}
                  
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
                      className="w-full py-4 sm:py-5 px-6 rounded-full bg-white dark:bg-neutral-800 border-2 border-[#00A693] dark:border-[#2dd4bf] text-[#00A693] dark:text-[#2dd4bf] font-bold text-base sm:text-lg hover:bg-[#00A693] hover:text-white dark:hover:bg-[#2dd4bf] dark:hover:text-neutral-900 transition-all active:scale-95 flex justify-center items-center gap-2 group"
                    >
                      <ThumbsUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" /> 
                      Ja <span className="text-xs font-normal opacity-75">(Yes)</span>
                    </button>
                    
                    <div className="flex gap-3 sm:gap-4 w-full">
                      <button 
                        onClick={() => handleAnswer('Vielleicht')}
                        className="flex-1 py-3.5 sm:py-4 rounded-[2rem] bg-gray-50 dark:bg-neutral-800/50 border-none text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all active:scale-95 flex flex-col items-center justify-center"
                      >
                        <span className="text-sm sm:text-base">Vielleicht</span>
                        <span className="text-[10px] sm:text-xs text-gray-400">(Maybe)</span>
                      </button>
                      <button 
                        onClick={() => handleAnswer('Nein')}
                        className="flex-1 py-3.5 sm:py-4 rounded-[2rem] bg-gray-50 dark:bg-neutral-800/50 border-none text-gray-600 dark:text-gray-300 font-medium hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-all active:scale-95 flex flex-col items-center justify-center"
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
        <div className="max-w-xl w-full bg-white dark:bg-neutral-900 p-10 sm:p-14 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-none text-center animate-scale-in">
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
                className="w-full py-4 sm:py-5 px-8 bg-[#00A693] hover:bg-[#008f7d] dark:bg-[#2dd4bf] dark:hover:bg-[#14b8a6] text-white dark:text-neutral-900 font-bold rounded-full text-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2 shadow-lg shadow-[#00A693]/30 dark:shadow-[#2dd4bf]/20"
              >
                Go to My Space <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating Bottom Nav for Leave Test */}
      {phase !== 'outro' && (
        <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 z-50 pointer-events-none animate-slide-up animate-delay-300">
          <div className="max-w-md mx-auto pointer-events-auto px-4">
            <button 
              onClick={() => navigate('/user/application')}
              className="w-full py-4 sm:py-5 px-6 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border-none shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center gap-3 text-gray-700 dark:text-gray-200 font-bold text-sm sm:text-base hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-neutral-800 dark:hover:text-white transition-all active:scale-[0.98] group"
            >
              <div className="p-1.5 sm:p-2 bg-gray-100 dark:bg-neutral-800 rounded-xl group-hover:bg-gray-200 dark:group-hover:bg-neutral-700 transition-colors">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              </div>
              Leave Test & Return to My Space
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default VocationalTestPage;
