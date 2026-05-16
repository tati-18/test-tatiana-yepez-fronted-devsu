import { Client } from "./client.interface";

export interface Account {
  id: number;
  accountNumber: string;
  clientId: number;
  initialBalance: number;
  accountType: AccountType;
  status: boolean;
}

export interface AccountResponse {
  id: number;
  accountNumber: string;
  clientId: number;
  initialBalance: number;
  accountType: AccountType;
  status: boolean;
  client: Client;
}

export type AccountType = 'CREDIT' | 'DEBIT';
