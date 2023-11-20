import { User } from './user.model';

export class Car {
  id!: number;
  make!: string;
  model!: string;
  year!: number;
  userId!: string | null;
  user!: User | null;
}
