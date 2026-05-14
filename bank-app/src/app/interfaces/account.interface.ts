export interface Account {
  accountId: number;
  accountNumber: string;
  clientId: number;
  balance: number;
  accountType: AccountType;
  status: boolean;
}

export type AccountType = 'savings' | 'checking' | 'investment';
