import { Person } from './person.interface';

export interface Client extends Person {
  clientId: number;
  password: string;
  status: boolean;
}
