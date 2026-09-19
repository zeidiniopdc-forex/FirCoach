import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, UserProfile, TrainingGoal, MuscleGroup, TrainingHistory, Limitation, Equipment, Schedule, Preferences, NutritionInfo, WorkoutProgram, WorkoutSession, PromptHistory, AppSettings, ExerciseLibraryItem } from '../types';
import { loadState, saveState } from '../utils/storage';

type Action =
  | { type: 'SET_PROFILE'; payload: UserProfile }
  | { type: 'SET_GOALS'; payload: TrainingGoal[] }
  | { type: 'SET_PRIORITY_MUSCLES'; payload: MuscleGroup[] }
  | { type: 'SET_TRAINING_HISTORY'; payload: TrainingHistory }
  | { type: 'SET_LIMITATIONS'; payload: Limitation }
  | { type: 'SET_EQUIPMENT'; payload: Equipment[] }
  | { type: 'SET_SCHEDULE'; payload: Schedule }
  | { type: 'SET_PREFERENCES'; payload: Preferences }
  | { type: 'SET_NUTRITION'; payload: NutritionInfo }
  | { type: 'ADD_PROGRAM'; payload: WorkoutProgram }
  | { type: 'SET_ACTIVE_PROGRAM'; payload: string }
  | { type: 'REMOVE_PROGRAM'; payload: string }
  | { type: 'ADD_SESSION'; payload: WorkoutSession }
  | { type: 'ADD_PROMPT'; payload: PromptHistory }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'ADD_CUSTOM_EXERCISE'; payload: ExerciseLibraryItem }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'RESET_APP' }
  | { type: 'LOAD_STATE'; payload: AppState };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    case 'SET_GOALS':
      return { ...state, goals: action.payload };
    case 'SET_PRIORITY_MUSCLES':
      return { ...state, priorityMuscles: action.payload };
    case 'SET_TRAINING_HISTORY':
      return { ...state, trainingHistory: action.payload };
    case 'SET_LIMITATIONS':
      return { ...state, limitations: action.payload };
    case 'SET_EQUIPMENT':
      return { ...state, equipment: action.payload };
    case 'SET_SCHEDULE':
      return { ...state, schedule: action.payload };
    case 'SET_PREFERENCES':
      return { ...state, preferences: action.payload };
    case 'SET_NUTRITION':
      return { ...state, nutrition: action.payload };
    case 'ADD_PROGRAM':
      return { ...state, programs: [...state.programs, action.payload] };
    case 'SET_ACTIVE_PROGRAM':
      return { ...state, activeProgramId: action.payload };
    case 'REMOVE_PROGRAM':
      return {
        ...state,
        programs: state.programs.filter(p => p.program.id !== action.payload),
        activeProgramId: state.activeProgramId === action.payload ? null : state.activeProgramId
      };
    case 'ADD_SESSION':
      return { ...state, sessions: [...state.sessions, action.payload] };
    case 'ADD_PROMPT':
      return { ...state, promptHistory: [...state.promptHistory, action.payload] };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'ADD_CUSTOM_EXERCISE':
      return { ...state, customExercises: [...state.customExercises, action.payload] };
    case 'COMPLETE_ONBOARDING':
      return { ...state, settings: { ...state.settings, onboardingComplete: true } };
    case 'RESET_APP':
      return {
        ...state,
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
        customExercises: [],
        settings: { ...state.settings, onboardingComplete: false }
      };
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  isDark: boolean;
  isRTL: boolean;
  t: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    workout: 'Workout',
    programs: 'Programs',
    progress: 'Progress',
    profile: 'Profile',
    settings: 'Settings',
    today_workout: "Today's Workout",
    start_workout: 'Start Workout',
    complete_set: 'Complete Set',
    finish_workout: 'Finish Workout',
    rest_timer: 'Rest Timer',
    history: 'History',
    exercises: 'Exercises',
    volume: 'Volume',
    streak: 'Streak',
    personal_records: 'Personal Records',
    no_workout: 'No workout scheduled for today',
    get_started: 'Get Started',
    generate_prompt: 'Generate Prompt',
    import_program: 'Import Program',
    copy: 'Copy',
    share: 'Share',
    save: 'Save',
    next: 'Next',
    back: 'Back',
    skip: 'Skip',
    done: 'Done',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search...',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    welcome: 'Welcome',
    good_morning: 'Good Morning',
    good_afternoon: 'Good Afternoon',
    good_evening: 'Good Evening',
  },
  fa: {
    dashboard: 'داشبورد',
    workout: 'تمرین',
    programs: 'برنامه‌ها',
    progress: 'پیشرفت',
    profile: 'پروفایل',
    settings: 'تنظیمات',
    today_workout: 'تمرین امروز',
    start_workout: 'شروع تمرین',
    complete_set: 'تکمیل ست',
    finish_workout: 'پایان تمرین',
    rest_timer: 'تایمر استراحت',
    history: 'تاریخچه',
    exercises: 'حرکات',
    volume: 'حجم',
    streak: 'پیوستگی',
    personal_records: 'رکوردهای شخصی',
    no_workout: 'امروز تمرینی برنامه‌ریزی نشده',
    get_started: 'شروع کنید',
    generate_prompt: 'تولید پرامپت',
    import_program: 'وارد کردن برنامه',
    copy: 'کپی',
    share: 'اشتراک',
    save: 'ذخیره',
    next: 'بعدی',
    back: 'قبلی',
    skip: 'رد کردن',
    done: 'انجام شد',
    cancel: 'لغو',
    delete: 'حذف',
    edit: 'ویرایش',
    search: 'جستجو...',
    loading: 'در حال بارگذاری...',
    error: 'خطا',
    success: 'موفق',
    welcome: 'خوش آمدید',
    good_morning: 'صبح بخیر',
    good_afternoon: 'عصر بخیر',
    good_evening: 'شب بخیر',
  }
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const isDark = state.settings.theme === 'dark';
  const isRTL = state.settings.language === 'fa';

  const t = (key: string): string => {
    return translations[state.settings.language]?.[key] || key;
  };

  return (
    <AppContext.Provider value={{ state, dispatch, isDark, isRTL, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
