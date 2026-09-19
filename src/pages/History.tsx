import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { formatVolume } from '../utils/calculations';
import { Clock, Dumbbell, ChevronRight, Calendar, Flame, ChevronLeft } from 'lucide-react';

export default function History() {
  const { state } = useApp();
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const sortedSessions = [...state.sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];
    
    // Add empty days for the start of the week
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getSessionForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return state.sessions.find(s => s.date === dateStr);
  };

  const selected = state.sessions.find(s => s.id === selectedSession);

  if (selected) {
    return (
      <div className="min-h-screen bg-slate-950 pb-24">
        <div className="max-w-lg mx-auto px-4 py-6">
          <button onClick={() => setSelectedSession(null)}
            className="text-indigo-400 text-sm mb-4 hover:text-indigo-300">← Back to History</button>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-2xl p-5 mb-6">
              <h2 className="text-xl font-bold text-white mb-1">{selected.dayName}</h2>
              <p className="text-slate-300 text-sm">{new Date(selected.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <div className="flex gap-4 mt-3 text-sm text-slate-400">
                <span className="flex items-center gap-1"><Clock size={14} /> {selected.duration} min</span>
                <span className="flex items-center gap-1"><Dumbbell size={14} /> {selected.exercises.length} exercises</span>
                <span className="flex items-center gap-1"><Flame size={14} /> {formatVolume(selected.totalVolume)}</span>
              </div>
            </div>

            <div className="space-y-3">
              {selected.exercises.map((ex, i) => (
                <div key={ex.exerciseId} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">{i + 1}. {ex.exerciseName}</p>
                    <span className="text-xs text-slate-500">{ex.muscleGroup}</span>
                  </div>
                  <div className="space-y-1">
                    {ex.sets.map((set, si) => (
                      <div key={set.setId} className={`flex items-center gap-4 text-sm py-1 px-2 rounded ${
                        set.completed ? 'bg-emerald-500/5' : 'bg-slate-800/30'
                      }`}>
                        <span className={`w-6 text-center ${set.completed ? 'text-emerald-400' : 'text-slate-500'}`}>{si + 1}</span>
                        <span className={`${set.completed ? 'text-white' : 'text-slate-500'}`}>{set.weight} kg</span>
                        <span className={`${set.completed ? 'text-white' : 'text-slate-500'}`}>× {set.reps} reps</span>
                        {set.rir && <span className="text-slate-400">RIR {set.rir}</span>}
                        {set.completed && <span className="text-emerald-400 ml-auto">✓</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      <div className="max-w-lg mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">History</h1>
            <div className="flex gap-1 bg-slate-900 rounded-lg p-1">
              <button onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
                List
              </button>
              <button onClick={() => setViewMode('calendar')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${viewMode === 'calendar' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
                Calendar
              </button>
            </div>
          </div>

          {viewMode === 'calendar' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-800">
                  <ChevronLeft size={18} />
                </button>
                <h3 className="text-white font-medium">
                  {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-800">
                  <ChevronRight size={18} />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                  <div key={d} className="text-center text-xs text-slate-500 py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(calendarMonth).map((day, i) => {
                  if (!day) return <div key={i} />;
                  const session = getSessionForDate(day);
                  const isToday = day.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];
                  return (
                    <button key={i} onClick={() => session && setSelectedSession(session.id)}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs relative transition-colors ${
                        session ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30' :
                        isToday ? 'bg-indigo-500/10 text-indigo-300' : 'text-slate-500'
                      }`}>
                      <span>{day.getDate()}</span>
                      {session && <div className="w-1 h-1 rounded-full bg-emerald-400 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Completed</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-400" /> Today</span>
              </div>
            </div>
          )}

          {sortedSessions.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
              <Calendar size={40} className="text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No workout history yet.</p>
              <p className="text-slate-500 text-xs mt-1">Complete your first workout to see it here!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedSessions.map(session => (
                <button key={session.id} onClick={() => setSelectedSession(session.id)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between hover:border-slate-700 transition-colors text-left">
                  <div>
                    <p className="text-white font-medium">{session.dayName}</p>
                    <p className="text-slate-400 text-sm mt-0.5">
                      {new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <div className="flex gap-3 mt-2 text-xs text-slate-500">
                      <span>{session.duration} min</span>
                      <span>{session.totalSets} sets</span>
                      <span>{formatVolume(session.totalVolume)}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-500" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
