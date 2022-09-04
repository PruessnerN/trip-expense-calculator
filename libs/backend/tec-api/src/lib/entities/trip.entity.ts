import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Expense } from './expense.entity';
import { User } from './user.entity';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string | null;

  @Column()
  slug: string;

  @Column('datetime')
  startDate: Date;

  @Column('datetime')
  endDate: Date;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @DeleteDateColumn()
  deleted: Date;

  @OneToMany(() => User, (t) => t.trip)
  members: User[];

  @OneToMany(() => Expense, (t) => t.trip)
  expenses: Expense[];
}
