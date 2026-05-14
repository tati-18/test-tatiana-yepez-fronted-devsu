import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-create-client-modal',
  standalone: true,

  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './create-client-modal.html',
  styleUrl: './create-client-modal.scss',
})
export class CreateClientModal {
  @Input() visible = false;

  @Input() client: Client = {
    clientId: 0,
    name: '',
    gender: 'M',
    age: 18,
    identification: '',
    address: '',
    phone: '',
    password: '',
    status: true,
  };

  @Output() close = new EventEmitter<void>();

  @Output() save = new EventEmitter<Client>();

  onSave(): void {
    this.save.emit(this.client);
  }

  onClose(): void {
    this.close.emit();
  }
}
