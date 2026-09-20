import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { generatePrompt } from '../utils/promptGenerator';
import { Copy, Share2, RefreshCw, Save, Check, Sparkles, ArrowLeft } from 'lucide-react';

export default function PromptGenerator() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const prompt = generatePrompt(state);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Workout Program Prompt', text: prompt });
      } catch {}
    } else {
      handleCopy();
    }
  };

  const handleSave = () => {
    dispatch({
      type: 'ADD_PROMPT',
      payload: {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        prompt,
        version: '1.0'
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mb-4 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center">
              <Sparkles size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Prompt</h1>
              <p className="text-slate-400 text-sm">Copy this prompt and send it to any AI</p>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 mb-6">
            <h3 className="text-indigo-300 font-semibold mb-2">📋 How to use:</h3>
            <ol className="text-slate-300 text-sm space-y-1 list-decimal list-inside">
              <li>Copy the prompt below</li>
              <li>Paste it into ChatGPT, Claude, Gemini, or any AI</li>
              <li>The AI will generate a JSON workout program</li>
              <li>Copy the JSON and import it back here</li>
            </ol>
          </div>

          {/* Prompt Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
              <span className="text-sm font-medium text-slate-300">Generated Prompt</span>
              <span className="text-xs text-slate-500">v1.0 • {prompt.length} chars</span>
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto">
              <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                {prompt}
              </pre>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleCopy}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                copied ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500'
              }`}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
            <button onClick={handleShare}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
              <Share2 size={18} /> Share
            </button>
            <button onClick={handleSave}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                saved ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}>
              {saved ? <Check size={18} /> : <Save size={18} />}
              {saved ? 'Saved!' : 'Save Prompt'}
            </button>
            <button onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
              <RefreshCw size={18} /> Regenerate
            </button>
          </div>

          {/* Previous Prompts */}
          {state.promptHistory.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-3">Previous Prompts</h3>
              <div className="space-y-2">
                {state.promptHistory.slice(-5).reverse().map(p => (
                  <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">{new Date(p.date).toLocaleDateString()}</span>
                      <span className="text-xs text-slate-500">v{p.version}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 truncate">{p.prompt.substring(0, 100)}...</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
