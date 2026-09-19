import { AppState, AppSettings } from '../types';

const STORAGE_KEY = 'fitforge_app_state';

const defaultSettings: AppSettings = {
  theme: 'dark',
  language: 'en',
  exerciseNameLanguage: 'en',
  notifications: {
    workoutReminder: true,
    restTimer: true,
    missedWorkout: false,
    weeklyProgress: true,
  },
  weightUnit: 'kg',
  onboardingComplete: false,
};

const defaultState: AppState = {
  profile: null,
  goals: [],
  priorityMuscles: [],
  trainingHistory: null,
  limitations: null,
  equipment: [],
  schedule: null,
  preferences: null,
  nutrition: null,
  programs: [],
  activeProgramId: null,
  sessions: [],
  promptHistory: [],
  settings: defaultSettings,
  customExercises: [],
};

export function loadState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultState, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  return defaultState;
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

export function exportState(): string {
  const state = loadState();
  return JSON.stringify(state, null, 2);
}

export function importState(json: string): AppState | null {
  try {
    const parsed = JSON.parse(json);
    return { ...defaultState, ...parsed };
  } catch {
    return null;
  }
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY);
}
