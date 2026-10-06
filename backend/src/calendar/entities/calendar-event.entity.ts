import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'calendar_events' })
export class CalendarEvent {
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
    type: 'text',
    nullable: true,
  })
  description: string | null;

  @Column({
    name: 'start_at',
    type: 'timestamptz',
  })
  startAt: Date;

  @Column({
    name: 'end_at',
    type: 'timestamptz',
  })
  endAt: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  timezone: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  location: string | null;

  @Column({
    type: 'varchar',
    default: 'confirmed',
  })
  status: string;

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