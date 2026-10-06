import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';

import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';
import { CalendarEvent } from './entities/calendar-event.entity';
import { CalendarEventMapper } from './mappers/calendar-event.mapper';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(CalendarEvent)
    private readonly calendarEventsRepository: Repository<CalendarEvent>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(
    createCalendarEventDto: CreateCalendarEventDto,
  ) {
    const user =
      await this.usersRepository.findOne({
        where: {
          id: createCalendarEventDto.userId,
        },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const startAt = new Date(
      createCalendarEventDto.startAt,
    );

    const endAt = new Date(
      createCalendarEventDto.endAt,
    );

    if (endAt <= startAt) {
      throw new BadRequestException(
        'endAt must be after startAt',
      );
    }

    const event =
      this.calendarEventsRepository.create({
        id: randomUUID(),
        userId:
          createCalendarEventDto.userId,
        title:
          createCalendarEventDto.title,
        description:
          createCalendarEventDto.description ??
          null,
        startAt,
        endAt,
        timezone:
          createCalendarEventDto.timezone ??
          null,
        location:
          createCalendarEventDto.location ??
          null,
        ...(createCalendarEventDto.status !==
          undefined && {
          status:
            createCalendarEventDto.status,
        }),
        externalId:
          createCalendarEventDto.externalId ??
          null,
        metadata:
          createCalendarEventDto.metadata ??
          null,
      });

    const savedEvent =
      await this.calendarEventsRepository.save(
        event,
      );

    return CalendarEventMapper.toResponse(
      savedEvent,
    );
  }

  async findAll() {
    const events =
      await this.calendarEventsRepository.find({
        order: {
          startAt: 'ASC',
        },
      });

    return CalendarEventMapper.toResponseList(
      events,
    );
  }

  async findOne(id: string) {
    const event =
      await this.calendarEventsRepository.findOne({
        where: { id },
      });

    if (!event) {
      throw new NotFoundException(
        'Calendar event not found',
      );
    }

    return CalendarEventMapper.toResponse(
      event,
    );
  }

  async findByUserId(userId: string) {
    const user =
      await this.usersRepository.findOne({
        where: { id: userId },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const events =
      await this.calendarEventsRepository.find({
        where: { userId },
        order: {
          startAt: 'ASC',
        },
      });

    return CalendarEventMapper.toResponseList(
      events,
    );
  }

  async update(
    id: string,
    updateCalendarEventDto: UpdateCalendarEventDto,
  ) {
    const event =
      await this.calendarEventsRepository.findOne({
        where: { id },
      });

    if (!event) {
      throw new NotFoundException(
        'Calendar event not found',
      );
    }

    const nextStartAt =
      updateCalendarEventDto.startAt !==
      undefined
        ? new Date(
            updateCalendarEventDto.startAt,
          )
        : event.startAt;

    const nextEndAt =
      updateCalendarEventDto.endAt !==
      undefined
        ? new Date(
            updateCalendarEventDto.endAt,
          )
        : event.endAt;

    if (nextEndAt <= nextStartAt) {
      throw new BadRequestException(
        'endAt must be after startAt',
      );
    }

    if (
      updateCalendarEventDto.title !==
      undefined
    ) {
      event.title =
        updateCalendarEventDto.title;
    }

    if (
      updateCalendarEventDto.description !==
      undefined
    ) {
      event.description =
        updateCalendarEventDto.description;
    }

    if (
      updateCalendarEventDto.startAt !==
      undefined
    ) {
      event.startAt = nextStartAt;
    }

    if (
      updateCalendarEventDto.endAt !==
      undefined
    ) {
      event.endAt = nextEndAt;
    }

    if (
      updateCalendarEventDto.timezone !==
      undefined
    ) {
      event.timezone =
        updateCalendarEventDto.timezone;
    }

    if (
      updateCalendarEventDto.location !==
      undefined
    ) {
      event.location =
        updateCalendarEventDto.location;
    }

    if (
      updateCalendarEventDto.status !==
      undefined
    ) {
      event.status =
        updateCalendarEventDto.status;
    }

    if (
      updateCalendarEventDto.externalId !==
      undefined
    ) {
      event.externalId =
        updateCalendarEventDto.externalId;
    }

    if (
      updateCalendarEventDto.metadata !==
      undefined
    ) {
      event.metadata =
        updateCalendarEventDto.metadata;
    }

    const updatedEvent =
      await this.calendarEventsRepository.save(
        event,
      );

    return CalendarEventMapper.toResponse(
      updatedEvent,
    );
  }

  async remove(id: string) {
    const event =
      await this.calendarEventsRepository.findOne({
        where: { id },
      });

    if (!event) {
      throw new NotFoundException(
        'Calendar event not found',
      );
    }

    await this.calendarEventsRepository.remove(
      event,
    );

    return {
      id,
      deleted: true,
    };
  }
}