import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId: string;

  @Column({
    name: 'display_name',
    type: 'varchar',
    nullable: true,
  })
  displayName: string | null;

  @Column({
    name: 'avatar_url',
    type: 'varchar',
    nullable: true,
  })
  avatarUrl: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  timezone: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  locale: string | null;

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