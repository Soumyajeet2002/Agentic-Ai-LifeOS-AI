import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Goal } from '../goals/entities/goal.entity';
import { Milestone } from '../goals/entities/milestone.entity';
import { Project } from '../projects/entities/project.entity';
import { User } from '../users/entities/user.entity';

import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task,
      User,
      Project,
      Goal,
      Milestone,
    ]),
  ],
  controllers: [
    TasksController,
  ],
  providers: [
    TasksService,
  ],
  exports: [
    TasksService,
  ],
})
export class TasksModule {}