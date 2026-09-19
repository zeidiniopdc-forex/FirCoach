// Core Types for Workout App

export interface UserProfile {
  name: string;
  age: number;
  sex: 'male' | 'female' | 'other';
  heightCm: number;
  weightKg: number;
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lb';
  bodyMeasurements?: BodyMeasurements;
}

export interface BodyMeasurements {
  waist?: number;
  chest?: number;
  hips?: number;
  neck?: number;
  arm?: number;
  thigh?: number;
}

export type GoalType = 
  | 'muscle_hypertrophy'
  | 'strength'
  | 'fat_loss'
  | 'body_recomposition'
  | 'general_fitness'
  | 'endurance'
  | 'athletic_performance'
  | 'improve_weak_points'
  | 'maintain_muscle'
  | 'custom';

export interface TrainingGoal {
  type: GoalType;
  priority: 'primary' | 'secondary' | 'tertiary';
  customName?: string;
}

export type MuscleGroup = 
  | 'Chest' | 'Back' | 'Shoulders' | 'Biceps' | 'Triceps' 
  | 'Forearms' | 'Quads' | 'Hamstrings' | 'Glutes' | 'Calves' 
  | 'Abs' | 'Traps' | 'Full Body';

export interface TrainingHistory {
  yearsOfExperience: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  currentSessionsPerWeek: number;
  averageSessionMinutes: number;
  bodybuildingExperience: string;
  otherSportsExperience: string;
  records?: PersonalRecord[];
}

export interface PersonalRecord {
  exercise: string;
  weight: number;
  reps: number;
  estimated1RM: number;
  date: string;
}

export interface Limitation {
  id: string;
  hasLimitation: boolean;
  location?: string;
  type?: string;
  forbiddenExercises: string[];
  avoidExercises: string[];
  preferredExercises: string[];
  cautionExercises: string[];
  notes: string;
}

export type EquipmentType = 
  | 'full_gym' | 'dumbbells' | 'barbells' | 'machines' | 'cable'
  | 'smith_machine' | 'bench' | 'rack' | 'resistance_bands'
  | 'pull_up_bar' | 'home_gym' | 'bodyweight' | 'custom';

export interface Equipment {
  type: EquipmentType;
  customName?: string;
}

export interface Schedule {
  daysPerWeek: number;
  availableDays: string[];
  sessionDurationMinutes: number;
  preferredTime?: string;
  flexible: boolean;
}

export interface Preferences {
  volume: 'low' | 'moderate' | 'high' | 'very_high';
  intensity: 'low' | 'moderate' | 'high' | 'very_high';
  preferredSets: number;
  repRange: { min: number; max: number };
  restSeconds: number;
  techniques: string[];
  preferredExercises: string[];
  avoidExercises: string[];
}

export interface NutritionInfo {
  calories?: number;
  protein?: number;
  diet?: string;
  mealsPerDay?: number;
  supplements?: string[];
}

export interface WorkoutExercise {
  exercise_id: string;
  name: string;
  muscle_group: string;
  secondary_muscles: string[];
  order: number;
  sets: number;
  reps: { min: number; max: number };
  target_weight?: number | null;
  rir?: number | null;
  rpe?: number | null;
  rest_seconds: number;
  tempo?: string | null;
  equipment: string;
  notes: string;
  superset_group?: string | null;
  warmup: boolean;
}

export interface WorkoutDay {
  day_id: string;
  name: string;
  weekday: string;
  focus: string[];
  exercises: WorkoutExercise[];
}

export interface WorkoutProgram {
  schema_version: string;
  program: {
    id: string;
    name: string;
    description: string;
    goal: string[];
    duration_weeks: number;
    days_per_week: number;
  };
  user_context: {
    age: number;
    sex: string;
    height_cm: number;
    weight_kg: number;
    experience_level: string;
    training_experience_years: number;
  };
  days: WorkoutDay[];
}

export interface WorkoutSetLog {
  setId: string;
  weight: number;
  reps: number;
  rir?: number;
  rpe?: number;
  completed: boolean;
  notes?: string;
  timestamp: string;
}

export interface ExerciseLog {
  exerciseId: string;
  exerciseName: string;
  muscleGroup: string;
  sets: WorkoutSetLog[];
  completed: boolean;
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  programId: string;
  dayId: string;
  dayName: string;
  date: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  exercises: ExerciseLog[];
  completed: boolean;
  notes?: string;
  totalVolume: number;
  totalSets: number;
  totalReps: number;
}

export interface PromptHistory {
  id: string;
  date: string;
  prompt: string;
  version: string;
}

export interface AppSettings {
  theme: 'dark' | 'light';
  language: 'en' | 'fa';
  exerciseNameLanguage: 'en' | 'fa' | 'both';
  notifications: {
    workoutReminder: boolean;
    restTimer: boolean;
    missedWorkout: boolean;
    weeklyProgress: boolean;
  };
  weightUnit: 'kg' | 'lb';
  onboardingComplete: boolean;
}

export interface AppState {
  profile: UserProfile | null;
  goals: TrainingGoal[];
  priorityMuscles: MuscleGroup[];
  trainingHistory: TrainingHistory | null;
  limitations: Limitation | null;
  equipment: Equipment[];
  schedule: Schedule | null;
  preferences: Preferences | null;
  nutrition: NutritionInfo | null;
  programs: WorkoutProgram[];
  activeProgramId: string | null;
  sessions: WorkoutSession[];
  promptHistory: PromptHistory[];
  settings: AppSettings;
  customExercises: ExerciseLibraryItem[];
}

export interface ExerciseLibraryItem {
  id: string;
  name: string;
  nameFa?: string;
  muscle: string;
  secondaryMuscles: string[];
  equipment: string;
  instructions: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'strength' | 'cardio' | 'flexibility' | 'plyometric';
  tags: string[];
}

export interface ValidationError {
  field: string;
  error: string;
  location: string;
  expected?: string;
  received?: string;
  suggestedFix?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: string[];
}
