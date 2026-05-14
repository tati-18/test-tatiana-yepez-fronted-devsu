import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppMenuComponent } from "./layout/components/menu/app.menu";
import { TopbarComponent } from "./layout/components/topbar/topbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppMenuComponent, TopbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bank-app');
}
