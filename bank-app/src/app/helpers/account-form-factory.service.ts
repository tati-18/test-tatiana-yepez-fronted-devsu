import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../interfaces/account.interface';

@Injectable({ providedIn: 'root' })
export class AccountFormFactory {
  private fb = inject(FormBuilder);

  build(): FormGroup {
    return this.fb.group({
      accountNumber: ['', [Validators.required]],
      clientId: [0, [Validators.required]],
      initialBalance: [0, [Validators.required, Validators.min(0)]],
      accountType: ['savings', Validators.required],
      status: [true],
    });
  }

  patch(form: FormGroup, account: Account): void {
    form.patchValue(account);
  }

  reset(form: FormGroup): void {
    form.reset({ accountType: 'savings', initialBalance: 0, status: true });
  }

  toModel(form: FormGroup): Account {
    return form.getRawValue();
  }
}
