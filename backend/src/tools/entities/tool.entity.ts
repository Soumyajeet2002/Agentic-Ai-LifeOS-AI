import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'tools' })
export class Tool {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  description: string;

  @Column({
    name: 'input_schema',
    type: 'json',
  })
  inputSchema: Record<string, unknown>;

  @Column({
    name: 'output_schema',
    type: 'json',
    nullable: true,
  })
  outputSchema: Record<string, unknown> | null;

  @Column({
    name: 'risk_level',
    type: 'varchar',
    default: 'low',
  })
  riskLevel: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  enabled: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  createdAt: Date;
}