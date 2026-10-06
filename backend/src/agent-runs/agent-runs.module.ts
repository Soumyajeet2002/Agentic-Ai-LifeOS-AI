import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';
import { Conversation } from '../conversations/entities/conversation.entity';

import { AgentRun } from './entities/agent-run.entity';
import { AgentRunsController } from './agent-runs.controller';
import { AgentRunsService } from './agent-runs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AgentRun,
      User,
      Conversation,
    ]),
  ],
  controllers: [
    AgentRunsController,
  ],
  providers: [
    AgentRunsService,
  ],
  exports: [
    AgentRunsService,
  ],
})
export class AgentRunsModule {}