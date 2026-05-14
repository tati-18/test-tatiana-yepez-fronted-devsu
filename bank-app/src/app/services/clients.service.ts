import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Client } from '../interfaces/client.interface';
import { ApiResponse } from '../interfaces/general-response.interface';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/clients`;

  private mockClients: Client[] = [
    {
      clientId: 1,
      name: 'Tatiana Yepez',
      gender: 'F',
      age: 28,
      identification: '0923456789',
      address: 'Guayaquil',
      phone: '0991234567',
      password: '123456',
      status: true,
    },
    {
      clientId: 2,
      name: 'Carlos Mendoza',
      gender: 'M',
      age: 35,
      identification: '0911122233',
      address: 'Quito',
      phone: '0987654321',
      password: 'abc123',
      status: true,
    },
    {
      clientId: 3,
      name: 'Andrea López',
      gender: 'F',
      age: 30,
      identification: '0955566677',
      address: 'Cuenca',
      phone: '0977778888',
      password: 'pass123',
      status: false,
    },
  ];

  getAll(): Observable<ApiResponse<Client[]>> {
    return of({
      status: 200,
      message: 'Clientes obtenidos correctamente',
      data: this.mockClients,
    });
  }

  getById(id: number): Observable<ApiResponse<Client>> {
    const client = this.mockClients.find((c) => c.clientId === id)!;

    return of({
      status: 200,
      message: 'Cliente encontrado',
      data: client,
    });
  }

  create(client: Omit<Client, 'clientId'>): Observable<ApiResponse<Client>> {
    const newClient: Client = {
      ...client,
      clientId: this.mockClients.length + 1,
    };

    this.mockClients.push(newClient);

    return of({
      status: 201,
      message: 'Cliente creado correctamente',
      data: newClient,
    });
  }

  update(id: number, client: Partial<Client>): Observable<ApiResponse<Client>> {
    const index = this.mockClients.findIndex((c) => c.clientId === id);

    this.mockClients[index] = {
      ...this.mockClients[index],
      ...client,
    };

    return of({
      status: 200,
      message: 'Cliente actualizado correctamente',
      data: this.mockClients[index],
    });
  }

  delete(id: number): Observable<ApiResponse<void>> {
    this.mockClients = this.mockClients.filter((c) => c.clientId !== id);

    return of({
      status: 200,
      message: 'Cliente eliminado correctamente',
      data: undefined,
    }).pipe(delay(300));
  }
}
