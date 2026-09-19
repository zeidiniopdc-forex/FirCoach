import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { calculateWeeklyVolume, calculateMuscleVolume, findPersonalRecords, calculateStreak, formatVolume } from '../utils/calculations';
import { TrendingUp, Trophy, Flame, Target, Calendar, BarChart3 } from 'lucide-react';

type TimeRange = '7' | '30' | '90' | '180' | '365';

export default function Progress() {
  const { state } = useApp();
  const [timeRange, setTimeRange] = useState<TimeRange>('30');
  const [activeTab, setActiveTab] = useState<'overview' | 'volume' | 'muscles' | 'records'>('overview');

  const filteredSessions = state.sessions.filter(s => {
    const daysAgo = parseInt(timeRange);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysAgo);
    return new Date(s.date) >= cutoff;
  });

  const weeklyVolume = calculateWeeklyVolume(state.sessions, Math.ceil(parseInt(timeRange) / 7));
  const muscleVolumes = calculateMuscleVolume(filteredSessions);
  const personalRecords = findPersonalRecords(state.sessions);
  const streak = calculateStreak(state.sessions);

  const totalVolume = filteredSessions.reduce((t, s) => t + s.totalVolume, 0);
  const totalSets = filteredSessions.reduce((t, s) => t + s.totalSets, 0);
  const totalReps = filteredSessions.reduce((t, s) => t + s.totalReps, 0);
  const avgDuration = filteredSessions.length > 0 ? Math.round(filteredSessions.reduce((t, s) => t + (s.duration || 0), 0) / filteredSessions.length) : 0;

  const volumeChartData = filteredSessions.slice(-20).map(s => ({
    date: new Date(s.date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    volume: s.totalVolume,
    sets: s.totalSets
  }));

  const muscleChartData = Array.from(muscleVolumes.entries()).map(([muscle, sets]) => ({
    muscle,
    sets
  })).sort((a, b) => b.sets - a.sets);

  const frequencyData = weeklyVolume.map(w => ({
    week: w.week,
    volume: w.volume
  }));

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      <div className="max-w-lg mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-white mb-6">Progress</h1>

          {/* Time Range Selector */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[{ value: '7', label: '7D' }, { value: '30', label: '30D' }, { value: '90', label: '90D' }, { value: '180', label: '6M' }, { value: '365', label: '1Y' }].map(r => (
              <button key={r.value} onClick={() => setTimeRange(r.value as TimeRange)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  timeRange === r.value ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}>
                {r.label}
              </button>
            ))}
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
              <TrendingUp size={18} className="text-indigo-400 mb-1" />
              <p className="text-xl font-bold text-white">{formatVolume(totalVolume)}</p>
              <p className="text-xs text-slate-400">Total Volume</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
              <BarChart3 size={18} className="text-emerald-400 mb-1" />
              <p className="text-xl font-bold text-white">{totalSets}</p>
              <p className="text-xs text-slate-400">Total Sets</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <Flame size={18} className="text-amber-400 mb-1" />
              <p className="text-xl font-bold text-white">{streak}</p>
              <p className="text-xs text-slate-400">Day Streak</p>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
              <Calendar size={18} className="text-rose-400 mb-1" />
              <p className="text-xl font-bold text-white">{avgDuration}m</p>
              <p className="text-xs text-slate-400">Avg Duration</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-4 bg-slate-900 rounded-xl p-1">
            {[
              { id: 'overview', label: 'Volume', icon: TrendingUp },
              { id: 'muscles', label: 'Muscles', icon: Target },
              { id: 'records', label: 'PRs', icon: Trophy },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}>
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </div>

          {/* Charts */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Volume Chart */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <h3 className="text-sm font-medium text-slate-400 mb-4">Training Volume Over Time</h3>
                {volumeChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={volumeChartData}>
                      <defs>
                        <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} labelStyle={{ color: '#94a3b8' }} />
                      <Area type="monotone" dataKey="volume" stroke="#6366f1" fill="url(#volumeGradient)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-slate-500 text-sm text-center py-8">No data yet. Complete workouts to see your progress.</p>
                )}
              </div>

              {/* Weekly Frequency */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <h3 className="text-sm font-medium text-slate-400 mb-4">Weekly Volume</h3>
                {frequencyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={frequencyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 10 }} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                      <Bar dataKey="volume" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-slate-500 text-sm text-center py-8">No data yet.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'muscles' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <h3 className="text-sm font-medium text-slate-400 mb-4">Muscle Volume (Sets)</h3>
              {muscleChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={muscleChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} />
                    <YAxis dataKey="muscle" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={80} />
                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                    <Bar dataKey="sets" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-slate-500 text-sm text-center py-8">No data yet.</p>
              )}
            </div>
          )}

          {activeTab === 'records' && (
            <div className="space-y-3">
              {personalRecords.length > 0 ? personalRecords.map((pr, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{pr.exercise}</p>
                    <p className="text-slate-400 text-sm">{new Date(pr.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-400 font-bold">{pr.weight} kg</p>
                    <p className="text-slate-400 text-xs">Est. 1RM: {pr.estimated1RM} kg</p>
                  </div>
                </div>
              )) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
                  <Trophy size={40} className="text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">No personal records yet.</p>
                  <p className="text-slate-500 text-xs mt-1">Complete workouts to track your PRs!</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
