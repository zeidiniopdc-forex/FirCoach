import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { WorkoutSession, WorkoutSetLog, ExerciseLog } from '../types';
import { Play, Check, CheckCircle, Clock, Timer, Plus, Minus, SkipForward, ChevronDown, ChevronUp, Dumbbell, Flame, Trophy, Zap, X } from 'lucide-react';

export default function Workout() {
  const { state } = useApp();
  const activeProgram = state.programs.find(p => p.program.id === state.activeProgramId);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [restTimer, setRestTimer] = useState<{ active: boolean; seconds: number; total: number } | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentDay = activeProgram?.days[currentDayIndex];

  useEffect(() => {
    if (currentDay && workoutStarted) {
      setExerciseLogs(currentDay.exercises.map(ex => ({
        exerciseId: ex.exercise_id,
        exerciseName: ex.name,
        muscleGroup: ex.muscle_group,
        sets: Array.from({ length: ex.sets }, (_, i) => ({
          setId: `${ex.exercise_id}_set_${i}`,
          weight: ex.target_weight || 0,
          reps: ex.reps.min,
          rir: ex.rir || undefined,
          completed: false,
          timestamp: new Date().toISOString()
        })),
        completed: false
      })));
    }
  }, [currentDay, workoutStarted]);

  useEffect(() => {
    if (restTimer?.active && restTimer.seconds > 0) {
      timerRef.current = setInterval(() => {
        setRestTimer(prev => {
          if (!prev || prev.seconds <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return { ...prev!, active: false, seconds: 0 };
          }
          return { ...prev, seconds: prev.seconds - 1 };
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [restTimer?.active]);

  const startWorkout = () => {
    setWorkoutStarted(true);
    setStartTime(new Date().toISOString());
  };

  const updateSet = (exerciseIdx: number, setIdx: number, field: keyof WorkoutSetLog, value: any) => {
    setExerciseLogs(prev => {
      const newLogs = [...prev];
      const newSets = [...newLogs[exerciseIdx].sets];
      newSets[setIdx] = { ...newSets[setIdx], [field]: value };
      newLogs[exerciseIdx] = { ...newLogs[exerciseIdx], sets: newSets };
      return newLogs;
    });
  };

  const completeSet = (exerciseIdx: number, setIdx: number) => {
    setExerciseLogs(prev => {
      const newLogs = [...prev];
      const newSets = [...newLogs[exerciseIdx].sets];
      newSets[setIdx] = { ...newSets[setIdx], completed: true, timestamp: new Date().toISOString() };
      newLogs[exerciseIdx] = { ...newLogs[exerciseIdx], sets: newSets };
      
      // Check if all sets completed
      if (newSets.every(s => s.completed)) {
        newLogs[exerciseIdx] = { ...newLogs[exerciseIdx], completed: true };
      }
      return newLogs;
    });

    // Start rest timer
    const exercise = currentDay?.exercises[exerciseIdx];
    if (exercise) {
      setRestTimer({ active: true, seconds: exercise.rest_seconds, total: exercise.rest_seconds });
    }
  };

  const startRestTimer = (seconds: number) => {
    setRestTimer({ active: true, seconds, total: seconds });
  };

  const finishWorkout = () => {
    const endTime = new Date().toISOString();
    const totalVolume = exerciseLogs.reduce((total, ex) => {
      return total + ex.sets.filter(s => s.completed).reduce((setTotal, s) => setTotal + (s.weight * s.reps), 0);
    }, 0);
    const totalSets = exerciseLogs.reduce((total, ex) => total + ex.sets.filter(s => s.completed).length, 0);
    const totalReps = exerciseLogs.reduce((total, ex) => total + ex.sets.filter(s => s.completed).reduce((st, s) => st + s.reps, 0), 0);

    const session: WorkoutSession = {
      id: Date.now().toString(),
      programId: activeProgram?.program.id || '',
      dayId: currentDay?.day_id || '',
      dayName: currentDay?.name || '',
      date: new Date().toISOString().split('T')[0],
      startTime: startTime || '',
      endTime,
      duration: startTime ? Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000) : 0,
      exercises: exerciseLogs,
      completed: true,
      totalVolume,
      totalSets,
      totalReps
    };

    // Dispatch will be handled by parent
    (window as any).__addSession?.(session);
    setWorkoutCompleted(true);
  };

  if (!activeProgram) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <Dumbbell size={48} className="text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">No Active Program</h2>
          <p className="text-slate-400">Import a workout program to get started.</p>
        </div>
      </div>
    );
  }

  if (workoutCompleted) {
    const totalVolume = exerciseLogs.reduce((total, ex) => {
      return total + ex.sets.filter(s => s.completed).reduce((setTotal, s) => setTotal + (s.weight * s.reps), 0);
    }, 0);
    const totalSets = exerciseLogs.reduce((total, ex) => total + ex.sets.filter(s => s.completed).length, 0);

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse-ring">
            <Trophy size={40} className="text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Workout Complete! 🎉</h2>
          <p className="text-slate-400 mb-6">Great job! Here's your summary:</p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-slate-800 rounded-xl p-3">
              <p className="text-2xl font-bold text-indigo-400">{totalSets}</p>
              <p className="text-xs text-slate-400">Sets</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-3">
              <p className="text-2xl font-bold text-emerald-400">{(totalVolume / 1000).toFixed(1)}K</p>
              <p className="text-xs text-slate-400">Volume (kg)</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-3">
              <p className="text-2xl font-bold text-amber-400">{exerciseLogs.filter(e => e.completed).length}/{exerciseLogs.length}</p>
              <p className="text-xs text-slate-400">Exercises</p>
            </div>
          </div>
          <button onClick={() => { setWorkoutStarted(false); setWorkoutCompleted(false); setExerciseLogs([]); }}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors">
            Done
          </button>
        </motion.div>
      </div>
    );
  }

  if (!workoutStarted) {
    return (
      <div className="min-h-screen bg-slate-950 pb-24">
        <div className="max-w-lg mx-auto px-4 py-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-2xl p-6 mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">{currentDay?.name}</h1>
              <p className="text-slate-300 text-sm mb-1">{currentDay?.weekday} • Focus: {currentDay?.focus.join(', ')}</p>
              <p className="text-slate-400 text-sm">{currentDay?.exercises.length} exercises • Est. {Math.round(currentDay?.exercises.reduce((t, e) => t + (e.sets * (e.rest_seconds + 60)) / 60, 0) || 0)} min</p>
            </div>

            {/* Day Selector */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {activeProgram.days.map((day, i) => (
                <button key={day.day_id} onClick={() => setCurrentDayIndex(i)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    i === currentDayIndex ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}>
                  {day.name}
                </button>
              ))}
            </div>

            {/* Exercise List */}
            <div className="space-y-3 mb-6">
              {currentDay?.exercises.map((ex, i) => (
                <div key={ex.exercise_id} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{ex.order}. {ex.name}</p>
                      <p className="text-slate-400 text-sm">{ex.muscle_group} • {ex.sets}×{ex.reps.min}-{ex.reps.max} • {ex.rest_seconds}s rest</p>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-lg">{ex.equipment}</span>
                  </div>
                  {ex.notes && <p className="text-slate-500 text-xs mt-2">💡 {ex.notes}</p>}
                </div>
              ))}
            </div>

            <button onClick={startWorkout}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2">
              <Play size={24} /> Start Workout
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      {/* Rest Timer Overlay */}
      <AnimatePresence>
        {restTimer && restTimer.active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 text-center max-w-sm w-full">
              <Timer size={32} className="text-indigo-400 mx-auto mb-4" />
              <p className="text-slate-400 text-sm mb-2">Rest Timer</p>
              <p className="text-6xl font-bold text-white font-mono mb-6">
                {Math.floor(restTimer.seconds / 60)}:{(restTimer.seconds % 60).toString().padStart(2, '0')}
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setRestTimer(prev => prev ? { ...prev, seconds: Math.max(0, prev.seconds - 15) } : null)}
                  className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-slate-700">
                  <Minus size={20} />
                </button>
                <button onClick={() => setRestTimer(prev => prev ? { ...prev, active: false, seconds: 0 } : null)}
                  className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500">
                  Skip
                </button>
                <button onClick={() => setRestTimer(prev => prev ? { ...prev, seconds: prev.seconds + 15 } : null)}
                  className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-slate-700">
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-lg mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">{currentDay?.name}</h1>
            <p className="text-slate-400 text-sm">{exerciseLogs.filter(e => e.completed).length}/{exerciseLogs.length} exercises done</p>
          </div>
          <button onClick={finishWorkout}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 transition-colors">
            Finish
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-slate-800 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${(exerciseLogs.filter(e => e.completed).length / exerciseLogs.length) * 100}%` }} />
        </div>

        {/* Exercises */}
        <div className="space-y-4">
          {exerciseLogs.map((exercise, exIdx) => {
            const programExercise = currentDay?.exercises[exIdx];
            const isExpanded = expandedExercise === exercise.exerciseId;
            
            return (
              <motion.div key={exercise.exerciseId} layout
                className={`bg-slate-900 border rounded-2xl overflow-hidden transition-colors ${
                  exercise.completed ? 'border-emerald-500/30' : 'border-slate-800'
                }`}>
                {/* Exercise Header */}
                <button onClick={() => setExpandedExercise(isExpanded ? null : exercise.exerciseId)}
                  className="w-full p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {exercise.completed && <CheckCircle size={20} className="text-emerald-400" />}
                    <div className="text-left">
                      <p className="text-white font-medium">{exercise.exerciseName}</p>
                      <p className="text-slate-400 text-sm">
                        {programExercise?.sets}×{programExercise?.reps.min}-{programExercise?.reps.max}
                        {programExercise?.rir && ` • RIR ${programExercise.rir}`}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                </button>

                {/* Sets */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden">
                      <div className="px-4 pb-4">
                        {/* Set headers */}
                        <div className="grid grid-cols-5 gap-2 text-xs text-slate-500 mb-2 px-1">
                          <span>Set</span>
                          <span>Weight</span>
                          <span>Reps</span>
                          <span>RIR</span>
                          <span></span>
                        </div>
                        {exercise.sets.map((set, setIdx) => (
                          <div key={set.setId} className={`grid grid-cols-5 gap-2 items-center mb-2 p-2 rounded-lg ${
                            set.completed ? 'bg-emerald-500/10' : 'bg-slate-800/50'
                          }`}>
                            <span className={`text-sm font-medium ${set.completed ? 'text-emerald-400' : 'text-slate-300'}`}>
                              {setIdx + 1}
                            </span>
                            <input type="number" value={set.weight} onChange={e => updateSet(exIdx, setIdx, 'weight', +e.target.value)}
                              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-sm text-white text-center focus:border-indigo-500 focus:outline-none" />
                            <input type="number" value={set.reps} onChange={e => updateSet(exIdx, setIdx, 'reps', +e.target.value)}
                              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-sm text-white text-center focus:border-indigo-500 focus:outline-none" />
                            <input type="number" value={set.rir || ''} onChange={e => updateSet(exIdx, setIdx, 'rir', +e.target.value || undefined)}
                              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-sm text-white text-center focus:border-indigo-500 focus:outline-none" placeholder="-" />
                            <button onClick={() => set.completed ? null : completeSet(exIdx, setIdx)}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                set.completed ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-indigo-600 hover:text-white'
                              }`}>
                              <Check size={14} />
                            </button>
                          </div>
                        ))}

                        {/* Rest timer button */}
                        {programExercise && !exercise.completed && (
                          <button onClick={() => startRestTimer(programExercise.rest_seconds)}
                            className="w-full mt-2 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                            <Clock size={14} /> Rest {programExercise.rest_seconds}s
                          </button>
                        )}

                        {programExercise?.notes && (
                          <p className="text-slate-500 text-xs mt-2">💡 {programExercise.notes}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
