/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  UserPlus, 
  Package, 
  MapPin, 
  Truck, 
  Calendar,
  Save,
  Plus,
  Trash2,
  Box,
  ShieldCheck,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { Volunteer, Resource } from '../types';

interface RegistrationProps {
  volunteers: Volunteer[];
  resources: Resource[];
}

export default function Registration({ volunteers, resources }: RegistrationProps) {
  const [activeSubTab, setActiveSubTab] = useState<'volunteers' | 'resources'>('volunteers');

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Resource Matrix</h2>
          <p className="text-slate-500 font-medium tracking-tight italic">Manage the global database of personnel assets and supply logistics.</p>
        </div>
        
        <div className="flex bg-slate-900/5 backdrop-blur-sm p-1.5 rounded-[1.25rem] border border-slate-200 shadow-sm self-start md:self-auto">
          <button 
            onClick={() => setActiveSubTab('volunteers')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeSubTab === 'volunteers' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            Personnel
          </button>
          <button 
            onClick={() => setActiveSubTab('resources')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeSubTab === 'resources' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            Inventory
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[3rem] border border-slate-200 shadow-2xl space-y-6 sticky top-24 relative overflow-hidden">
           {/* Background Subtle Pattern */}
           <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none"></div>

           <div className="relative z-10 space-y-8">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-blue-600 shadow-lg shadow-blue-500/20 text-white rounded-2xl flex items-center justify-center">
                 {activeSubTab === 'volunteers' ? <UserPlus size={24} /> : <Package size={24} />}
               </div>
               <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1">Database Entry</p>
                  <h3 className="text-xl font-black text-slate-800">New {activeSubTab === 'volunteers' ? 'Personnel' : 'Asset'}</h3>
               </div>
             </div>
             
             <div className="space-y-5">
               <div className="space-y-1.5">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Identifier / Name</label>
                 <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white rounded-2xl text-sm font-bold placeholder:text-slate-300 transition-all outline-none" placeholder={activeSubTab === 'volunteers' ? "Professional Name" : "Resource Identifier"} />
               </div>
               <div className="space-y-1.5">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Geo-Location Hash</label>
                 <div className="relative">
                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   <input type="text" className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white rounded-2xl text-sm font-bold placeholder:text-slate-300 transition-all outline-none" placeholder="Sector / District / Grid" />
                 </div>
               </div>
               
               {activeSubTab === 'volunteers' ? (
                 <div className="space-y-5">
                   <div className="space-y-1.5">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Deployment Capacity</label>
                     <select className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white rounded-2xl text-sm font-bold cursor-pointer transition-all outline-none">
                       <option>Strategic (Full Time)</option>
                       <option>Tactical (Part Time)</option>
                       <option>Intermittent (Weekends)</option>
                     </select>
                   </div>
                   <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 group cursor-pointer hover:bg-white hover:border-blue-200 transition-all">
                      <input type="checkbox" id="vehicle" className="w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500/20" />
                      <label htmlFor="vehicle" className="flex items-center gap-3 cursor-pointer">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                            <Truck size={20} />
                         </div>
                         <div>
                            <p className="text-xs font-black text-slate-800 leading-none mb-1">Motorized Logistics</p>
                            <p className="text-[10px] font-bold text-slate-400 italic">Personnel has private vehicle</p>
                         </div>
                      </label>
                   </div>
                 </div>
               ) : (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Quantity Manifest</label>
                    <div className="flex gap-3">
                       <input type="number" className="flex-1 px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white rounded-2xl text-sm font-bold outline-none" placeholder="0.00" />
                       <input type="text" className="w-32 px-5 py-4 bg-slate-100 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none text-slate-500" placeholder="Unit Type" />
                    </div>
                  </div>
               )}
             </div>

             <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-slate-900/10 flex items-center justify-center gap-3 hover:bg-slate-800 active:scale-95 group">
               <Save size={20} />
               Finalize {activeSubTab === 'volunteers' ? 'Registration' : 'Inventory'}
             </button>
           </div>
        </div>

        {/* Right: Data Display */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeSubTab === 'volunteers' ? (
              volunteers.map((v, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={v.id} 
                  className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl flex flex-col justify-between group hover:border-blue-500/20 transition-all h-[340px] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-blue-600 group-hover:scale-110 transition-transform">
                     <Users size={160} />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-8">
                       <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white text-xl font-black shadow-xl">
                             {v.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                             <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-2">{v.name}</h4>
                             <div className="flex items-center gap-1.5 text-blue-600">
                               <ShieldCheck size={14} />
                               <span className="text-[10px] font-black uppercase tracking-widest leading-none">Verified Ops Unit</span>
                             </div>
                          </div>
                       </div>
                       <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm border ${
                         v.status === 'AVAILABLE' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-red-50 text-red-600 border-red-100'
                       }`}>
                         {v.status}
                       </span>
                    </div>

                    <div className="flex-1 space-y-6">
                       <div className="flex flex-wrap gap-2">
                          {v.skills.map((s, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-slate-50 text-[10px] font-black text-slate-500 rounded-lg border border-slate-100 shadow-sm uppercase tracking-tight italic">
                               {s}
                            </span>
                          ))}
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center">
                                <MapPin size={16} />
                             </div>
                             <p className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">{v.location}</p>
                          </div>
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center">
                                <Calendar size={16} />
                             </div>
                             <p className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">{v.availability.replace('_', ' ')}</p>
                          </div>
                       </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-6">
                       <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg border ${v.hasVehicle ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                          <Truck size={14} />
                          <span className="text-[9px] font-black uppercase tracking-widest">{v.hasVehicle ? 'Heavy Logistics Ready' : 'Foot Mobile Only'}</span>
                       </div>
                       <div className="flex gap-2">
                          <button className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all"><Plus size={16} /></button>
                          <button className="p-3 bg-slate-50 text-slate-400 hover:text-red-600 rounded-xl transition-all"><Trash2 size={16} /></button>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              resources.map((r, i) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={r.id} 
                  className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl group hover:border-indigo-600/20 transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-indigo-600 group-hover:rotate-12 transition-transform">
                     <Package size={140} />
                  </div>

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-indigo-600/20 ring-4 ring-indigo-50">
                             <Box size={24} />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-none mb-1">{r.type}</p>
                             <h4 className="text-xl font-black text-slate-900 tracking-tight">{r.name}</h4>
                          </div>
                       </div>
                    </div>
                    
                    <div className="space-y-6">
                       <div className="flex items-end gap-3 px-6 py-6 bg-slate-900 text-white rounded-[2rem] shadow-2xl relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent"></div>
                          <span className="text-4xl font-black relative z-10 leading-none">{r.quantity}</span>
                          <span className="text-[11px] font-black text-slate-400 uppercase pb-1.5 tracking-widest relative z-10">{r.unit}</span>
                       </div>

                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                             <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">In Stock</p>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg text-slate-500 border border-slate-100">
                             <MapPin size={12} />
                             <span className="text-[9px] font-black uppercase tracking-tight">{r.location}</span>
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
