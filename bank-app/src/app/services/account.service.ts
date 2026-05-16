import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../interfaces/general-response.interface';
import { Account } from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/accounts`;

  getAllAccounts(): Observable<ApiResponse<Account[]>> {
    return this.http.get<ApiResponse<Account[]>>(this.url);
  }

  createAccount(account: Account): Observable<ApiResponse<Account>> {
    return this.http.post<ApiResponse<Account>>(this.url, account);
  }
}
