import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'memories' })
export class Memory {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId: string;

  @Column({
    type: 'varchar',
  })
  type: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    type: 'integer',
    default: 5,
  })
  importance: number;

  @Column({
    type: 'double precision',
    default: 1,
  })
  confidence: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  source: string | null;

  @Column({
    name: 'expires_at',
    type: 'timestamptz',
    nullable: true,
  })
  expiresAt: Date | null;

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