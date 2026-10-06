import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from '../projects/entities/project.entity';
import { User } from '../users/entities/user.entity';

import { Conversation } from './entities/conversation.entity';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Conversation,
      User,
      Project,
    ]),
  ],
  controllers: [
    ConversationsController,
  ],
  providers: [
    ConversationsService,
  ],
  exports: [
    ConversationsService,
  ],
})
export class ConversationsModule {}