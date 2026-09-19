import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { exerciseLibrary, searchExercises } from '../data/exerciseLibrary';
import { useApp } from '../contexts/AppContext';
import { Search, Filter, Dumbbell, X, Plus } from 'lucide-react';

const muscles = ['All', 'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Quads', 'Hamstrings', 'Glutes', 'Calves', 'Abs'];
const difficulties = ['All', 'beginner', 'intermediate', 'advanced'];

export default function ExerciseLibrary() {
  const { state, dispatch } = useApp();
  const [query, setQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExercise, setNewExercise] = useState({ name: '', muscle: 'Chest', equipment: 'Bodyweight', instructions: '' });

  const filteredExercises = searchExercises(query, {
    muscle: selectedMuscle !== 'All' ? selectedMuscle : undefined,
    difficulty: selectedDifficulty !== 'All' ? selectedDifficulty : undefined,
  });

  const allExercises = [...filteredExercises, ...state.customExercises.filter(ex => {
    const q = query.toLowerCase();
    if (q && !ex.name.toLowerCase().includes(q)) return false;
    if (selectedMuscle !== 'All' && ex.muscle !== selectedMuscle) return false;
    if (selectedDifficulty !== 'All' && ex.difficulty !== selectedDifficulty) return false;
    return true;
  })];

  const selected = allExercises.find(e => e.id === selectedExercise);

  const handleAddExercise = () => {
    if (newExercise.name) {
      dispatch({
        type: 'ADD_CUSTOM_EXERCISE',
        payload: {
          id: `custom_${Date.now()}`,
          name: newExercise.name,
          muscle: newExercise.muscle,
          secondaryMuscles: [],
          equipment: newExercise.equipment,
          instructions: newExercise.instructions,
          difficulty: 'intermediate',
          type: 'strength',
          tags: ['custom']
        }
      });
      setShowAddForm(false);
      setNewExercise({ name: '', muscle: 'Chest', equipment: 'Bodyweight', instructions: '' });
    }
  };

  if (selected) {
    return (
      <div className="min-h-screen bg-slate-950 pb-24">
        <div className="max-w-lg mx-auto px-4 py-6">
          <button onClick={() => setSelectedExercise(null)}
            className="text-indigo-400 text-sm mb-4 hover:text-indigo-300">← Back to Library</button>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
              <h2 className="text-xl font-bold text-white mb-1">{selected.name}</h2>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-xs">{selected.muscle}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs">{selected.equipment}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  selected.difficulty === 'beginner' ? 'bg-emerald-500/10 text-emerald-300' :
                  selected.difficulty === 'intermediate' ? 'bg-amber-500/10 text-amber-300' :
                  'bg-red-500/10 text-red-300'
                }`}>{selected.difficulty}</span>
              </div>
            </div>

            {selected.secondaryMuscles?.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
                <h3 className="text-sm font-medium text-slate-400 mb-2">Secondary Muscles</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.secondaryMuscles.map(m => (
                    <span key={m} className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-sm">{m}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-sm font-medium text-slate-400 mb-2">Instructions</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{selected.instructions}</p>
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
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Exercise Library</h1>
            <button onClick={() => setShowAddForm(!showAddForm)}
              className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-500 transition-colors">
              <Plus size={20} />
            </button>
          </div>

          {/* Add Custom Exercise Form */}
          {showAddForm && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4">
              <h3 className="text-sm font-medium text-white mb-3">Add Custom Exercise</h3>
              <div className="space-y-3">
                <input type="text" placeholder="Exercise name" value={newExercise.name}
                  onChange={e => setNewExercise({...newExercise, name: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none" />
                <div className="grid grid-cols-2 gap-3">
                  <select value={newExercise.muscle} onChange={e => setNewExercise({...newExercise, muscle: e.target.value})}
                    className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none">
                    {muscles.filter(m => m !== 'All').map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select value={newExercise.equipment} onChange={e => setNewExercise({...newExercise, equipment: e.target.value})}
                    className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none">
                    {['Bodyweight', 'Dumbbells', 'Barbell', 'Machine', 'Cable', 'Kettlebell', 'Other'].map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <textarea placeholder="Instructions..." value={newExercise.instructions}
                  onChange={e => setNewExercise({...newExercise, instructions: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none h-20 resize-none" />
                <button onClick={handleAddExercise}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors">
                  Add Exercise
                </button>
              </div>
            </motion.div>
          )}

          {/* Search */}
          <div className="relative mb-4">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search exercises..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-indigo-500 focus:outline-none" />
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {muscles.map(m => (
              <button key={m} onClick={() => setSelectedMuscle(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedMuscle === m ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}>
                {m}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mb-4">
            {difficulties.map(d => (
              <button key={d} onClick={() => setSelectedDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  selectedDifficulty === d ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}>
                {d}
              </button>
            ))}
          </div>

          {/* Exercise List */}
          <div className="space-y-2">
            {allExercises.map(ex => (
              <button key={ex.id} onClick={() => setSelectedExercise(ex.id)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between hover:border-slate-700 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <Dumbbell size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{ex.name}</p>
                    <p className="text-slate-500 text-xs">{ex.muscle} • {ex.equipment}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  ex.difficulty === 'beginner' ? 'bg-emerald-500/10 text-emerald-300' :
                  ex.difficulty === 'intermediate' ? 'bg-amber-500/10 text-amber-300' :
                  'bg-red-500/10 text-red-300'
                }`}>{ex.difficulty}</span>
              </button>
            ))}
          </div>

          {allExercises.length === 0 && (
            <div className="text-center py-8">
              <Dumbbell size={40} className="text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No exercises found</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
