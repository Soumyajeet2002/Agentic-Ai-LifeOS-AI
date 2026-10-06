import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'tool_executions' })
export class ToolExecution {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'tool_id',
    type: 'uuid',
  })
  toolId: string;

  @Column({
    name: 'agent_run_id',
    type: 'uuid',
  })
  agentRunId: string;

  @Column({
    type: 'varchar',
    default: 'pending',
  })
  status: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  input: Record<string, unknown> | null;

  @Column({
    type: 'json',
    nullable: true,
  })
  output: Record<string, unknown> | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  error: string | null;

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
}