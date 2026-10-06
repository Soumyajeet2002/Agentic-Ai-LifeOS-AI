import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgentRun } from '../agent-runs/entities/agent-run.entity';

import { AgentEvent } from './entities/agent-event.entity';
import { AgentEventsController } from './agent-events.controller';
import { AgentEventsService } from './agent-events.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AgentEvent,
      AgentRun,
    ]),
  ],
  controllers: [
    AgentEventsController,
  ],
  providers: [
    AgentEventsService,
  ],
  exports: [
    AgentEventsService,
  ],
})
export class AgentEventsModule {}