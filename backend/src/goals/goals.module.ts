import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { Goal } from './entities/goal.entity';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';

import { Milestone } from './entities/milestone.entity';
import { MilestonesController } from './milestones.controller';
import { MilestonesService } from './milestones.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Goal,
      User,
      Project,
       Milestone,
    ]),
  ],

  controllers: [
    GoalsController,
    MilestonesController,
  ],

  providers: [
    GoalsService,
    MilestonesService,
  ],

  exports: [
    GoalsService,
    MilestonesService,
  ],
})
export class GoalsModule {}