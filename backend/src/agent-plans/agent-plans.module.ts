import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgentRun } from '../agent-runs/entities/agent-run.entity';

import { AgentPlan } from './entities/agent-plan.entity';
import { AgentPlansController } from './agent-plans.controller';
import { AgentPlansService } from './agent-plans.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AgentPlan,
      AgentRun,
    ]),
  ],
  controllers: [AgentPlansController],
  providers: [AgentPlansService],
  exports: [AgentPlansService],
})
export class AgentPlansModule {}