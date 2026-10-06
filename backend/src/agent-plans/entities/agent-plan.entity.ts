import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'agent_plans' })
export class AgentPlan {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'agent_run_id',
    type: 'uuid',
  })
  agentRunId: string;

  @Column({
    type: 'varchar',
    default: 'draft',
  })
  status: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  summary: string | null;

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