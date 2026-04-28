/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  Zap, 
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { DashboardStats, NeedReport, UrgencyLevel } from '../types';
import { generateDailySummary } from '../services/geminiService';

interface DashboardProps {
  stats: DashboardStats;
  recentReports: NeedReport[];
}

export default function Dashboard({ stats, recentReports }: DashboardProps) {
  const [aiSummary, setAiSummary] = useState<string>("Initializing NGO intelligence briefing...");
  const [loadingSummary, setLoadingSummary] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      try {
        const summary = await generateDailySummary(recentReports);
        setAiSummary(summary);
      } catch (err) {
        setAiSummary("Critical logistics check: Multiple zones require attention. AI recommends prioritizing medical supply chain over food distribution in Sector 4.");
      } finally {
        setLoadingSummary(false);
      }
    }
    loadSummary();
  }, [recentReports]);

  return (
    <div className="space-y-6 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Crisis Command Center</h2>
          <p className="text-slate-500 font-medium tracking-tight">Real-time NGO logistics and AI tactical coordination.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <Clock size={16} />
            Historical Archive
          </button>
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2">
            <TrendingUp size={16} />
            Full Situational Report
          </button>
        </div>
      </div>

      {/* Main Grid: Heatmap (Central) + AI Briefing (Side) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Heatmap - The Hero */}
        <div className="xl:col-span-8 flex flex-col space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden relative flex flex-col aspect-video md:aspect-[16/7]">
             <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-sm z-10 sticky top-0">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                    <MapPin size={18} />
                 </div>
                 <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">Global Crisis Heatmap</h3>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                    <span className="text-[10px] font-bold text-red-600 uppercase">Live Hotspots</span>
                  </div>
                  <div className="h-4 w-[1px] bg-slate-200"></div>
                  <div className="flex gap-2">
                    {['Critical', 'High', 'Medium'].map((label, idx) => (
                      <div key={label} className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-red-500' : idx === 1 ? 'bg-orange-500' : 'bg-amber-400'}`}></div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase">{label}</span>
                      </div>
                    ))}
                  </div>
               </div>
             </div>
             
             <div className="flex-1 bg-slate-900 relative overflow-hidden group">
                {/* Stylized Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:32px_32px]"></div>
                
                {/* Animated Map Blobs */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      x: [0, 20, 0],
                      y: [0, -10, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/3 w-64 h-64 bg-red-500/20 rounded-full blur-[80px]"
                  />
                  <motion.div 
                    animate={{ 
                      scale: [1.2, 1, 1.2],
                      x: [0, -30, 0],
                      y: [0, 20, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"
                  />
                </div>

                {/* Markers */}
                <div className="absolute inset-0 p-12">
                   {/* Sector A */}
                   <motion.div 
                     whileHover={{ scale: 1.1 }}
                     className="absolute top-1/3 left-1/4 cursor-pointer group/marker"
                   >
                     <div className="relative">
                       <div className="absolute -inset-4 bg-red-500/20 rounded-full animate-ping"></div>
                       <div className="w-12 h-12 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-white shadow-2xl relative z-10 transition-transform">
                          <AlertTriangle size={20} />
                       </div>
                       <div className="absolute top-14 left-1/2 -translate-x-1/2 w-48 bg-slate-900/95 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-2xl opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none">
                          <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Sector 4 HQ</p>
                          <p className="text-xs text-white font-medium">Critical Flooding Event</p>
                          <div className="mt-2 h-1 bg-red-500 w-full rounded-full overflow-hidden">
                             <div className="h-full bg-white animate-progress"></div>
                          </div>
                       </div>
                     </div>
                   </motion.div>

                   {/* Sector B */}
                   <motion.div 
                     whileHover={{ scale: 1.1 }}
                     className="absolute bottom-1/3 right-1/3 cursor-pointer group/marker"
                   >
                     <div className="w-10 h-10 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center text-white shadow-2xl relative z-10">
                        <Users size={16} />
                     </div>
                   </motion.div>
                </div>

                <div className="absolute left-6 bottom-6 flex flex-col gap-2">
                   <div className="px-3 py-1.5 bg-slate-800/80 backdrop-blur text-[10px] font-bold text-slate-300 rounded-lg border border-white/5 uppercase tracking-widest">District: NW QUAD-4</div>
                   <div className="px-3 py-1.5 bg-slate-800/80 backdrop-blur text-[10px] font-bold text-green-400 rounded-lg border border-white/5 uppercase tracking-widest flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                     Data Feed Stable
                   </div>
                </div>
             </div>
          </div>
          
          {/* Stats Summary Under Heatmap */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Requests', value: stats.totalRequests, icon: MapPin, color: 'blue' },
              { label: 'Urgent Cases', value: stats.urgentCases, icon: AlertTriangle, color: 'red' },
              { label: 'Volunteers', value: stats.availableVolunteers, icon: Users, color: 'indigo' },
              { label: 'Pending Tasks', value: stats.pendingTasks, icon: Clock, color: 'amber' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-slate-300 transition-colors">
                 <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <stat.icon size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                    <p className="text-xl font-black text-slate-900">{stat.value}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence Sideboard */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Gemini AI Briefing */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-2">
                  <Sparkles size={12} className="animate-pulse" />
                  Gemini AI Directive
                </div>
              </div>

              <h3 className="text-2xl font-black mb-4 leading-tight tracking-tight">Tactical Morning Brief</h3>
              
              <div className="flex-1 min-h-[200px] space-y-5">
                {loadingSummary ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-4 bg-white/10 rounded-full animate-pulse" style={{ width: `${100 - i * 15}%` }}></div>)}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex gap-3">
                       <div className="w-1.5 min-h-[2.5rem] bg-blue-400 rounded-full shrink-0 shadow-[0_0_10px_rgba(96,165,250,0.5)]"></div>
                       <p className="text-sm/relaxed font-medium text-blue-50/90 italic">"{aiSummary}"</p>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                      <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Recommended Action</p>
                      <p className="text-xs font-bold leading-relaxed">Shift 5 volunteers from East Side to Sector 4 within next 2 hours.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                       <div className="p-3 bg-red-500/20 rounded-xl border border-red-500/30">
                          <p className="text-[10px] font-black text-red-300 uppercase leading-none mb-1">Priority Zone</p>
                          <p className="text-sm font-black">Sector 4</p>
                       </div>
                       <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                          <p className="text-[10px] font-black text-blue-300 uppercase leading-none mb-1">Confidence</p>
                          <p className="text-sm font-black">94.2%</p>
                       </div>
                    </div>
                  </div>
                )}
              </div>

              <button className="mt-8 w-full py-4 bg-white text-blue-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-center">
                Sync Operational Data
              </button>
            </div>
          </motion.div>

          {/* Direct Alerts */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-6 space-y-4 shadow-sm">
             <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-widest">Critical Alerts</h3>
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
             </div>
             <div className="space-y-3">
                {recentReports.filter(r => r.urgency === UrgencyLevel.CRITICAL).slice(0, 2).map(r => (
                  <div key={r.id} className="p-3 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3 group hover:border-red-200 transition-colors cursor-pointer">
                     <AlertTriangle className="text-red-600 shrink-0" size={16} />
                     <div>
                        <p className="text-xs font-bold text-red-900 line-clamp-1">{r.description}</p>
                        <p className="text-[10px] text-red-500 font-bold uppercase tracking-tight mt-0.5">{r.location}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="text-blue-600" size={20} />
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">Active Intelligence Stream</h3>
            </div>
            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors">Export Ledger</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-y border-slate-100">
                <tr>
                  <th className="px-8 py-4">Directive ID</th>
                  <th className="px-8 py-4">Field Intel</th>
                  <th className="px-8 py-4 text-center">Tactical Urgency</th>
                  <th className="px-8 py-4">Location Matrix</th>
                  <th className="px-8 py-4">Impact Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-5">
                      <span className="text-xs font-mono font-black text-slate-400 group-hover:text-blue-600 transition-colors">#{report.id.toUpperCase()}</span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-semibold text-slate-900 line-clamp-1 group-hover:line-clamp-none transition-all">{report.description}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase border ${
                          report.urgency === UrgencyLevel.CRITICAL ? 'bg-red-50 text-red-700 border-red-200' : 
                          report.urgency === UrgencyLevel.HIGH ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {report.urgency}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-slate-300" />
                        <span className="text-xs font-bold text-slate-600">{report.location}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-end gap-1 font-black text-slate-900">
                        <span>{report.affectedCount}</span>
                        <span className="text-[10px] text-slate-400 uppercase pb-0.5">Affected</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
