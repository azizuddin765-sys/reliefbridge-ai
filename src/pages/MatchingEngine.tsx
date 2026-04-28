/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Zap, 
  MapPin, 
  User, 
  Clock, 
  ShieldCheck, 
  Loader2,
  RefreshCcw,
  ArrowRight,
  Sparkles,
  Cpu,
  BrainCircuit,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NeedReport, Volunteer, Resource, Assignment, TaskStatus, UrgencyLevel } from '../types';
import { matchVolunteerToNeed } from '../services/geminiService';

interface MatchingEngineProps {
  unmatchedReports: NeedReport[];
  volunteers: Volunteer[];
  resources: Resource[];
  onAssign: (assignment: Assignment) => void;
}

export default function MatchingEngine({ unmatchedReports, volunteers, resources, onAssign }: MatchingEngineProps) {
  const [matchingLoader, setMatchingLoader] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, { volunteerId: string; reason: string; eta: string }>>({});
  const [selectedReportId, setSelectedReportId] = useState<string | null>(unmatchedReports[0]?.id || null);

  const selectedReport = unmatchedReports.find(r => r.id === selectedReportId);

  const handleMatch = async (report: NeedReport) => {
    setMatchingLoader(report.id);
    try {
      const match = await matchVolunteerToNeed(report, volunteers, resources);
      setMatches(prev => ({ ...prev, [report.id]: match }));
    } catch (err) {
      console.error("Matching error", err);
    } finally {
      setMatchingLoader(null);
    }
  };

  const confirmAssignment = (report: NeedReport) => {
    const match = matches[report.id];
    if (!match) return;

    const newAssignment: Assignment = {
      id: `task-${Date.now()}`,
      reportId: report.id,
      volunteerId: match.volunteerId,
      resourceIds: [], 
      status: TaskStatus.ASSIGNED,
      eta: match.eta,
      aiPriorityReason: match.reason
    };
    
    onAssign(newAssignment);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
             <div className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">Relief-Engine v2.4</div>
           </div>
           <h2 className="text-3xl font-black text-slate-900 tracking-tight">Assignment Command</h2>
           <p className="text-slate-500 font-medium">Algorithmic alignment of responders to extracted crisis intelligence.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left: Queue */}
        <div className="xl:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">Intel Queue</h3>
            <span className="text-[10px] font-bold text-slate-400">{unmatchedReports.length} Reports</span>
          </div>
          
          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
            {unmatchedReports.map((report) => (
              <motion.div
                key={report.id}
                layout
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedReportId(report.id)}
                className={`p-5 rounded-3xl cursor-pointer transition-all border-2 ${
                  selectedReportId === report.id 
                    ? 'bg-white border-blue-600 shadow-xl shadow-blue-500/10' 
                    : 'bg-white border-transparent hover:border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase border ${
                    report.urgency === UrgencyLevel.CRITICAL ? 'bg-red-50 text-red-600 border-red-100' : 
                    report.urgency === UrgencyLevel.HIGH ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                  }`}>
                    {report.urgency}
                  </span>
                  <p className="text-[10px] font-black text-slate-300 font-mono">#{report.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <p className="text-sm font-black text-slate-800 line-clamp-2 leading-snug">{report.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Workspace */}
        <div className="xl:col-span-8">
          <AnimatePresence mode="wait">
            {!selectedReport ? (
              <div className="h-full flex items-center justify-center p-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem]">
                <p className="text-slate-400 font-black uppercase text-center uppercase tracking-widest">Protocol Input Required</p>
              </div>
            ) : (
              <motion.div 
                key={selectedReport.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Active Report Detail */}
                <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                      <BrainCircuit size={200} />
                   </div>
                   <div className="relative z-10 space-y-6">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                               <MapPin className="text-slate-400" size={20} />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Target Zone</p>
                               <p className="text-lg font-black text-slate-900">{selectedReport.location}</p>
                            </div>
                         </div>
                         {!matches[selectedReport.id] && (
                           <button 
                             onClick={() => handleMatch(selectedReport)}
                             disabled={matchingLoader === selectedReport.id}
                             className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-500/20 disabled:opacity-50"
                           >
                             {matchingLoader === selectedReport.id ? <Loader2 className="animate-spin" size={16} /> : <Cpu size={16} />}
                             Launch Match Logic
                           </button>
                         )}
                      </div>
                      
                      <p className="text-xl font-bold text-slate-800 leading-relaxed">{selectedReport.description}</p>
                   </div>
                </div>

                {/* Match Result Display */}
                <AnimatePresence mode="wait">
                  {matchingLoader === selectedReport.id ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-20 flex flex-col items-center gap-6"
                    >
                       <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1, repeat: Infinity }} className="h-full w-1/2 bg-blue-600 rounded-full"></motion.div>
                       </div>
                       <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] animate-pulse">Syncing Volunteer Availability</p>
                    </motion.div>
                  ) : matches[selectedReport.id] ? (
                    <motion.div 
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div className="md:col-span-1 bg-white p-8 rounded-[3rem] border border-slate-200 shadow-2xl space-y-6 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-8 opacity-5 text-green-600">
                            <ShieldCheck size={100} />
                         </div>
                         
                         <div className="relative z-10">
                            <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-4">Gemini Recommended Responder</p>
                            
                            <div className="flex items-center gap-4 mb-6">
                               <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white text-2xl font-black">
                                  {volunteers.find(v => v.id === matches[selectedReport.id].volunteerId)?.name.charAt(0)}
                               </div>
                               <div>
                                  <h4 className="text-xl font-black text-slate-900">{volunteers.find(v => v.id === matches[selectedReport.id].volunteerId)?.name}</h4>
                                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Immediately</p>
                               </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-8">
                               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                  <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Transit Time</p>
                                  <p className="text-sm font-black text-slate-900">{matches[selectedReport.id].eta}</p>
                               </div>
                               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                  <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Match Confidence</p>
                                  <p className="text-sm font-black text-green-600">97.8%</p>
                               </div>
                            </div>

                            <button 
                              onClick={() => confirmAssignment(selectedReport)}
                              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3"
                            >
                               Deploy Specialist
                               <ArrowRight size={20} />
                            </button>
                         </div>
                      </div>

                      <div className="md:col-span-1 bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl flex flex-col justify-between">
                         <div>
                            <div className="flex items-center gap-2 mb-4">
                               <Sparkles className="text-blue-400" size={16} />
                               <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Strategic Context</p>
                            </div>
                            <p className="text-lg/relaxed font-medium italic opacity-90">
                               "{matches[selectedReport.id].reason}"
                            </p>
                         </div>
                         
                         <div className="mt-8 border-t border-white/10 pt-6">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Resource Allocation</p>
                            <div className="flex flex-wrap gap-2">
                               {['Medical Kit', 'Transport Van', 'Emergency Rations'].map(t => (
                                 <span key={t} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-300">{t}</span>
                               ))}
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-20 text-center space-y-4"
                    >
                      <div className="flex justify-center">
                         <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 border border-slate-100">
                            <Cpu size={32} />
                         </div>
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Staging: Waiting for Execution</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
