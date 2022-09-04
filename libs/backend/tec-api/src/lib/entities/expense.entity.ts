import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Trip } from './trip.entity';
import { User } from './user.entity';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  tripId: string;

  @Column()
  name: string;

  @Column('double')
  value: number;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @DeleteDateColumn()
  deleted: Date;

  @ManyToOne(() => User, (t) => t.expenses)
  user: User;

  @ManyToOne(() => Trip, (t) => t.expenses)
  trip: Trip;
}
