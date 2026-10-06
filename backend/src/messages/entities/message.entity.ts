import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'conversation_id',
    type: 'uuid',
  })
  conversationId: string;

  @Column({
    type: 'varchar',
  })
  role: string;

  @Column({
    type: 'text',
  })
  content: string;

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