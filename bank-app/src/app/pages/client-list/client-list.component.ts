import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../components/generic-table/generic-table';
import { ClientService } from '../../services/clients.service';
import { Client } from '../../interfaces/client.interface';
import { TableColumn } from '../../components/interfaces/table.interfaces';
import { CreateClientModal } from '../../components/create-client-modal/create-client-modal';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, GenericTableComponent, CreateClientModal],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  private clientService = inject(ClientService);

  clients: Client[] = [];
  loading = false;
  showForm = false;
  selectedClient: Client | null = null;

  columns: TableColumn[] = [
    { field: 'identification', header: 'Identificación' },
    { field: 'name', header: 'Nombre' },
    { field: 'gender', header: 'Género' },
    { field: 'age', header: 'Edad' },
    { field: 'phone', header: 'Teléfono' },
    { field: 'address', header: 'Dirección' },
    { field: 'status', header: 'Estado', type: 'boolean' },
  ];

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.loading = true;
    this.clientService.getAll().subscribe({
      next: (res) => {
        this.clients = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  openCreate(): void {
    this.selectedClient = null;
    this.showForm = true;
  }

  openEdit(client: Client): void {
    this.selectedClient = { ...client };
    this.showForm = true;
  }

  confirmDelete(client: Client): void {
    if (!confirm(`¿Eliminar a ${client.name}?`)) return;
    this.clientService.delete(client.clientId).subscribe({
      next: () => this.loadClients(),
    });
  }

  onFormClose(saved: boolean): void {
    this.showForm = false;
    if (saved) this.loadClients();
  }
}
