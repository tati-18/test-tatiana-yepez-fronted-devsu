import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MY_ROUTES } from '../../../constants/my-routes.const';

interface MenuItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.menu.html',
  styleUrls: ['./app.menu.scss']
})
export class AppMenuComponent {

  menuItems: MenuItem[] = [
    { label: 'Clientes',      route: MY_ROUTES.clients.path },
    { label: 'Cuentas',       route: MY_ROUTES.accounts.path },
    { label: 'Movimientos',   route: MY_ROUTES.transactions.path },
    { label: 'Reportes',      route: MY_ROUTES.reports.path }
  ];
}