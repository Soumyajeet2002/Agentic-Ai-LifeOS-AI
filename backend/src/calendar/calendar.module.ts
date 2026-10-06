import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';

import { CalendarEvent } from './entities/calendar-event.entity';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CalendarEvent,
      User,
    ]),
  ],
  controllers: [
    CalendarController,
  ],
  providers: [
    CalendarService,
  ],
  exports: [
    CalendarService,
  ],
})
export class CalendarModule {}