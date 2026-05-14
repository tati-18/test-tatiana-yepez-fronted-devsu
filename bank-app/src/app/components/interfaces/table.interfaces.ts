export interface TableColumn<T = any> {
  field: string;  
  header: string;
  type?: 'text' | 'badge' | 'boolean' | 'date' | 'currency';
}

export interface TableConfig<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  searchable?: boolean;
}