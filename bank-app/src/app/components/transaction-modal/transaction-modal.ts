import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TransactionFormFactory } from '../../helpers/transaction-form-factory.service';
import { AccountService } from '../../services/account.service';
import { Transaction } from '../../interfaces/transaction.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getError } from '../../helpers/form-errors';
import { Account } from '../../interfaces/account.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-modal.html',
})
export class TransactionModal implements OnInit, OnChanges {
  private formFactory     = inject(TransactionFormFactory);
  private accountService  = inject(AccountService);

  @Input() visible = false;
  @Input() transaction: Transaction | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save  = new EventEmitter<Transaction>();

  form: FormGroup = this.formFactory.build();
  getError = getError;
  accounts: Account[] = [];
  loadingAccounts = false;

  ngOnInit(): void {
    this.loadAccounts();
  }

  ngOnChanges(): void {
    if (this.transaction?.transactionId) {
      this.formFactory.patch(this.form, this.transaction);
    } else {
      this.formFactory.reset(this.form);
    }
  }

  loadAccounts(): void {
    this.loadingAccounts = true;
    this.accountService.getAllAccounts().subscribe({
      next: (res) => {
        this.accounts = res.data;
        this.loadingAccounts = false;
      },
      error: () => {
        this.loadingAccounts = false;
      },
    });
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!control?.invalid && !!control?.touched;
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.save.emit(this.formFactory.toModel(this.form));
    this.close.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}