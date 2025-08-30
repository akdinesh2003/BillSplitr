export interface Participant {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidById: string;
  date: string;
}

export interface Balance {
  from: string;
  to: string;
  amount: number;
}
