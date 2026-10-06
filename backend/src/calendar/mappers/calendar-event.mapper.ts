import { CalendarEvent } from '../entities/calendar-event.entity';

export class CalendarEventMapper {
  static toResponse(event: CalendarEvent) {
    return {
      id: event.id,
      userId: event.userId,
      title: event.title,
      description: event.description,
      startAt: event.startAt,
      endAt: event.endAt,
      timezone: event.timezone,
      location: event.location,
      status: event.status,
      externalId: event.externalId,
      metadata: event.metadata,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }

  static toResponseList(
    events: CalendarEvent[],
  ) {
    return events.map((event) =>
      CalendarEventMapper.toResponse(event),
    );
  }
}