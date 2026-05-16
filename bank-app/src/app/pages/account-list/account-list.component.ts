import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account } from '../../interfaces/account.interface';
import { TableColumn } from '../../components/interfaces/table.interfaces';
import { GenericTableComponent } from '../../components/generic-table/generic-table';
import { AccountModal } from "../../components/account-modal/account-modal";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-account-list.component',
  imports: [GenericTableComponent, AccountModal, TranslateModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss',
})

export class AccountListComponent implements OnInit {
  private accountService = inject(AccountService);
  private cdr = inject(ChangeDetectorRef);

  accounts: Account[] = [];
  loading = false;
  showForm = false;
  selectedAccount: Account | null = null;

  columns: TableColumn[] = [
    { field: 'accountNumber', header: 'Número de Cuenta' },
    { field: 'clientId', header: 'ID del Cliente' },
    { field: 'initialBalance', header: 'Saldo Inicial' },
    { field: 'accountType', header: 'Tipo de Cuenta' },
    { field: 'status', header: 'Estado', type: 'boolean' },
  ];

  readonly emptyAccount: Account = {
    accountNumber: '',
    clientId: 0,
    initialBalance: 0,
    accountType: 'CREDIT',
    status: true,
    id: 0
  };

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.loading = true;
    this.accountService.getAllAccounts().subscribe({
      next: (res) => {
        this.accounts = res.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  openCreate(): void {
    this.selectedAccount = { ...this.emptyAccount };
    this.showForm = true;
  }

  openEdit(account: Account): void {
    this.selectedAccount = { ...account };
    this.showForm = true;
  }

  confirmDelete(account: Account): void {
    if (!confirm(`¿Eliminar la cuenta ${account.accountNumber}?`)) return;
  }

  onSave(account: Account): void {
    this.loading = true;
    this.accountService.createAccount(account).subscribe({
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
    if (saved) this.loadAccounts();
  }
}
