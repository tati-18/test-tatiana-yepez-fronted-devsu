import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../interfaces/general-response.interface';
import { Account } from '../interfaces/account.interface';
import { Transaction, TransactionResponse } from '../interfaces/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/transactions`;

  getAllTransactions(): Observable<ApiResponse<TransactionResponse[]>> {
    return this.http.get<ApiResponse<TransactionResponse[]>>(this.url);
  }

  createTransaction(transaction: Transaction): Observable<ApiResponse<Transaction>> {
    return this.http.post<ApiResponse<Transaction>>(this.url, transaction);
  }
}
