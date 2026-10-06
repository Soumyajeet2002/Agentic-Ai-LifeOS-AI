import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'agent_runs' })
export class AgentRun {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId: string;

  @Column({
    name: 'conversation_id',
    type: 'uuid',
    nullable: true,
  })
  conversationId: string | null;

  @Column({
    type: 'varchar',
    default: 'pending',
  })
  status: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  input: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  result: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  error: string | null;

  @Column({
    type: 'json',
    nullable: true,
  })
  metadata: Record<string, unknown> | null;

  @Column({
    name: 'started_at',
    type: 'timestamptz',
    nullable: true,
  })
  startedAt: Date | null;

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
}