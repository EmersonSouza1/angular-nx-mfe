export type FiscalObligationStatus =
  | 'OPEN'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'OVERDUE';

export interface FiscalObligation {
  id: string;
  reference: string;
  company: string;
  dueDate: string;
  amount: number;
  status: FiscalObligationStatus;
}
