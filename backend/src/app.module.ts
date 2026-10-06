import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/configuration';
import { createDatabaseConfig } from './database/database.config';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import {ProjectsModule} from './projects/projects.module'
import { GoalsModule } from './goals/goals.module';
import { TasksModule } from './tasks/tasks.module';
import { ConversationsModule } from './conversations/conversations.module';
import {MessagesModule} from './messages/messages.module'
import {CalendarModule} from './calendar/calendar.module'
import {KnowledgeModule} from './knowledge/knowledge.module'
import { MemoryModule } from './memory/memory.module';
import {ToolsModule} from './tools/tools.module'
import {AgentRunsModule} from './agent-runs/agent-runs.module'
import {AgentEventsModule} from './agent-events/agent-events.module'
import {ToolExecutionsModule} from './tool-executions/tool-executions.module'
import {ApprovalsModule} from './approvals/approvals.module'
import {AgentPlansModule} from './agent-plans/agent-plans.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      envFilePath: ['.env'],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        createDatabaseConfig(configService),
    }),
    HealthModule,
    UsersModule,
    ProjectsModule,
    GoalsModule,
    TasksModule,
    ConversationsModule,
    MessagesModule,
    CalendarModule,
    KnowledgeModule,
    MemoryModule,
    ToolsModule,
    AgentRunsModule,
    AgentEventsModule,
    ToolExecutionsModule,
    ApprovalsModule,
    AgentPlansModule
  ],
})
export class AppModule {}