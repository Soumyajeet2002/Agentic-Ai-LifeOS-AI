import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'approvals' })
export class Approval {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId: string;

  @Column({
    name: 'agent_run_id',
    type: 'uuid',
  })
  agentRunId: string;

  @Column({
    name: 'tool_execution_id',
    type: 'uuid',
    nullable: true,
  })
  toolExecutionId: string | null;

  @Column({
    type: 'varchar',
  })
  action: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string | null;

  @Column({
    name: 'risk_level',
    type: 'varchar',
    default: 'medium',
  })
  riskLevel: string;

  @Column({
    type: 'varchar',
    default: 'pending',
  })
  status: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({
    name: 'resolved_at',
    type: 'timestamptz',
    nullable: true,
  })
  resolvedAt: Date | null;
}