import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../interfaces/general-response.interface';
import { ReporteItem, ReportFilterParams, ReportPdf } from '../interfaces/report.interface';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/reports`;

  getReports(filters: ReportFilterParams): Observable<ApiResponse<ReporteItem>> {
    const params = new HttpParams()
      .set('clienteId', filters.clienteId.toString())
      .set('startDate', filters.startDate)
      .set('endDate', filters.endDate);

    return this.http.get<ApiResponse<ReporteItem>>(this.url, { params });
  }

  getReportPdf(filters: ReportFilterParams): Observable<ApiResponse<string>> {
    const params = new HttpParams()
      .set('clienteId', filters.clienteId.toString())
      .set('startDate', filters.startDate)
      .set('endDate', filters.endDate);

    return this.http.get<ApiResponse<string>>(`${this.url}/download-pdf`, {
      params,
      headers: { 'Cache-Control': 'no-cache' },
    });
  }
}
