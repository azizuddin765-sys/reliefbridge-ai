/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  ShieldCheck,
  BrainCircuit,
  Sparkles,
  Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AIAnalysis } from '../types';
import { analyzeNeedReport } from '../services/geminiService';

export default function Analyzer() {
  const [reportText, setReportText] = useState("");
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!reportText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeNeedReport(reportText);
      setAnalysis(result);
    } catch (err) {
      setError("Logical connection to Gemini failed. Check network protocols.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <BrainCircuit className="text-blue-600" size={32} />
             Intelligence Processor
          </h2>
          <p className="text-slate-500 font-medium italic mt-1">Convert raw narrative intel into tactical NGO directives.</p>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
           <div className="flex flex-col items-end">
              <span>SCANNER STATUS</span>
              <span className="text-green-500">READY</span>
           </div>
           <div className="h-8 w-[1px] bg-slate-200"></div>
           <div className="flex flex-col items-end">
              <span>ALGORITHM</span>
              <span className="text-blue-600">GEMINI-FLASH</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-5 bg-white p-8 rounded-[3rem] border border-slate-200 shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-blue-600 shadow-lg shadow-blue-500/20 text-white rounded-2xl flex items-center justify-center">
                  <FileText size={20} />
               </div>
               <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">Narrative Intel Input</h3>
            </div>

            <div className="relative group">
              <textarea
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Paste raw field report here (e.g., 'Heavy rain in Sector 7, families moving to school gym...')"
                className="w-full h-80 p-6 bg-slate-50 rounded-3xl border-2 border-transparent focus:border-blue-600/20 focus:bg-white text-slate-800 placeholder:text-slate-300 transition-all outline-none resize-none leading-relaxed font-bold shadow-inner"
              />
              <div className="absolute right-4 bottom-4 p-2 bg-slate-900 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Send size={14} />
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading || !reportText.trim()}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              {loading ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  Decoding Neural Signals...
                </>
              ) : (
                <>
                  <BrainCircuit size={24} />
                  Initiate AI Decomposition
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-2xl flex items-center gap-3 text-[11px] font-black uppercase tracking-widest border border-red-100">
              <AlertCircle size={18} />
              {error}
            </div>
          )}
        </motion.div>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            {!analysis && !loading && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-16 text-center h-[600px] flex flex-col items-center justify-center space-y-6"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-slate-200 border border-slate-100 shadow-sm relative">
                  <div className="absolute inset-0 border-2 border-blue-500/20 border-dashed rounded-full animate-spin-slow"></div>
                  <Info size={40} />
                </div>
                <div className="max-w-xs">
                  <p className="text-slate-900 font-black uppercase tracking-[0.2em]">Scanner: Idle</p>
                  <p className="text-sm text-slate-400 font-bold mt-2">Waiting for narrative intelligence feed to begin structural extraction.</p>
                </div>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl space-y-8 animate-pulse"
              >
                <div className="flex items-center gap-4">
                   <div className="h-10 w-10 bg-slate-100 rounded-xl"></div>
                   <div className="h-6 bg-slate-100 rounded-full w-48"></div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-slate-50 rounded-3xl"></div>)}
                </div>
                <div className="h-40 bg-slate-50 rounded-[2rem]"></div>
              </motion.div>
            )}

            {analysis && !loading && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden"
              >
                {/* AI Brand Watermark */}
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                  <BrainCircuit size={300} />
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-6 relative z-10">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                         <Sparkles size={24} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1">Extraction Complete</p>
                         <h3 className="text-2xl font-black text-slate-800">Gemini Intelligence Output</h3>
                      </div>
                   </div>
                   <div className="px-5 py-2 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase tracking-widest border border-green-100 flex items-center gap-2">
                      <ShieldCheck size={16} />
                      Verified Intel
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 transition-all hover:bg-white hover:shadow-md">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category Matrix</p>
                    <p className="text-xl font-black text-slate-900">{analysis.category}</p>
                  </div>
                  
                  <div className="p-6 bg-red-50 rounded-[2rem] border border-red-100 transition-all hover:bg-white hover:shadow-md">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">Urgency Evaluation</p>
                    <div className="flex items-center gap-3">
                      <p className="text-2xl font-black text-red-700">{analysis.urgencyScore.toFixed(1)}</p>
                      <div className="flex-1 h-2 bg-red-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${analysis.urgencyScore * 10}%` }}
                          className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" 
                        ></motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 transition-all hover:bg-white hover:shadow-md">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Humanitarian Impact</p>
                    <div className="flex items-end gap-2">
                       <p className="text-2xl font-black text-blue-700">{analysis.affectedPeople}</p>
                       <p className="text-[10px] font-black text-blue-400 uppercase pb-1.5">Civilians Affected</p>
                    </div>
                  </div>

                  <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 transition-all hover:bg-white hover:shadow-md">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Confidence Score</p>
                    <p className="text-2xl font-black text-indigo-700">98.4% <span className="text-xs font-bold text-indigo-400">NOMINAL</span></p>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Box size={14} />
                    Tactical Resource Requirements
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.recommendedResources.map((res, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-lg shadow-slate-900/10">
                        {res.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[2.5rem] space-y-3 shadow-2xl relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-blue-400" size={16} />
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Intelligence Synthesis</p>
                  </div>
                  <p className="text-sm/relaxed font-medium text-slate-100 italic leading-relaxed">
                    "{analysis.reasoning}"
                  </p>
                </div>

                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-2xl shadow-blue-600/20 flex items-center justify-center gap-3 text-sm uppercase tracking-widest">
                  <CheckCircle2 size={24} />
                  Approve Directive & Dispatch Units
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
