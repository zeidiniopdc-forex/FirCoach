import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { User, Target, Wrench, Calendar, AlertTriangle, Edit, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleReset = () => {
    if (confirm('Are you sure? This will delete all your data.')) {
      dispatch({ type: 'RESET_APP' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      <div className="max-w-lg mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Profile</h1>
            <button onClick={() => navigate('/settings')}
              className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
              <Settings size={20} />
            </button>
          </div>

          {/* User Info Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
                <User size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{state.profile?.name || 'Athlete'}</h2>
                <p className="text-slate-400 text-sm">
                  {state.profile?.age}y • {state.profile?.sex} • {state.profile?.heightCm}cm • {state.profile?.weightKg}kg
                </p>
              </div>
            </div>
          </div>

          {/* Goals */}
          {state.goals.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Target size={18} className="text-indigo-400" />
                <h3 className="text-sm font-medium text-slate-300">Goals</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {state.goals.map(g => (
                  <span key={g.type} className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-sm">
                    {g.type.replace(/_/g, ' ')} ({g.priority})
                  </span>
                ))}
              </div>
              {state.priorityMuscles.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-slate-500 mb-1">Priority Muscles:</p>
                  <div className="flex flex-wrap gap-1">
                    {state.priorityMuscles.map((m, i) => (
                      <span key={m} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs">
                        {i + 1}. {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Training History */}
          {state.trainingHistory && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Edit size={18} className="text-emerald-400" />
                <h3 className="text-sm font-medium text-slate-300">Training Level</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-slate-500">Level</p>
                  <p className="text-white capitalize">{state.trainingHistory.level}</p>
                </div>
                <div>
                  <p className="text-slate-500">Experience</p>
                  <p className="text-white">{state.trainingHistory.yearsOfExperience} years</p>
                </div>
                <div>
                  <p className="text-slate-500">Sessions/Week</p>
                  <p className="text-white">{state.trainingHistory.currentSessionsPerWeek}</p>
                </div>
                <div>
                  <p className="text-slate-500">Avg Duration</p>
                  <p className="text-white">{state.trainingHistory.averageSessionMinutes} min</p>
                </div>
              </div>
            </div>
          )}

          {/* Equipment */}
          {state.equipment.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Wrench size={18} className="text-amber-400" />
                <h3 className="text-sm font-medium text-slate-300">Equipment</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {state.equipment.map(e => (
                  <span key={e.type} className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs">
                    {e.type.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Schedule */}
          {state.schedule && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={18} className="text-cyan-400" />
                <h3 className="text-sm font-medium text-slate-300">Schedule</h3>
              </div>
              <p className="text-white text-sm mb-2">{state.schedule.daysPerWeek} days/week • {state.schedule.sessionDurationMinutes} min/session</p>
              <div className="flex flex-wrap gap-1">
                {state.schedule.availableDays.map(d => (
                  <span key={d} className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-xs">{d}</span>
                ))}
              </div>
            </div>
          )}

          {/* Limitations */}
          {state.limitations?.hasLimitation && (
            <div className="bg-slate-900 border border-amber-500/20 rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={18} className="text-amber-400" />
                <h3 className="text-sm font-medium text-slate-300">Limitations</h3>
              </div>
              <p className="text-slate-400 text-sm">{state.limitations.location} - {state.limitations.type}</p>
              {state.limitations.forbiddenExercises.length > 0 && (
                <p className="text-slate-500 text-xs mt-2">Forbidden: {state.limitations.forbiddenExercises.join(', ')}</p>
              )}
            </div>
          )}

          {/* Reset */}
          <button onClick={handleReset}
            className="w-full mt-4 py-3 rounded-xl border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2">
            <LogOut size={16} /> Reset All Data
          </button>
        </motion.div>
      </div>
    </div>
  );
}
