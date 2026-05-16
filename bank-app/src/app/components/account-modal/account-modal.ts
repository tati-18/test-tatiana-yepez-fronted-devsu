import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AccountFormFactory } from '../../helpers/account-form-factory.service';
import { ClientService } from '../../services/clients.service';
import { Account } from '../../interfaces/account.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getError } from '../../helpers/form-errors';
import { Client } from '../../interfaces/client.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-modal.html',
})
export class AccountModal implements OnInit, OnChanges {
  private formFactory = inject(AccountFormFactory);
  private clientService = inject(ClientService);

  @Input() visible = false;
  @Input() account: Account | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Account>();

  form: FormGroup = this.formFactory.build();
  getError = getError;
  clients: Client[] = [];
  loadingClients = false;

  ngOnInit(): void {
    this.loadClients();
  }

  ngOnChanges(): void {
    if (this.account?.accountNumber) {
      this.formFactory.patch(this.form, this.account);
    } else {
      this.formFactory.reset(this.form);
    }
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
