/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Analyzer from './pages/Analyzer';
import Registration from './pages/Registration';
import MatchingEngine from './pages/MatchingEngine';
import Tracking from './pages/Tracking';
import { 
  NeedReport, 
  Volunteer, 
  Resource, 
  Assignment, 
  UrgencyLevel, 
  TaskStatus,
  DashboardStats 
} from './types';
import { AnimatePresence, motion } from 'motion/react';

const INITIAL_REPORTS: NeedReport[] = [
  { id: 'rep-001', timestamp: '2024-03-20T10:00:00Z', description: 'Severe flooding in Sector 4. 20 families displaced. Need blankets and food kits.', category: 'Disaster Relief', urgency: UrgencyLevel.CRITICAL, affectedCount: 85, location: 'Sector 4, North' },
  { id: 'rep-002', timestamp: '2024-03-20T11:30:00Z', description: 'Local community center requesting medical kits for minor injuries reporting after storms.', category: 'Medical', urgency: UrgencyLevel.HIGH, affectedCount: 12, location: 'Downtown Hub' },
  { id: 'rep-003', timestamp: '2024-03-21T09:15:00Z', description: 'Water main burst in West Hill. Drinking water supply contaminated.', category: 'Sanitation', urgency: UrgencyLevel.HIGH, affectedCount: 200, location: 'West Hill Residential' },
];

const INITIAL_VOLUNTEERS: Volunteer[] = [
  { id: 'vol-1', name: 'Dr. Sarah Chen', location: 'Downtown', skills: ['Medical', 'Emergency Response'], availability: 'FULL_TIME', hasVehicle: true, status: 'AVAILABLE' },
  { id: 'vol-2', name: 'Mark Thompson', location: 'Sector 4', skills: ['Logistics', 'Heavy Lifting'], availability: 'PART_TIME', hasVehicle: true, status: 'ON_MISSION' },
  { id: 'vol-3', name: 'Elena Rodriguez', location: 'East Side', skills: ['Translation', 'First Aid'], availability: 'WEEKENDS', hasVehicle: false, status: 'AVAILABLE' },
  { id: 'vol-4', name: 'James Wilson', location: 'West Hill', skills: ['Plumbing', 'Construction'], availability: 'FULL_TIME', hasVehicle: true, status: 'AVAILABLE' },
];

const INITIAL_RESOURCES: Resource[] = [
  { id: 'res-1', type: 'FOOD', name: 'Dry Food Kits', quantity: 450, unit: 'Boxes', location: 'Main Warehouse' },
  { id: 'res-2', type: 'MEDICINE', name: 'First Aid Packs', quantity: 120, unit: 'Packs', location: 'Emergency Clinic' },
  { id: 'res-3', type: 'WATER', name: 'Clean Water Gallons', quantity: 500, unit: 'Gallons', location: 'West Hill Station' },
  { id: 'res-4', type: 'TRANSPORT', name: 'Flatbed Truck', quantity: 2, unit: 'Units', location: 'Logistics Yard' },
];

const INITIAL_ASSIGNMENTS: Assignment[] = [
  { id: 'task-1', reportId: 'rep-001', volunteerId: 'vol-2', resourceIds: ['res-1'], status: TaskStatus.IN_PROGRESS, eta: '25 mins', aiPriorityReason: 'Volunteer already in proximity with heavy vehicle.' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [reports, setReports] = useState<NeedReport[]>(INITIAL_REPORTS);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(INITIAL_VOLUNTEERS);
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);

  const stats: DashboardStats = {
    totalRequests: reports.length,
    urgentCases: reports.filter(r => r.urgency === UrgencyLevel.CRITICAL || r.urgency === UrgencyLevel.HIGH).length,
    availableVolunteers: volunteers.filter(v => v.status === 'AVAILABLE').length,
    pendingTasks: assignments.filter(a => a.status === TaskStatus.ASSIGNED || a.status === TaskStatus.IN_PROGRESS).length,
  };

  const handleAssign = (assignment: Assignment) => {
    setAssignments(prev => [...prev, assignment]);
    // update volunteer status in real app
    setVolunteers(prev => prev.map(v => v.id === assignment.volunteerId ? { ...v, status: 'ON_MISSION' } : v));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} recentReports={reports} />;
      case 'analyzer':
        return <Analyzer />;
      case 'registration':
        return <Registration volunteers={volunteers} resources={resources} />;
      case 'matching':
        return (
          <MatchingEngine 
            unmatchedReports={reports.filter(r => !assignments.find(a => a.reportId === r.id))} 
            volunteers={volunteers}
            resources={resources}
            onAssign={handleAssign}
          />
        );
      case 'tracking':
        return <Tracking assignments={assignments} volunteers={volunteers} reports={reports} />;
      default:
        return <Dashboard stats={stats} recentReports={reports} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      <main className="flex-1 lg:ml-[280px] min-h-screen flex flex-col">
        <Header />
        
        <div className="flex-1 p-6 lg:p-10 max-w-[1600px] mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global CSS Overrides for specific fonts if needed */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');
        
        :root {
          --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
          --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
        }

        body {
          font-family: var(--font-sans);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .font-mono {
          font-family: var(--font-mono);
        }
        .text-teal-600 { color: var(--color-blue-600); }
        .bg-teal-500 { background-color: var(--color-blue-600); }
        .hover\:bg-teal-400:hover { background-color: var(--color-blue-500); }
        .shadow-teal-500\/20 { --tw-shadow-color: rgba(37, 99, 235, 0.2); }
        .text-teal-400 { color: var(--color-blue-400); }
      `}</style>
    </div>
  );
}
