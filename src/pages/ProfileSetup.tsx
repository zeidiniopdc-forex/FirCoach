import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { UserProfile, TrainingGoal, GoalType, MuscleGroup, TrainingHistory, Limitation, Equipment, EquipmentType, Schedule, Preferences, NutritionInfo } from '../types';
import { User, Target, History, AlertTriangle, Wrench, Calendar, Sliders, Apple, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const allGoals: { type: GoalType; label: string; icon: string }[] = [
  { type: 'muscle_hypertrophy', label: 'Muscle Hypertrophy', icon: '💪' },
  { type: 'strength', label: 'Strength', icon: '🏋️' },
  { type: 'fat_loss', label: 'Fat Loss', icon: '🔥' },
  { type: 'body_recomposition', label: 'Body Recomposition', icon: '⚡' },
  { type: 'general_fitness', label: 'General Fitness', icon: '❤️' },
  { type: 'endurance', label: 'Endurance', icon: '🏃' },
  { type: 'athletic_performance', label: 'Athletic Performance', icon: '🏆' },
  { type: 'improve_weak_points', label: 'Improve Weak Points', icon: '🎯' },
  { type: 'maintain_muscle', label: 'Maintain Muscle', icon: '🛡️' },
  { type: 'custom', label: 'Custom Goal', icon: '✨' },
];

const allMuscles: MuscleGroup[] = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Forearms', 'Quads', 'Hamstrings', 'Glutes', 'Calves', 'Abs', 'Traps'];

const allEquipment: { type: EquipmentType; label: string }[] = [
  { type: 'full_gym', label: 'Full Gym' },
  { type: 'dumbbells', label: 'Dumbbells' },
  { type: 'barbells', label: 'Barbells' },
  { type: 'machines', label: 'Machines' },
  { type: 'cable', label: 'Cable' },
  { type: 'smith_machine', label: 'Smith Machine' },
  { type: 'bench', label: 'Bench' },
  { type: 'rack', label: 'Rack' },
  { type: 'resistance_bands', label: 'Resistance Bands' },
  { type: 'pull_up_bar', label: 'Pull-up Bar' },
  { type: 'home_gym', label: 'Home Gym' },
  { type: 'bodyweight', label: 'Bodyweight' },
];

const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const steps = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'history', label: 'History', icon: History },
  { id: 'limitations', label: 'Limitations', icon: AlertTriangle },
  { id: 'equipment', label: 'Equipment', icon: Wrench },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'preferences', label: 'Preferences', icon: Sliders },
  { id: 'nutrition', label: 'Nutrition', icon: Apple },
];

