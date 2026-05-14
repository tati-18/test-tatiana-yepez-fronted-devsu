import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.scss'],
})
export class TopbarComponent {
  currentDate: Date = new Date();

  breadcrumbMap: Record<string, string> = {
    '/clients': 'Clientes',
    '/accounts': 'Cuentas',
    '/transactions': 'Movimientos',
    '/reports': 'Reportes',
  };

  constructor(private router: Router) {}

  get currentPage(): string {
    return this.breadcrumbMap[this.router.url] ?? 'Inicio';
  }
}
