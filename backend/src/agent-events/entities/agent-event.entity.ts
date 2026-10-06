import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'agent_events' })
export class AgentEvent {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'agent_run_id',
    type: 'uuid',
  })
  agentRunId: string;

  @Column({
    name: 'event_type',
    type: 'varchar',
  })
  eventType: string;

  @Column({
    type: 'integer',
  })
  sequence: number;

  @Column({
    type: 'json',
    nullable: true,
  })
  payload: Record<string, unknown> | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  createdAt: Date;
}