export default function ProfileSetup() {
  const { state, dispatch } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  // Profile state
  const [profile, setProfile] = useState<UserProfile>(state.profile || {
    name: '', age: 25, sex: 'male', heightCm: 175, weightKg: 75, heightUnit: 'cm', weightUnit: 'kg'
  });

  // Goals state
  const [goals, setGoals] = useState<TrainingGoal[]>(state.goals || []);
  const [priorityMuscles, setPriorityMuscles] = useState<MuscleGroup[]>(state.priorityMuscles || []);

  // History state
  const [trainingHistory, setTrainingHistory] = useState<TrainingHistory>(state.trainingHistory || {
    yearsOfExperience: 1, level: 'intermediate', currentSessionsPerWeek: 4, averageSessionMinutes: 60,
    bodybuildingExperience: '', otherSportsExperience: ''
  });

  // Limitations state
  const [limitations, setLimitations] = useState<Limitation>(state.limitations || {
    id: '1', hasLimitation: false, forbiddenExercises: [], avoidExercises: [], preferredExercises: [], cautionExercises: [], notes: ''
  });

  // Equipment state
  const [equipment, setEquipment] = useState<Equipment[]>(state.equipment || []);

  // Schedule state
  const [schedule, setSchedule] = useState<Schedule>(state.schedule || {
    daysPerWeek: 4, availableDays: ['Saturday', 'Sunday', 'Tuesday', 'Wednesday'],
    sessionDurationMinutes: 60, flexible: true
  });

  // Preferences state
  const [preferences, setPreferences] = useState<Preferences>(state.preferences || {
    volume: 'moderate', intensity: 'moderate', preferredSets: 3,
    repRange: { min: 8, max: 12 }, restSeconds: 90, techniques: [],
    preferredExercises: [], avoidExercises: []
  });

  // Nutrition state
  const [nutrition, setNutrition] = useState<NutritionInfo>(state.nutrition || {});

  const handleNext = () => {
    // Save current step data
    saveCurrentStep();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    saveCurrentStep();
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const saveCurrentStep = () => {
    switch (currentStep) {
      case 0: dispatch({ type: 'SET_PROFILE', payload: profile }); break;
      case 1: dispatch({ type: 'SET_GOALS', payload: goals }); dispatch({ type: 'SET_PRIORITY_MUSCLES', payload: priorityMuscles }); break;
      case 2: dispatch({ type: 'SET_TRAINING_HISTORY', payload: trainingHistory }); break;
      case 3: dispatch({ type: 'SET_LIMITATIONS', payload: limitations }); break;
      case 4: dispatch({ type: 'SET_EQUIPMENT', payload: equipment }); break;
      case 5: dispatch({ type: 'SET_SCHEDULE', payload: schedule }); break;
      case 6: dispatch({ type: 'SET_PREFERENCES', payload: preferences }); break;
      case 7: dispatch({ type: 'SET_NUTRITION', payload: nutrition }); break;
    }
  };

  const handleFinish = () => {
    saveCurrentStep();
    dispatch({ type: 'COMPLETE_ONBOARDING' });
  };

  const toggleGoal = (type: GoalType) => {
    const existing = goals.find(g => g.type === type);
    if (existing) {
      setGoals(goals.filter(g => g.type !== type));
    } else {
      const priority = goals.length === 0 ? 'primary' : goals.length === 1 ? 'secondary' : 'tertiary';
      setGoals([...goals, { type, priority }]);
    }
  };

  const toggleMuscle = (muscle: MuscleGroup) => {
    if (priorityMuscles.includes(muscle)) {
      setPriorityMuscles(priorityMuscles.filter(m => m !== muscle));
    } else {
      setPriorityMuscles([...priorityMuscles, muscle]);
    }
  };

  const toggleEquipment = (type: EquipmentType) => {
    if (equipment.find(e => e.type === type)) {
      setEquipment(equipment.filter(e => e.type !== type));
    } else {
      setEquipment([...equipment, { type }]);
    }
  };

  const toggleDay = (day: string) => {
    if (schedule.availableDays.includes(day)) {
      setSchedule({ ...schedule, availableDays: schedule.availableDays.filter(d => d !== day), daysPerWeek: schedule.daysPerWeek - 1 });
    } else {
      setSchedule({ ...schedule, availableDays: [...schedule.availableDays, day], daysPerWeek: schedule.daysPerWeek + 1 });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm text-slate-400 mb-1 block">Name</label>
              <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Age</label>
              <input type="number" value={profile.age} onChange={e => setProfile({...profile, age: +e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Sex</label>
              <select value={profile.sex} onChange={e => setProfile({...profile, sex: e.target.value as any})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Height (cm)</label>
              <input type="number" value={profile.heightCm} onChange={e => setProfile({...profile, heightCm: +e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Weight (kg)</label>
              <input type="number" value={profile.weightKg} onChange={e => setProfile({...profile, weightKg: +e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
          </div>
        </div>
      );

      case 1: return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-2">Training Goals</h2>
          <p className="text-slate-400 text-sm mb-4">Select one or more goals. First selected = Primary.</p>
          <div className="grid grid-cols-2 gap-3">
            {allGoals.map(g => (
              <button key={g.type} onClick={() => toggleGoal(g.type)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  goals.find(gl => gl.type === g.type)
                    ? 'border-indigo-500 bg-indigo-500/10 text-white'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                }`}>
                <span className="text-lg mr-2">{g.icon}</span>
                <span className="text-sm font-medium">{g.label}</span>
                {goals.find(gl => gl.type === g.type) && (
                  <span className="block text-xs text-indigo-400 mt-1">
                    {goals.find(gl => gl.type === g.type)?.priority}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-3">Priority Muscles</h3>
            <p className="text-slate-400 text-sm mb-3">Select in order of priority</p>
            <div className="flex flex-wrap gap-2">
              {allMuscles.map(m => (
                <button key={m} onClick={() => toggleMuscle(m)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    priorityMuscles.includes(m)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}>
                  {priorityMuscles.includes(m) ? `${priorityMuscles.indexOf(m) + 1}. ` : ''}{m}
                </button>
              ))}
            </div>
          </div>
        </div>
      );

      case 2: return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Training History</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Experience Level</label>
              <select value={trainingHistory.level} onChange={e => setTrainingHistory({...trainingHistory, level: e.target.value as any})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Years of Experience</label>
              <input type="number" value={trainingHistory.yearsOfExperience} onChange={e => setTrainingHistory({...trainingHistory, yearsOfExperience: +e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Sessions/Week</label>
              <input type="number" value={trainingHistory.currentSessionsPerWeek} onChange={e => setTrainingHistory({...trainingHistory, currentSessionsPerWeek: +e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Avg Session (min)</label>
              <input type="number" value={trainingHistory.averageSessionMinutes} onChange={e => setTrainingHistory({...trainingHistory, averageSessionMinutes: +e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
            <div className="col-span-2">
              <label className="text-sm text-slate-400 mb-1 block">Bodybuilding Experience</label>
              <textarea value={trainingHistory.bodybuildingExperience} onChange={e => setTrainingHistory({...trainingHistory, bodybuildingExperience: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none h-20 resize-none" placeholder="Describe your training background..." />
            </div>
            <div className="col-span-2">
              <label className="text-sm text-slate-400 mb-1 block">Other Sports Experience</label>
              <textarea value={trainingHistory.otherSportsExperience} onChange={e => setTrainingHistory({...trainingHistory, otherSportsExperience: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none h-20 resize-none" placeholder="Any other sports..." />
            </div>
          </div>
        </div>
      );

      case 3: return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Limitations & Injuries</h2>
          <div className="flex items-center gap-4 mb-4">
            <label className="text-slate-300">Do you have any limitations or injuries?</label>
            <button onClick={() => setLimitations({...limitations, hasLimitation: !limitations.hasLimitation})}
              className={`w-14 h-8 rounded-full transition-colors relative ${limitations.hasLimitation ? 'bg-indigo-600' : 'bg-slate-700'}`}>
              <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${limitations.hasLimitation ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
          {limitations.hasLimitation && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Location of limitation</label>
                <input type="text" value={limitations.location || ''} onChange={e => setLimitations({...limitations, location: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" placeholder="e.g., Lower back, Right knee..." />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Type of limitation</label>
                <input type="text" value={limitations.type || ''} onChange={e => setLimitations({...limitations, type: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" placeholder="e.g., Pain, Surgery, Instability..." />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Forbidden Exercises (comma separated)</label>
                <input type="text" value={limitations.forbiddenExercises.join(', ')} onChange={e => setLimitations({...limitations, forbiddenExercises: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" placeholder="e.g., Deadlift, Squat..." />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Additional Notes</label>
                <textarea value={limitations.notes} onChange={e => setLimitations({...limitations, notes: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none h-24 resize-none" placeholder="Any additional information about your limitations..." />
              </div>
            </div>
          )}
        </div>
      );

      case 4: return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Available Equipment</h2>
          <p className="text-slate-400 text-sm mb-4">Select all equipment you have access to</p>
          <div className="grid grid-cols-2 gap-3">
            {allEquipment.map(eq => (
              <button key={eq.type} onClick={() => toggleEquipment(eq.type)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  equipment.find(e => e.type === eq.type)
                    ? 'border-indigo-500 bg-indigo-500/10 text-white'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                }`}>
                <span className="text-sm font-medium">{eq.label}</span>
                {equipment.find(e => e.type === eq.type) && <Check size={16} className="text-indigo-400 float-right mt-0.5" />}
              </button>
            ))}
          </div>
        </div>
      );

      case 5: return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Training Schedule</h2>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Session Duration (minutes)</label>
            <input type="number" value={schedule.sessionDurationMinutes} onChange={e => setSchedule({...schedule, sessionDurationMinutes: +e.target.value})}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" />
          </div>
          <div className="mt-4">
            <label className="text-sm text-slate-400 mb-3 block">Available Days ({schedule.availableDays.length} selected)</label>
            <div className="grid grid-cols-2 gap-2">
              {daysOfWeek.map(day => (
                <button key={day} onClick={() => toggleDay(day)}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    schedule.availableDays.includes(day)
                      ? 'border-indigo-500 bg-indigo-500/10 text-white'
                      : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'
                  }`}>
                  {day}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <label className="text-slate-300 text-sm">Flexible schedule?</label>
            <button onClick={() => setSchedule({...schedule, flexible: !schedule.flexible})}
              className={`w-14 h-8 rounded-full transition-colors relative ${schedule.flexible ? 'bg-indigo-600' : 'bg-slate-700'}`}>
              <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${schedule.flexible ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        </div>
      );

      case 6: return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Training Preferences</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Volume</label>
              <select value={preferences.volume} onChange={e => setPreferences({...preferences, volume: e.target.value as any})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none">
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
                <option value="very_high">Very High</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Intensity</label>
              <select value={preferences.intensity} onChange={e => setPreferences({...preferences, intensity: e.target.value as any})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none">
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
                <option value="very_high">Very High</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Preferred Sets</label>
              <input type="number" value={preferences.preferredSets} onChange={e => setPreferences({...preferences, preferredSets: +e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Rest (seconds)</label>
              <input type="number" value={preferences.restSeconds} onChange={e => setPreferences({...preferences, restSeconds: +e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Rep Range (min)</label>
              <input type="number" value={preferences.repRange.min} onChange={e => setPreferences({...preferences, repRange: {...preferences.repRange, min: +e.target.value}})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Rep Range (max)</label>
              <input type="number" value={preferences.repRange.max} onChange={e => setPreferences({...preferences, repRange: {...preferences.repRange, max: +e.target.value}})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm text-slate-400 mb-2 block">Advanced Techniques</label>
            <div className="flex flex-wrap gap-2">
              {['Superset', 'Drop Set', 'Rest-Pause', 'Giant Set', 'Failure Training'].map(tech => (
                <button key={tech} onClick={() => {
                  if (preferences.techniques.includes(tech)) {
                    setPreferences({...preferences, techniques: preferences.techniques.filter(t => t !== tech)});
                  } else {
                    setPreferences({...preferences, techniques: [...preferences.techniques, tech]});
                  }
                }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    preferences.techniques.includes(tech)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}>{tech}</button>
              ))}
            </div>
          </div>
        </div>
      );

      case 7: return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Nutrition (Optional)</h2>
          <p className="text-slate-400 text-sm mb-4">This info will be included in the prompt as context only.</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Daily Calories</label>
              <input type="number" value={nutrition.calories || ''} onChange={e => setNutrition({...nutrition, calories: +e.target.value || undefined})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" placeholder="e.g., 2500" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Protein (g)</label>
              <input type="number" value={nutrition.protein || ''} onChange={e => setNutrition({...nutrition, protein: +e.target.value || undefined})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" placeholder="e.g., 180" />
            </div>
            <div className="col-span-2">
              <label className="text-sm text-slate-400 mb-1 block">Diet Type</label>
              <input type="text" value={nutrition.diet || ''} onChange={e => setNutrition({...nutrition, diet: e.target.value || undefined})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" placeholder="e.g., Balanced, Keto, Vegetarian..." />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Meals/Day</label>
              <input type="number" value={nutrition.mealsPerDay || ''} onChange={e => setNutrition({...nutrition, mealsPerDay: +e.target.value || undefined})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" placeholder="e.g., 4" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Supplements</label>
              <input type="text" value={nutrition.supplements?.join(', ') || ''} onChange={e => setNutrition({...nutrition, supplements: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none" placeholder="e.g., Creatine, Whey..." />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      {/* Progress bar */}
      <div className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur-sm px-4 py-3 border-b border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm font-medium text-indigo-400">{steps[currentStep].label}</span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-sm border-t border-slate-800 px-4 py-4">
        <div className="max-w-lg mx-auto flex gap-3">
          {currentStep > 0 && (
            <button onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors">
              <ChevronLeft size={18} /> Back
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors">
              Next <ChevronRight size={18} />
            </button>
          ) : (
            <button onClick={handleFinish}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all">
              <Check size={18} /> Complete Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
