import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'knowledge_documents' })
export class KnowledgeDocument {
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
  title: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  source: string | null;

  @Column({
    name: 'content_type',
    type: 'varchar',
    nullable: true,
  })
  contentType: string | null;

  @Column({
    name: 'external_id',
    type: 'varchar',
    nullable: true,
  })
  externalId: string | null;

  @Column({
    type: 'json',
    nullable: true,
  })
  metadata: Record<string, unknown> | null;

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