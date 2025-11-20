export enum ViewState {
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  CALENDAR = 'CALENDAR'
}

export interface User {
  name: string;
  avatar: string;
}

export interface StatMetric {
  label: string;
  value: number;
  icon: string;
  color: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  attendees: User[];
  category: 'work' | 'personal' | 'meeting';
}

export interface DayActivity {
  day: string;
  hours: number;
}

export interface AISuggestion {
  title: string;
  description: string;
  estimatedDuration: string;
}