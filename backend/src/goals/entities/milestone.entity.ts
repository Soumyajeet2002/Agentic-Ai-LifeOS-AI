import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'milestones' })
export class Milestone {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'goal_id',
    type: 'uuid',
  })
  goalId: string;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string | null;

  @Column({
    type: 'varchar',
    default: 'pending',
  })
  status: string;

  @Column({
    type: 'integer',
    default: 0,
  })
  position: number;

  @Column({
    name: 'due_at',
    type: 'timestamptz',
    nullable: true,
  })
  dueAt: Date | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  updatedAt: Date;
}