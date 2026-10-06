import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Conversation } from '../conversations/entities/conversation.entity';

import { Message } from './entities/message.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Message,
      Conversation,
    ]),
  ],
  controllers: [
    MessagesController,
  ],
  providers: [
    MessagesService,
  ],
  exports: [
    MessagesService,
  ],
})
export class MessagesModule {}