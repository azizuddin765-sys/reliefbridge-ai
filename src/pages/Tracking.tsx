/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  PlayCircle, 
  MoreHorizontal,
  MapPin,
  User,
  ExternalLink,
  BrainCircuit
} from 'lucide-react';
import { motion } from 'motion/react';
import { TaskStatus, Assignment, Volunteer, NeedReport } from '../types';

interface TrackingProps {
  assignments: Assignment[];
  volunteers: Volunteer[];
  reports: NeedReport[];
}

export default function Tracking({ assignments, volunteers, reports }: TrackingProps) {
  const getStatusConfig = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.ASSIGNED: return { icon: Clock, color: 'text-slate-400', bg: 'bg-slate-50', label: 'Queued', border: 'border-slate-100' };
      case TaskStatus.IN_PROGRESS: return { icon: PlayCircle, color: 'text-blue-500', bg: 'bg-blue-50', label: 'In Transit', border: 'border-blue-100' };
      case TaskStatus.COMPLETED: return { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50', label: 'Delivered', border: 'border-green-100' };
      case TaskStatus.DELAYED: return { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Delayed', border: 'border-red-100' };
    }
  };

  const sections = [
    { title: 'In Transit', status: TaskStatus.IN_PROGRESS },
    { title: 'Assigned', status: TaskStatus.ASSIGNED },
    { title: 'Delayed', status: TaskStatus.DELAYED },
    { title: 'Completed', status: TaskStatus.COMPLETED },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Tactical Mission Ops</h2>
          <p className="text-slate-500 font-medium tracking-tight italic">Live-stream telemetry from field units and supply drop progression.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-xl text-white">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-black uppercase tracking-widest leading-none">Ops Link Secure</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {sections.map((section) => (
          <div key={section.status} className="space-y-4">
            <div className="flex items-center justify-between px-3">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{section.title}</h3>
              <div className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                 <span className="text-[10px] font-black text-slate-900">
                   {assignments.filter(a => a.status === section.status).length}
                 </span>
              </div>
            </div>
            
            <div className="space-y-3 min-h-[400px]">
              {assignments.filter(a => a.status === section.status).map((assignment) => {
                const volunteer = volunteers.find(v => v.id === assignment.volunteerId);
                const report = reports.find(r => r.id === assignment.reportId);
                const config = getStatusConfig(assignment.status);

                return (
                  <motion.div 
                    layout
                    key={assignment.id} 
                    className={`p-6 bg-white rounded-[2rem] border shadow-sm hover:shadow-xl transition-all group relative overflow-hidden ${config.border}`}
                  >
                    <div className="flex justify-between items-start mb-5 relative z-10">
                      <div className={`${config.bg} ${config.color} px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border ${config.border}`}>
                        <config.icon size={12} />
                        {config.label}
                      </div>
                      <button className="text-slate-300 hover:text-slate-900 transition-colors"><MoreHorizontal size={18} /></button>
                    </div>

                    <div className="space-y-5 relative z-10">
                      <div>
                        <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer leading-tight mb-2">
                          {report?.description || "Unknown Case"}
                        </p>
                        <div className="flex items-center gap-3">
                           <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                              <MapPin size={10} className="text-slate-300" /> 
                              {report?.location}
                           </div>
                           <div className="h-3 w-[1px] bg-slate-200"></div>
                           <div className="text-[10px] font-bold text-slate-400 uppercase">ID: {assignment.id.slice(0, 6).toUpperCase()}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-white transition-colors">
                        <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-[11px] font-black text-white shadow-lg">
                          {volunteer?.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-slate-800 truncate leading-none mb-1">{volunteer?.name}</p>
                          <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">ETA: {assignment.eta}</p>
                          </div>
                        </div>
                      </div>

                      {assignment.aiPriorityReason && (
                         <div className="pt-4 border-t border-slate-50 relative">
                            <div className="flex flex-col gap-1.5">
                               <div className="flex items-center gap-1.5 grayscale opacity-50 contrast-125">
                                  <BrainCircuit size={10} className="text-blue-600" />
                                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment Logic</p>
                               </div>
                               <p className="text-[10px]/relaxed text-slate-600 font-medium italic line-clamp-2">
                                 "{assignment.aiPriorityReason}"
                               </p>
                            </div>
                         </div>
                      )}
                    </div>

                    {/* Decorative Scanner Line */}
                    {assignment.status === TaskStatus.IN_PROGRESS && (
                       <motion.div 
                         animate={{ top: ['0%', '100%', '0%'] }}
                         transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                         className="absolute left-0 right-0 h-[1px] bg-blue-500/20 z-0 pointer-events-none"
                       />
                    )}
                  </motion.div>
                );
              })}
              
              {assignments.filter(a => a.status === section.status).length === 0 && (
                <div className="py-20 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-300 gap-3">
                   <div className="w-10 h-10 border-2 border-slate-100 rounded-full flex items-center justify-center opacity-50">
                      <Clock size={16} />
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest">No Active Units</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
