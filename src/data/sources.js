import { Heart, Plane, Gavel, Landmark, MessageSquare, History } from 'lucide-react';

export const LIFE_DIMENSIONS = [
  { 
    id: 'health', label: 'Health', icon: Heart, 
    learns: 'Recovery instructions, appointments, sleep, and physical limits.',
    reassurance: 'Only approved synthetic health signals are used.',
    sources: ['Medical Portal', 'Health App'],
    accent: 'blue',
    signalCount: 4
  },
  { 
    id: 'travel', label: 'Travel', icon: Plane, 
    learns: 'Flights, transit windows, confirmations, and likely locations.',
    reassurance: 'Atlas looks for timing conflicts, not travel habits.',
    sources: ['Google Calendar', 'Gmail', 'Travel App'],
    accent: 'green',
    signalCount: 3
  },
  { 
    id: 'integrity', label: 'Integrity', icon: Gavel, 
    learns: 'Promises, legal duties, signatures, and deadlines that matter.',
    reassurance: 'Obligations stay traceable to evidence.',
    sources: ['Legal Archive', 'Work Notes', 'School Portal'],
    accent: 'yellow',
    signalCount: 5
  },
  { 
    id: 'money', label: 'Money', icon: Landmark, 
    learns: 'Payment windows, valuation exposure, and funding deadlines.',
    reassurance: 'Money signals are summarized, not connected to real accounts.',
    sources: ['Finance App', 'Banking'],
    accent: 'red',
    signalCount: 3
  },
  { 
    id: 'family', label: 'Family', icon: MessageSquare, 
    learns: 'Family needs, school requests, care context, and social plans.',
    reassurance: 'Private context is used only when this area is on.',
    sources: ['Messages', 'School Portal', 'Family Calendar'],
    accent: 'blue',
    signalCount: 5
  },
  { 
    id: 'memory', label: 'Memory', icon: History, 
    learns: 'Past days, receipts, travel history, and remembered context.',
    reassurance: 'Historical answers include confidence and uncertainty.',
    sources: ['Life History'],
    accent: 'green',
    signalCount: 4
  }
];

export const APP_SOURCES = [
  { id: 'calendar', label: 'Google Calendar', dimensions: ['travel', 'family'], learns: 'Appointments, travel windows, and family commitments.' },
  { id: 'gmail', label: 'Gmail', dimensions: ['travel'], learns: 'Flight confirmations, invitations, and notices.' },
  { id: 'medical', label: 'Medical Portal', dimensions: ['health'], learns: 'Procedure instructions, recovery windows, and restrictions.' },
  { id: 'travel_app', label: 'Travel App', dimensions: ['travel'], learns: 'Flight status, boarding times, and delay notices.' },
  { id: 'legal', label: 'Legal Archive', dimensions: ['integrity'], learns: 'Signing rules, clauses, deadlines, and valuation risk.' },
  { id: 'finance', label: 'Finance App', dimensions: ['money'], learns: 'Escrow deadlines, payment status, and exposure.' },
  { id: 'messages', label: 'Messages', dimensions: ['family'], learns: 'Urgent requests, care context, and personal commitments.' },
  { id: 'school', label: 'School Portal', dimensions: ['integrity', 'family'], learns: 'Permission slips, deadlines, and parent alerts.' },
  { id: 'health_app', label: 'Health App', dimensions: ['health'], learns: 'Sleep, recovery capacity, and activity patterns.' },
  { id: 'work_notes', label: 'Work Notes', dimensions: ['integrity'], learns: 'Professional promises, follow-ups, and decisions.' },
  { id: 'life_history', label: 'Life History', dimensions: ['memory'], learns: 'Past locations, receipts, trips, and personal timeline.' }
];
