import React from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Dumbbell, FolderOpen, TrendingUp, User, Sparkles, Upload, History, BookOpen } from 'lucide-react';

import Onboarding from './pages/Onboarding';
import ProfileSetup from './pages/ProfileSetup';
import PromptGenerator from './pages/PromptGenerator';
import ImportProgram from './pages/ImportProgram';
import Dashboard from './pages/Dashboard';
import Workout from './pages/Workout';
import Programs from './pages/Programs';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import HistoryPage from './pages/History';
import ExerciseLibrary from './pages/ExerciseLibrary';
import Settings from './pages/Settings';

function AppContent() {
  const { state, dispatch, isRTL, isDark } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Theme classes helper
  const themeClasses = {
    bg: isDark ? 'bg-slate-950' : 'bg-slate-50',
    text: isDark ? 'text-white' : 'text-slate-900',
    card: isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200',
    input: isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900',
    muted: isDark ? 'text-slate-400' : 'text-slate-600',
  };

  // Set theme on document
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.settings.theme);
  }, [state.settings.theme]);

  // Add session handler
  React.useEffect(() => {
    (window as any).__addSession = (session: any) => {
      dispatch({ type: 'ADD_SESSION', payload: session });
    };
    return () => { delete (window as any).__addSession; };
  }, [dispatch]);

  // Show onboarding if not complete
  if (!state.settings.onboardingComplete) {
    if (!state.profile) {
      return <Onboarding />;
    }
    return <ProfileSetup />;
  }

  const showBottomNav = !['/prompt', '/import', '/setup'].includes(location.pathname);

  return (
    <div 
      className={`min-h-screen ${state.settings.theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/prompt" element={<PromptGenerator />} />
            <Route path="/import" element={<ImportProgram />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/exercises" element={<ExerciseLibrary />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/setup" element={<ProfileSetup />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 z-40">
          <div className="max-w-lg mx-auto flex items-center justify-around py-2">
            <NavItem icon={LayoutDashboard} label="Home" path="/" current={location.pathname} />
            <NavItem icon={Dumbbell} label="Workout" path="/workout" current={location.pathname} />
            <NavItem icon={FolderOpen} label="Programs" path="/programs" current={location.pathname} />
            <NavItem icon={TrendingUp} label="Progress" path="/progress" current={location.pathname} />
            <NavItem icon={User} label="Profile" path="/profile" current={location.pathname} />
          </div>
        </nav>
      )}

      {/* Quick Actions FAB */}
      {showBottomNav && (
        <div className="fixed bottom-20 right-4 z-30 flex flex-col gap-2">
          <button onClick={() => navigate('/prompt')}
            className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:scale-110 transition-transform"
            title="Generate Prompt">
            <Sparkles size={20} className="text-white" />
          </button>
          <button onClick={() => navigate('/import')}
            className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-110 transition-transform"
            title="Import Program">
            <Upload size={20} className="text-white" />
          </button>
          <button onClick={() => navigate('/history')}
            className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            title="History">
            <History size={20} className="text-slate-300" />
          </button>
          <button onClick={() => navigate('/exercises')}
            className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            title="Exercise Library">
            <BookOpen size={20} className="text-slate-300" />
          </button>
        </div>
      )}
    </div>
  );
}

function NavItem({ icon: Icon, label, path, current }: { icon: any; label: string; path: string; current: string }) {
  const navigate = useNavigate();
  const isActive = current === path;

  return (
    <button onClick={() => navigate(path)}
      className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
        isActive ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
      }`}>
      <Icon size={20} />
      <span className="text-[10px] font-medium">{label}</span>
      {isActive && <div className="w-1 h-1 rounded-full bg-indigo-400 mt-0.5" />}
    </button>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </HashRouter>
  );
}
