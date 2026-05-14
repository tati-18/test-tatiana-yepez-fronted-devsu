export interface ReporteItem {
  date: string;
  client: string;
  accountNumber: string;
  type: string;
  initialBalance: number;
  status: boolean;
  transaction: number;
  availableBalance: number;
}

export interface ReporteResponse {
  data: ReporteItem[];
  pdfBase64: string;
}
