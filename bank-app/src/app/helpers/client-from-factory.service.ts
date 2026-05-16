import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../interfaces/client.interface';
import { ClientValidators } from '../validators/client-validator.helpers';

@Injectable({ providedIn: 'root' })
export class ClientFormFactory {
  private fb = inject(FormBuilder);

  build(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), ClientValidators.noWhitespace()]],
      gender: ['M', Validators.required],
      age: [18, [Validators.required, ClientValidators.minAge(1), ClientValidators.maxAge(120)]],
      identification: [
        '',
        [Validators.required, ClientValidators.onlyNumbers(), ClientValidators.exactLength(10)],
      ],
      address: ['', [Validators.required, ClientValidators.noWhitespace()]],
      phone: [
        '',
        [Validators.required, ClientValidators.onlyNumbers(), ClientValidators.exactLength(10)],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
      status: [true],
    });
  }

  patch(form: FormGroup, client: Client): void {
    form.patchValue(client);
  }

  reset(form: FormGroup): void {
    form.reset({ gender: 'M', age: 18, status: true });
  }

  toModel(form: FormGroup): Client {
    const { identification, ...rest } = form.getRawValue();
    return {
      ...rest,
      identification,
      clientId: Number(identification),
    };
  }
}
