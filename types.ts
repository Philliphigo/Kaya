export enum ViewState {
  AUTH = 'AUTH',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  CALENDAR = 'CALENDAR',
  PROFILE = 'PROFILE',
  SETTINGS = 'SETTINGS'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  password?: string; 
}

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskCategory = 'work' | 'personal' | 'meeting' | 'health';

export interface Task {
  id: string;
  userId: string; // Linked to User.id
  title: string;
  description?: string;
  startTime: string;
  endTime?: string;
  date: number;
  category: TaskCategory;
  status: TaskStatus;
  duration?: string;
  reminderMinutes?: number;
}

export interface DayActivity {
  day: string;
  hours: number;
}

export interface AppSettings {
  notifications: boolean;
  darkMode: boolean;
  calendarSync: boolean;
  soundEffects: boolean;
}