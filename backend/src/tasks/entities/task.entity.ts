import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId: string;

  @Column({
    name: 'project_id',
    type: 'uuid',
    nullable: true,
  })
  projectId: string | null;

  @Column({
    name: 'goal_id',
    type: 'uuid',
    nullable: true,
  })
  goalId: string | null;

  @Column({
    name: 'milestone_id',
    type: 'uuid',
    nullable: true,
  })
  milestoneId: string | null;

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
    type: 'varchar',
    default: 'medium',
  })
  priority: string;

  @Column({
    name: 'due_at',
    type: 'timestamptz',
    nullable: true,
  })
  dueAt: Date | null;

  @Column({
    name: 'completed_at',
    type: 'timestamptz',
    nullable: true,
  })
  completedAt: Date | null;

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