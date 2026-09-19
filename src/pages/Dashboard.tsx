import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { calculateStreak, calculateSessionVolume, formatVolume } from '../utils/calculations';
import { Dumbbell, Flame, Trophy, TrendingUp, Calendar, Target, Zap, Clock, Sparkles, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { state } = useApp();
  const navigate = useNavigate();
  const activeProgram = state.programs.find(p => p.program.id === state.activeProgramId);
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const todaySession = state.sessions.find(s => s.date === new Date().toISOString().split('T')[0]);
  const streak = calculateStreak(state.sessions);
  const totalWorkouts = state.sessions.length;
  const thisWeekSessions = state.sessions.filter(s => {
    const d = new Date(s.date);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo;
  }).length;

  const totalVolume = state.sessions.reduce((total, s) => total + s.totalVolume, 0);
  const totalPRs = 0; // Simplified for now

  const currentDayIndex = (() => {
    if (!activeProgram) return 0;
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const idx = activeProgram.days.findIndex(d => d.weekday === today);
    return idx >= 0 ? idx : 0;
  })();

  const currentDay = activeProgram?.days[currentDayIndex];
  const completionRate = activeProgram ? Math.round((state.sessions.filter(s => s.programId === activeProgram.program.id).length / (activeProgram.program.duration_weeks * activeProgram.program.days_per_week)) * 100) : 0;

  if (!state.settings.onboardingComplete) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-6">
            <Dumbbell size={36} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to FitForge</h1>
          <p className="text-slate-400 mb-6">Complete your profile to get started with AI-powered workout planning.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      <div className="max-w-lg mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">{getGreeting()} 👋</h1>
            <p className="text-slate-400">{state.profile?.name || 'Athlete'}</p>
          </div>

          {/* Today's Workout Card */}
          {activeProgram && currentDay && (
            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-indigo-300 bg-indigo-500/20 px-2 py-1 rounded-full">
                  {todaySession ? '✅ Completed' : '📋 Today'}
                </span>
                <span className="text-xs text-slate-400">{currentDay.weekday}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-1">{currentDay.name}</h2>
              <p className="text-slate-300 text-sm mb-3">
                {currentDay.exercises.length} exercises • {currentDay.focus.join(', ')}
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1"><Clock size={14} /> ~{Math.round(currentDay.exercises.reduce((t, e) => t + (e.sets * (e.rest_seconds + 45)) / 60, 0))} min</span>
                <span className="flex items-center gap-1"><Dumbbell size={14} /> {currentDay.exercises.reduce((t, e) => t + e.sets, 0)} sets</span>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <StatCard icon={Flame} label="Streak" value={`${streak} days`} color="text-amber-400" bg="bg-amber-500/10" />
            <StatCard icon={TrendingUp} label="This Week" value={`${thisWeekSessions} workouts`} color="text-emerald-400" bg="bg-emerald-500/10" />
            <StatCard icon={Trophy} label="Total Volume" value={formatVolume(totalVolume)} color="text-indigo-400" bg="bg-indigo-500/10" />
            <StatCard icon={Zap} label="Total Workouts" value={`${totalWorkouts}`} color="text-rose-400" bg="bg-rose-500/10" />
          </div>

          {/* Progress Ring */}
          {activeProgram && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">
              <h3 className="text-sm font-medium text-slate-400 mb-4">Program Progress</h3>
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 -rotate-90">
                    <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="none" className="text-slate-800" />
                    <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="none"
                      className="text-indigo-500" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      strokeDashoffset={`${2 * Math.PI * 34 * (1 - completionRate / 100)}`} />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
                    {completionRate}%
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold">{activeProgram.program.name}</p>
                  <p className="text-slate-400 text-sm">{activeProgram.program.duration_weeks} weeks • {activeProgram.program.days_per_week} days/week</p>
                  <p className="text-slate-500 text-xs mt-1">{state.sessions.filter(s => s.programId === activeProgram.program.id).length} sessions completed</p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Activity */}
          {state.sessions.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-sm font-medium text-slate-400 mb-4">Recent Workouts</h3>
              <div className="space-y-3">
                {state.sessions.slice(-5).reverse().map(session => (
                  <div key={session.id} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                    <div>
                      <p className="text-white text-sm font-medium">{session.dayName}</p>
                      <p className="text-slate-500 text-xs">{new Date(session.date).toLocaleDateString()} • {session.duration} min</p>
                    </div>
                    <div className="text-right">
                      <p className="text-indigo-400 text-sm font-medium">{formatVolume(session.totalVolume)}</p>
                      <p className="text-slate-500 text-xs">{session.totalSets} sets</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {state.sessions.length === 0 && activeProgram && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
              <Dumbbell size={40} className="text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No workouts logged yet.</p>
              <p className="text-slate-500 text-xs mt-1">Start your first workout to see progress here!</p>
            </div>
          )}

          {!activeProgram && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
              <Target size={40} className="text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm mb-4">No active program.</p>
              <p className="text-slate-500 text-xs mb-6">Generate a prompt and import your AI workout program to get started.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => navigate('/prompt')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors">
                  <Sparkles size={16} /> Generate Prompt
                </button>
                <button onClick={() => navigate('/import')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition-colors">
                  <Upload size={16} /> Import Program
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, bg }: { icon: any; label: string; value: string; color: string; bg: string }) {
  return (
    <div className={`${bg} border border-slate-800 rounded-2xl p-4`}>
      <Icon size={20} className={`${color} mb-2`} />
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      <p className="text-slate-400 text-xs">{label}</p>
    </div>
  );
}
