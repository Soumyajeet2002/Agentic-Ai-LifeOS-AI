import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Profile,
    ]),
  ],

  controllers: [
    UsersController,
    ProfilesController,
  ],

  providers: [
    UsersService,
    ProfilesService,
  ],

  exports: [
    UsersService,
    ProfilesService,
  ],
})
export class UsersModule {}