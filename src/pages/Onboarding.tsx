import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { Dumbbell, Brain, Target, TrendingUp, Calendar, CheckCircle } from 'lucide-react';

const onboardingSlides = [
  { icon: Dumbbell, title: 'FitForge', subtitle: 'Your AI-Powered Workout Companion', desc: 'Build personalized workout programs with AI and track every rep, set, and progression.', color: 'from-indigo-500 to-purple-600' },
  { icon: Target, title: 'Build Your Profile', subtitle: 'Tell Us About You', desc: 'Enter your body stats, goals, experience level, and training preferences.', color: 'from-emerald-500 to-cyan-600' },
  { icon: Brain, title: 'AI Program Generation', subtitle: 'Smart Prompt System', desc: 'We generate a professional prompt. Give it to any AI (ChatGPT, Claude, Gemini) to create your custom program.', color: 'from-amber-500 to-orange-600' },
  { icon: Calendar, title: 'Import & Track', subtitle: 'Seamless Integration', desc: 'Import the AI-generated JSON program. Track sets, reps, weights with our professional tracker.', color: 'from-rose-500 to-pink-600' },
  { icon: TrendingUp, title: 'Track Progress', subtitle: 'Analytics & Insights', desc: 'View your progress with beautiful charts. Track volume, PRs, muscle groups, and streaks.', color: 'from-blue-500 to-indigo-600' },
  { icon: CheckCircle, title: 'Ready to Start?', subtitle: 'Let\'s Build Your Profile', desc: 'Complete your profile to get started with your personalized fitness journey.', color: 'from-violet-500 to-fuchsia-600' },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { dispatch } = useApp();

  const handleComplete = () => {
    dispatch({ type: 'COMPLETE_ONBOARDING' });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center text-center max-w-md"
        >
          <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${onboardingSlides[currentSlide].color} flex items-center justify-center mb-8 shadow-2xl`}>
            {React.createElement(onboardingSlides[currentSlide].icon, { size: 48, className: 'text-white' })}
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            {onboardingSlides[currentSlide].title}
          </h1>
          <h2 className="text-lg text-indigo-300 mb-4">
            {onboardingSlides[currentSlide].subtitle}
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mb-12">
            {onboardingSlides[currentSlide].desc}
          </p>

          {/* Progress dots */}
          <div className="flex gap-2 mb-8">
            {onboardingSlides.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-4 w-full">
            {currentSlide > 0 && (
              <button
                onClick={() => setCurrentSlide(currentSlide - 1)}
                className="flex-1 py-3 px-6 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Back
              </button>
            )}
            {currentSlide < onboardingSlides.length - 1 ? (
              <button
                onClick={() => setCurrentSlide(currentSlide + 1)}
                className="flex-1 py-3 px-6 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all"
              >
                Start Building Profile
              </button>
            )}
          </div>

          {currentSlide < onboardingSlides.length - 1 && (
            <button
              onClick={handleComplete}
              className="mt-4 text-slate-500 text-sm hover:text-slate-300 transition-colors"
            >
              Skip
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
