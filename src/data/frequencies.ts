import { Frequency, ReminderOption } from '../types';

export const FREQUENCIES: Frequency[] = [
  { id: 'weekly', name: 'Weekly' },
  { id: 'monthly', name: 'Monthly' },
  { id: 'annually', name: 'Annually' },
];

export const REMINDER_OPTIONS: ReminderOption[] = [
  { id: 'same_day', name: 'Same day', value: 0 },
  { id: '1_day', name: '1 day before', value: 1 },
  { id: '2_days', name: '2 days before', value: 2 },
  { id: '3_days', name: '3 days before', value: 3 },
  { id: '1_week', name: '1 week before', value: 7 },
];

