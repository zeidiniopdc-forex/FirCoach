import React, { useState } from 'react';
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
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f172a', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '24px',
      color: 'white'
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center', 
        maxWidth: '448px' 
      }}>
          <div style={{ 
            width: '96px', 
            height: '96px', 
            borderRadius: '24px', 
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: '32px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
          }}>
            {React.createElement(onboardingSlides[currentSlide].icon, { size: 48, color: 'white' })}
          </div>

          <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            {onboardingSlides[currentSlide].title}
          </h1>
          <h2 style={{ fontSize: '18px', color: '#a5b4fc', marginBottom: '16px' }}>
            {onboardingSlides[currentSlide].subtitle}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.6', marginBottom: '48px', textAlign: 'center' }}>
            {onboardingSlides[currentSlide].desc}
          </p>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
            {onboardingSlides.map((_, i) => (
              <div
                key={i}
                style={{
                  height: '8px',
                  borderRadius: '4px',
                  transition: 'all 0.3s',
                  width: i === currentSlide ? '32px' : '8px',
                  backgroundColor: i === currentSlide ? '#6366f1' : '#334155'
                }}
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px', width: '100%', maxWidth: '400px' }}>
            {currentSlide > 0 && (
              <button
                onClick={() => setCurrentSlide(currentSlide - 1)}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: '1px solid #334155',
                  backgroundColor: 'transparent',
                  color: '#cbd5e1',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Back
              </button>
            )}
            {currentSlide < onboardingSlides.length - 1 ? (
              <button
                onClick={() => setCurrentSlide(currentSlide + 1)}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  borderRadius: '12px',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleComplete}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  color: 'white',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Start Building Profile
              </button>
            )}
          </div>

          {currentSlide < onboardingSlides.length - 1 && (
            <button
              onClick={handleComplete}
              style={{
                marginTop: '16px',
                color: '#64748b',
                fontSize: '14px',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Skip
            </button>
          )}
      </div>
    </div>
  );
}
