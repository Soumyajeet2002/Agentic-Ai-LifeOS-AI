import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgentRun } from '../agent-runs/entities/agent-run.entity';
import { Tool } from '../tools/entities/tool.entity';

import { ToolExecution } from './entities/tool-execution.entity';
import { ToolExecutionsController } from './tool-executions.controller';
import { ToolExecutionsService } from './tool-executions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ToolExecution,
      Tool,
      AgentRun,
    ]),
  ],
  controllers: [ToolExecutionsController],
  providers: [ToolExecutionsService],
  exports: [ToolExecutionsService],
})
export class ToolExecutionsModule {}