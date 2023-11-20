import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class PgUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column()
  email!: string;
}
