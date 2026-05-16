import { ChangeDetectorRef, Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { ReporteItem } from '../../interfaces/report.interface';
import { buildReportFileName, downloadPdfFromBase64 } from '../../utils/utils';
import { ClientService } from '../../services/clients.service';
import { Client } from '../../interfaces/client.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-report-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.scss',
})
export class ReportViewComponent {
  private reportService = inject(ReportService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);

  reports = signal<ReporteItem[]>([]);
  loadingReport = signal(false);
  loadingPdf = signal(false);
  errorMessage = signal<string | null>(null);
  searched = signal(false);
  clients: Client[] = [];

  expandedAccountKey = signal<string | null>(null);

  filterForm: FormGroup = this.fb.group({
    clienteId: [null, [Validators.required, Validators.min(1)]],
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
  });

  totalAccounts = computed(() => this.reports().reduce((sum, r) => sum + r.accounts.length, 0));
  loadingClients = false;
  totalMovements = computed(() => {
    return this.reports().reduce((sum, r) => {
      return (
        sum +
        r.accounts.reduce((a, acc) => {
          return a + (acc.movements?.length ?? 0);
        }, 0)
      );
    }, 0);
  });

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.loadingClients = true;
    this.clientService.getAll().subscribe({
      next: (res) => {
        this.clients = res.data;
        this.loadingClients = false;
      },
      error: () => {
        this.loadingClients = false;
      },
    });
  }

  onSearch(): void {
    if (this.filterForm.invalid) {
      this.filterForm.markAllAsTouched();
      return;
    }

    const { clienteId, startDate, endDate } = this.filterForm.value;

    this.loadingReport.set(true);
    this.errorMessage.set(null);
    this.reports.set([]);
    this.searched.set(true);

    this.reportService.getReports({ clienteId, startDate, endDate }).subscribe({
      next: (res) => {
        console.log(res.data);

        this.reports.set(res.data ? [res.data] : []);

        this.loadingReport.set(false);
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message ?? 'Error al obtener el reporte.');
        this.loadingReport.set(false);
        this.cdr.markForCheck();
      },
    });
  }

  onDownloadPdf(): void {
    if (this.filterForm.invalid) {
      this.filterForm.markAllAsTouched();
      return;
    }

    const { clienteId, startDate, endDate } = this.filterForm.value;

    this.loadingPdf.set(true);
    this.errorMessage.set(null);

    this.reportService.getReportPdf({ clienteId, startDate, endDate }).subscribe({
      next: (res) => {
        const fileName = buildReportFileName('estado-cuenta', clienteId);
        downloadPdfFromBase64(res.data, fileName);
        this.loadingPdf.set(false);
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message ?? 'Error al generar el PDF.');
        this.loadingPdf.set(false);
        this.cdr.markForCheck();
      },
    });
  }

  toggleAccount(key: string): void {
    this.expandedAccountKey.set(this.expandedAccountKey() === key ? null : key);
  }

  isAccountExpanded(key: string): boolean {
    return this.expandedAccountKey() === key;
  }

  onReset(): void {
    this.filterForm.reset();
    this.reports.set([]);
    this.errorMessage.set(null);
    this.searched.set(false);
    this.expandedAccountKey.set(null);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('es-EC', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  accountKey(clienteId: number, accountNumber: string): string {
    return `${clienteId}-${accountNumber}`;
  }

  isFieldInvalid(field: string): boolean {
    const control = this.filterForm.get(field);
    return !!(control && control.invalid && control.touched);
  }
}
