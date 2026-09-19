import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { Moon, Sun, Globe, Bell, Download, Upload, Shield } from 'lucide-react';

export default function Settings() {
  const { state, dispatch } = useApp();

  const handleExportData = () => {
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitforge_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            dispatch({ type: 'LOAD_STATE', payload: { ...state, ...data } });
          } catch {
            alert('Invalid backup file');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      <div className="max-w-lg mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

          {/* Appearance */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              {state.settings.theme === 'dark' ? <Moon size={20} className="text-indigo-400" /> : <Sun size={20} className="text-amber-400" />}
              <h3 className="text-sm font-medium text-slate-300">Appearance</h3>
            </div>
            <div className="flex gap-2">
              <button onClick={() => dispatch({ type: 'UPDATE_SETTINGS', payload: { theme: 'dark' } })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  state.settings.theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                🌙 Dark
              </button>
              <button onClick={() => dispatch({ type: 'UPDATE_SETTINGS', payload: { theme: 'light' } })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  state.settings.theme === 'light' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                ☀️ Light
              </button>
            </div>
          </div>

          {/* Language */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Globe size={20} className="text-emerald-400" />
              <h3 className="text-sm font-medium text-slate-300">Language</h3>
            </div>
            <div className="flex gap-2">
              <button onClick={() => dispatch({ type: 'UPDATE_SETTINGS', payload: { language: 'en' } })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  state.settings.language === 'en' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                English
              </button>
              <button onClick={() => dispatch({ type: 'UPDATE_SETTINGS', payload: { language: 'fa' } })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  state.settings.language === 'fa' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                فارسی
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Bell size={20} className="text-amber-400" />
              <h3 className="text-sm font-medium text-slate-300">Notifications</h3>
            </div>
            <div className="space-y-3">
              {Object.entries(state.settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <button
                    onClick={() => dispatch({
                      type: 'UPDATE_SETTINGS',
                      payload: { notifications: { ...state.settings.notifications, [key]: !value } }
                    })}
                    className={`w-12 h-7 rounded-full transition-colors relative ${value ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${value ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Weight Unit */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={20} className="text-cyan-400" />
              <h3 className="text-sm font-medium text-slate-300">Weight Unit</h3>
            </div>
            <div className="flex gap-2">
              <button onClick={() => dispatch({ type: 'UPDATE_SETTINGS', payload: { weightUnit: 'kg' } })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  state.settings.weightUnit === 'kg' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                Kilograms (kg)
              </button>
              <button onClick={() => dispatch({ type: 'UPDATE_SETTINGS', payload: { weightUnit: 'lb' } })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  state.settings.weightUnit === 'lb' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                Pounds (lb)
              </button>
            </div>
          </div>

          {/* Backup */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-4">
            <h3 className="text-sm font-medium text-slate-300 mb-4">Backup & Restore</h3>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={handleExportData}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium hover:bg-emerald-600/20 transition-colors">
                <Download size={16} /> Export Data
              </button>
              <button onClick={handleImportData}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-300 text-sm font-medium hover:bg-blue-600/20 transition-colors">
                <Upload size={16} /> Import Data
              </button>
            </div>
          </div>

          {/* About */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-medium text-slate-300 mb-2">About FitForge</h3>
            <p className="text-slate-400 text-sm">Version 1.0.0</p>
            <p className="text-slate-500 text-xs mt-2">
              AI-assisted personalized workout planning with structured JSON import/export, professional workout tracking, and progress analytics.
            </p>
            <p className="text-slate-500 text-xs mt-2">
              All data is stored locally on your device. No data is sent to any server.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
