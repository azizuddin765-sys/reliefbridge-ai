/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  LayoutDashboard, 
  FileSearch, 
  Users, 
  Zap, 
  Bell, 
  Settings,
  Menu,
  X,
  Heart,
  Activity,
  Terminal,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
  { id: 'analyzer', label: 'Intel Processor', icon: FileSearch },
  { id: 'registration', label: 'Global Assets', icon: Users },
  { id: 'matching', label: 'Smart Dispatch', icon: Radio },
  { id: 'tracking', label: 'Tactical Feed', icon: Activity },
];

const MOCK_ACTIVITY = [
  { id: 1, text: "Sector 4: Units Deployed", type: "ops" },
  { id: 2, text: "AI Scan: Crisis Level Elevated", type: "alert" },
  { id: 3, text: "Supply Chain Sync: 98%", type: "system" },
];

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-slate-900 text-white rounded-xl shadow-2xl border border-white/10"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        className={`fixed inset-y-0 left-0 w-[280px] bg-slate-950 text-white z-40 lg:translate-x-0 transition-all duration-300 ease-in-out border-r border-white/5 shadow-[20px_0_40px_rgba(0,0,0,0.4)]`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-8 pb-4 flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-2 bg-blue-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl relative z-10 border border-white/10">
                <Heart className="text-white fill-white" size={24} />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight leading-none italic uppercase">Relief<span className="text-blue-500">Bridge</span></h1>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-black">Tactical AI Node</p>
              </div>
            </div>
          </div>

          <div className="h-[1px] mx-8 bg-gradient-to-r from-transparent via-white/5 to-transparent my-4"></div>

          {/* Nav */}
          <nav className="flex-1 px-4 space-y-1.5 py-4 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                    isActive 
                      ? 'bg-white/5 text-white shadow-inner' 
                      : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-nav-line"
                      className="absolute left-0 top-3 bottom-3 w-1 bg-blue-500 rounded-full"
                    />
                  )}
                  <item.icon size={20} className={isActive ? 'text-blue-400' : 'group-hover:text-blue-400 transition-colors'} />
                  <span className={`text-xs font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-80'}`}>{item.label}</span>
                </button>
              );
            })}

            {/* Live Activity Feed in Nav */}
            <div className="mt-8 px-4 space-y-4">
               <div className="flex items-center gap-2 px-1">
                  <Terminal size={12} className="text-slate-600" />
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Live Activity</span>
               </div>
               <div className="space-y-3">
                  {MOCK_ACTIVITY.map(act => (
                    <div key={act.id} className="flex gap-3">
                       <div className={`w-1 shrink-0 rounded-full ${act.type === 'ops' ? 'bg-blue-600' : act.type === 'alert' ? 'bg-red-600' : 'bg-slate-700'}`}></div>
                       <p className="text-[10px] font-medium text-slate-400 leading-relaxed italic">"{act.text}"</p>
                    </div>
                  ))}
               </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/5 bg-slate-900/20 backdrop-blur">
             <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5 space-y-4 shadow-inner">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-[1px]">
                      <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center font-black text-xs text-blue-400">HQ</div>
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-white truncate tracking-tight">NGO Global HQ</p>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Root Administrator</p>
                   </div>
                   <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                </div>
                
                <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-2">
                   <button className="py-2 bg-slate-800/50 rounded-lg text-[9px] font-black uppercase text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2 border border-white/5">
                      <Settings size={12} />
                      Config
                   </button>
                   <button className="py-2 bg-blue-600/10 rounded-lg text-[9px] font-black uppercase text-blue-400 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 border border-blue-500/20">
                      <Zap size={12} />
                      Turbo
                   </button>
                </div>
             </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
