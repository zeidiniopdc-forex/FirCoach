import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { validateWorkoutJSON, parseWorkoutProgram } from '../utils/validator';
import { sampleProgramJSON } from '../data/sampleProgram';
import { Upload, FileText, Clipboard, CheckCircle, AlertCircle, X, Sparkles } from 'lucide-react';

export default function ImportProgram() {
  const { dispatch } = useApp();
  const [jsonInput, setJsonInput] = useState('');
  const [validationResult, setValidationResult] = useState<any>(null);
  const [imported, setImported] = useState(false);
  const [activeTab, setActiveTab] = useState<'paste' | 'file' | 'sample'>('paste');

  const handleValidate = () => {
    const result = validateWorkoutJSON(jsonInput);
    setValidationResult(result);
  };

  const handleImport = () => {
    const program = parseWorkoutProgram(jsonInput);
    if (program) {
      dispatch({ type: 'ADD_PROGRAM', payload: program });
      dispatch({ type: 'SET_ACTIVE_PROGRAM', payload: program.program.id });
      setImported(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setJsonInput(content);
        setActiveTab('paste');
      };
      reader.readAsText(file);
    }
  };

  const loadSample = () => {
    setJsonInput(sampleProgramJSON);
    setActiveTab('paste');
    setValidationResult(null);
    setImported(false);
  };

  if (imported) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Program Imported!</h2>
          <p className="text-slate-400 mb-6">Your workout program is ready to use.</p>
          <button onClick={() => { setImported(false); setJsonInput(''); setValidationResult(null); }}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors">
            Import Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center">
              <Upload size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Import Program</h1>
              <p className="text-slate-400 text-sm">Import your AI-generated workout JSON</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button onClick={() => setActiveTab('paste')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'paste' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}>
              <Clipboard size={16} /> Paste JSON
            </button>
            <button onClick={() => setActiveTab('file')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'file' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}>
              <FileText size={16} /> Upload File
            </button>
            <button onClick={loadSample}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 text-amber-400 hover:text-amber-300 transition-colors">
              <Sparkles size={16} /> Load Sample
            </button>
          </div>

          {/* Input Area */}
          {activeTab === 'file' ? (
            <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center hover:border-indigo-500 transition-colors">
              <Upload size={40} className="text-slate-500 mx-auto mb-4" />
              <p className="text-slate-300 mb-2">Drop your JSON file here</p>
              <p className="text-slate-500 text-sm mb-4">or click to browse</p>
              <label className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium cursor-pointer hover:bg-indigo-500 transition-colors">
                Select File
                <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          ) : (
            <textarea
              value={jsonInput}
              onChange={e => { setJsonInput(e.target.value); setValidationResult(null); }}
              className="w-full h-64 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-300 font-mono focus:border-indigo-500 focus:outline-none resize-none"
              placeholder='Paste your workout JSON here...\n\n{\n  "schema_version": "1.0",\n  "program": {...},\n  "days": [...]\n}'
            />
          )}

          {/* Validate Button */}
          {jsonInput && (
            <button onClick={handleValidate}
              className="w-full mt-4 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors">
              Validate JSON
            </button>
          )}

          {/* Validation Results */}
          {validationResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
              {validationResult.valid ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={20} className="text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">Valid JSON!</span>
                  </div>
                  <p className="text-slate-400 text-sm">The program structure is correct and ready to import.</p>
                  <button onClick={handleImport}
                    className="mt-4 w-full py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors">
                    Import Program
                  </button>
                </div>
              ) : (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle size={20} className="text-red-400" />
                    <span className="text-red-300 font-semibold">Validation Errors</span>
                    <span className="text-red-400 text-sm ml-auto">{validationResult.errors.length} errors</span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {validationResult.errors.map((err: any, i: number) => (
                      <div key={i} className="bg-red-900/20 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <X size={14} className="text-red-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm text-red-300 font-medium">{err.error}</p>
                            <p className="text-xs text-slate-500 mt-1">Location: {err.location}</p>
                            {err.suggestedFix && (
                              <p className="text-xs text-slate-400 mt-1">💡 {err.suggestedFix}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {validationResult.warnings?.length > 0 && (
                <div className="mt-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
                  <p className="text-amber-300 text-sm font-medium mb-2">⚠️ Warnings</p>
                  {validationResult.warnings.map((w: string, i: number) => (
                    <p key={i} className="text-slate-400 text-sm">• {w}</p>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
