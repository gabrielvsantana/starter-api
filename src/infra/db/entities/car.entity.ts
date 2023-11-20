import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PgUser } from './user.entity';

@Entity({ name: 'cars' })
export class PgCar {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  make!: string;

  @Column()
  model!: string;

  @Column()
  year!: number;

  @Column({ name: 'user_id', nullable: true })
  userId!: string | null;

  @ManyToOne(() => PgUser, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user!: PgUser | null;
}
