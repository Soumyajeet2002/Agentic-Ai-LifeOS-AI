import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'knowledge_chunks' })
export class KnowledgeChunk {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'document_id',
    type: 'uuid',
  })
  documentId: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    type: 'integer',
    default: 0,
  })
  position: number;

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
}