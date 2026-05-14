export interface Transaction {
  transactionId: number;
  accountId: number;
  balance: number;
  amount: number;
  transactionType: TransactionType;
  date: string;

}

export type TransactionType = 'credit' | 'debit';
