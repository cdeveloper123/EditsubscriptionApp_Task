export interface App {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Frequency {
  id: string;
  name: string;
}

export interface ReminderOption {
  id: string;
  name: string;
  value: number;
}

export interface Subscription {
  app: App | null;
  amount: number;
  category: Category | null;
  startDate: Date;
  frequency: Frequency | null;
  remindMe: ReminderOption | null;
  active: boolean;
}

