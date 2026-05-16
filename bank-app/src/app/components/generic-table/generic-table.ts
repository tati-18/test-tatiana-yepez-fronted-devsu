import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableColumn } from '../interfaces/table.interfaces';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './generic-table.html',
  styleUrls: ['./generic-table.scss'],
})
export class GenericTableComponent<T extends Record<string, any>> implements OnChanges {
  @Input() columns: TableColumn<T>[] = [];
  @Input() data: T[] = [];
  @Input() loading: boolean = false;
  @Input() searchable: boolean = true;
  @Input() showActions: boolean = true;

  @Output() onEdit = new EventEmitter<T>();
  @Output() onDelete = new EventEmitter<T>();

  searchTerm: string = '';
  filteredData: T[] = [];

  ngOnChanges(): void {
    this.filteredData = [...this.data];
    this.searchTerm = '';
  }

  search(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredData = [...this.data];
      return;
    }
    this.filteredData = this.data.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(term)),
    );
  }

  getValue(row: T, field: string): any {
    return field.split('.').reduce((obj, key) => obj?.[key], row as any);
  }

  edit(row: T): void {
    this.onEdit.emit(row);
  }
  delete(row: T): void {
    this.onDelete.emit(row);
  }
}
