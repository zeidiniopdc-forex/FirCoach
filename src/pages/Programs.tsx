import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { Download, Upload, Trash2, Star, Archive, Copy, MoreVertical, Plus } from 'lucide-react';

export default function Programs() {
  const { state, dispatch } = useApp();
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const handleExport = (programId: string) => {
    const program = state.programs.find(p => p.program.id === programId);
    if (program) {
      const blob = new Blob([JSON.stringify(program, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${program.program.name.replace(/\s+/g, '_')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleActivate = (programId: string) => {
    dispatch({ type: 'SET_ACTIVE_PROGRAM', payload: programId });
    setMenuOpen(null);
  };

  const handleDelete = (programId: string) => {
    if (confirm('Are you sure you want to delete this program?')) {
      dispatch({ type: 'REMOVE_PROGRAM', payload: programId });
    }
    setMenuOpen(null);
  };

  const handleDuplicate = (programId: string) => {
    const program = state.programs.find(p => p.program.id === programId);
    if (program) {
      const newProgram = {
        ...program,
        program: {
          ...program.program,
          id: `${program.program.id}_copy_${Date.now()}`,
          name: `${program.program.name} (Copy)`
        }
      };
      dispatch({ type: 'ADD_PROGRAM', payload: newProgram });
    }
    setMenuOpen(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      <div className="max-w-lg mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Programs</h1>
            <span className="text-sm text-slate-400">{state.programs.length} programs</span>
          </div>

          {state.programs.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
              <Plus size={40} className="text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm mb-2">No programs yet</p>
              <p className="text-slate-500 text-xs">Generate a prompt and import your AI workout program to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {state.programs.map(program => {
                const isActive = program.program.id === state.activeProgramId;
                const sessionsCount = state.sessions.filter(s => s.programId === program.program.id).length;

                return (
                  <div key={program.program.id}
                    className={`bg-slate-900 border rounded-2xl p-4 transition-colors ${
                      isActive ? 'border-indigo-500/50' : 'border-slate-800'
                    }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {isActive && <Star size={14} className="text-amber-400 fill-amber-400" />}
                          <h3 className="text-white font-semibold">{program.program.name}</h3>
                        </div>
                        <p className="text-slate-400 text-sm">{program.program.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                          <span>{program.program.duration_weeks} weeks</span>
                          <span>{program.program.days_per_week} days/week</span>
                          <span>{program.days.reduce((t, d) => t + d.exercises.length, 0)} exercises</span>
                          <span>{sessionsCount} sessions</span>
                        </div>
                        {isActive && (
                          <span className="inline-block mt-2 text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <button onClick={() => setMenuOpen(menuOpen === program.program.id ? null : program.program.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-800">
                          <MoreVertical size={16} />
                        </button>
                        {menuOpen === program.program.id && (
                          <div className="absolute right-0 top-10 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-10 w-40 overflow-hidden">
                            {!isActive && (
                              <button onClick={() => handleActivate(program.program.id)}
                                className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2">
                                <Star size={14} /> Activate
                              </button>
                            )}
                            <button onClick={() => handleExport(program.program.id)}
                              className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2">
                              <Download size={14} /> Export JSON
                            </button>
                            <button onClick={() => handleDuplicate(program.program.id)}
                              className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2">
                              <Copy size={14} /> Duplicate
                            </button>
                            <button onClick={() => handleDelete(program.program.id)}
                              className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-slate-700 flex items-center gap-2">
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
