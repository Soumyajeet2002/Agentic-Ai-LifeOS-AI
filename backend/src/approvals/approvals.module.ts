import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgentRun } from '../agent-runs/entities/agent-run.entity';
import { ToolExecution } from '../tool-executions/entities/tool-execution.entity';
import { User } from '../users/entities/user.entity';

import { Approval } from './entities/approval.entity';
import { ApprovalsController } from './approvals.controller';
import { ApprovalsService } from './approvals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Approval,
      User,
      AgentRun,
      ToolExecution,
    ]),
  ],
  controllers: [ApprovalsController],
  providers: [ApprovalsService],
  exports: [ApprovalsService],
})
export class ApprovalsModule {}