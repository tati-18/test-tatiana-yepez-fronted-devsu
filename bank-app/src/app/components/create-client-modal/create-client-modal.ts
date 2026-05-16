import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ClientFormFactory } from '../../helpers/client-from-factory.service';
import { getError } from '../../helpers/form-errors';

@Component({
  selector: 'app-create-client-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './create-client-modal.html',
})
export class CreateClientModal implements OnChanges {
  private formFactory = inject(ClientFormFactory);

  @Input() visible = false;
  @Input() client: Client | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Client>();

  form: FormGroup = this.formFactory.build();
  getError = getError;

  ngOnChanges(): void {
    if (this.client?.identification) {
      this.formFactory.patch(this.form, this.client);
    } else {
      this.formFactory.reset(this.form);
    }
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
