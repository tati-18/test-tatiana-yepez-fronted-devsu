import { AccountType } from "./account.interface";

export interface ReporteItem {
  clienteId: number;
  name: string;
  identificacion: string;
  startDate: string;
  endDate: string;
  accounts: AccountReporteItem[];
}

export interface AccountReporteItem {
  accountNumber: string;
  accountType: AccountType;
  initialBalance: number;
  currentBalance: number;
  creditTotal: number;
  debitTotal: number;
  movements: MovementsReport[];
}

export interface MovementsReport{
  date: string;
  transactionType: string;
  balance: number;
  amount: number;
}

export interface ReportPdf {
   pdfBase64: string;
}

export interface ReportFilterParams {
  clienteId: number;
  startDate: string; 
  endDate: string;  
}
