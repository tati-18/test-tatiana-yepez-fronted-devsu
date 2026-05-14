export interface Menu {
  label: string;
  icon: string;
  items: MenuItem[];
  separator?: boolean;
  count?: number;
}

export interface MenuItem {
  label: string;
  icon: string;
  routerLink: string[];
  createForm?: boolean;
  idForm?: string;
  visible?: boolean;
}
