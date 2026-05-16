import { AccountResponse } from './account.interface';

export interface Transaction {
  id: number;
  transactionId: number;
  accountId: number;
  balance: number;
  amount: number;
  transactionType: TransactionType;
  date: string;
}

export interface TransactionResponse {
  id: number;
  transactionId: number;
  accountId: number;
  balance: number;
  amount: number;
  transactionType: TransactionType;
  date: string;
  account: AccountResponse;
}

export type TransactionType = 'CREDIT' | 'DEBIT';
