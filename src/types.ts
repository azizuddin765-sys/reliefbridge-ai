/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UrgencyLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum TaskStatus {
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DELAYED = 'DELAYED',
}

export interface NeedReport {
  id: string;
  timestamp: string;
  description: string;
  category: string;
  urgency: UrgencyLevel;
  affectedCount: number;
  location: string;
  analysis?: AIAnalysis;
}

export interface AIAnalysis {
  category: string;
  urgencyScore: number;
  affectedPeople: number;
  recommendedResources: string[];
  reasoning: string;
}

export interface Volunteer {
  id: string;
  name: string;
  location: string;
  skills: string[];
  availability: 'FULL_TIME' | 'PART_TIME' | 'WEEKENDS';
  hasVehicle: boolean;
  status: 'AVAILABLE' | 'ON_MISSION' | 'AWAY';
}

export interface Resource {
  id: string;
  type: 'FOOD' | 'MEDICINE' | 'TRANSPORT' | 'SHELTER' | 'WATER';
  name: string;
  quantity: number;
  unit: string;
  location: string;
}

export interface Assignment {
  id: string;
  reportId: string;
  volunteerId: string;
  resourceIds: string[];
  status: TaskStatus;
  eta: string;
  aiPriorityReason: string;
}

export interface DashboardStats {
  totalRequests: number;
  urgentCases: number;
  availableVolunteers: number;
  pendingTasks: number;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'REPORT' | 'ASSIGNMENT' | 'ALERT' | 'SYSTEM';
  message: string;
  urgency?: UrgencyLevel;
}
