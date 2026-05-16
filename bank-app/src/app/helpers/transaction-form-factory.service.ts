import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../interfaces/transaction.interface';

@Injectable({ providedIn: 'root' })
export class TransactionFormFactory {
  private fb = inject(FormBuilder);

  build(): FormGroup {
    return this.fb.group({
      accountId: [null, Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      transactionType: ['CREDIT', Validators.required],
    });
  }

  patch(form: FormGroup, transaction: Transaction): void {
    form.patchValue(transaction);
  }

  reset(form: FormGroup): void {
    form.reset({
      transactionType: 'CREDIT',
      amount: 0,
    });
  }

  toModel(form: FormGroup): Transaction {
    return form.getRawValue();
  }
}
