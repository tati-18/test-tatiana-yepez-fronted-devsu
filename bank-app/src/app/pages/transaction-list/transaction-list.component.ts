import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../interfaces/transaction.interface';
import { TableColumn } from '../../components/interfaces/table.interfaces';
import { GenericTableComponent } from '../../components/generic-table/generic-table';
import { TransactionModal } from '../../components/transaction-modal/transaction-modal';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-list.component',
  imports: [GenericTableComponent, TransactionModal, TranslateModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent {
  private transactionService = inject(TransactionService);
  private cdr = inject(ChangeDetectorRef);

  transactions: Transaction[] = [];
  loading = false;
  showForm = false;
  selectedTransaction: Transaction | null = null;

  columns: TableColumn[] = [
    { field: 'id', header: 'ID de Transacción' },
    { field: 'account.accountNumber', header: 'ID de Cuenta' },
    { field: 'balance', header: 'Saldo' },
    { field: 'amount', header: 'Monto' },
    { field: 'transactionType', header: 'Tipo de Transacción' },
    { field: 'date', header: 'Fecha' },
  ];

  readonly emptyTransaction: Transaction = {
    transactionId: 0,
    accountId: 0,
    balance: 0,
    amount: 0,
    transactionType: 'CREDIT',
    id: 0,
    date: '',
  };

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading = true;
    this.transactionService.getAllTransactions().subscribe({
      next: (res) => {
        this.transactions = res.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  openCreate(): void {
    this.selectedTransaction = { ...this.emptyTransaction };
    this.showForm = true;
  }

  openEdit(transaction: Transaction): void {
    this.selectedTransaction = { ...transaction };
    this.showForm = true;
  }

  confirmDelete(transaction: Transaction): void {
    if (!confirm(`¿Eliminar la transacción ${transaction.transactionId}?`)) return;
  }

  onSave(transaction: Transaction): void {
    this.loading = true;
    this.transactionService.createTransaction(transaction).subscribe({
      next: () => {
        this.onFormClose(true);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onFormClose(saved: boolean): void {
    this.showForm = false;
    if (saved) this.loadTransactions();
  }
}
