import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { ProfileMapper } from './mappers/profile.mapper';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    const user =
      await this.usersRepository.findOne({
        where: {
          id: createProfileDto.userId,
        },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const profile =
      this.profilesRepository.create({
        id: randomUUID(),
        userId: createProfileDto.userId,
        displayName:
          createProfileDto.displayName ?? null,
        avatarUrl:
          createProfileDto.avatarUrl ?? null,
        timezone:
          createProfileDto.timezone ?? null,
        locale:
          createProfileDto.locale ?? null,
      });

    const savedProfile =
      await this.profilesRepository.save(profile);

    return ProfileMapper.toResponse(savedProfile);
  }

  async findAll() {
    const profiles =
      await this.profilesRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });

    return ProfileMapper.toResponseList(
      profiles,
    );
  }

  async findOne(id: string) {
    const profile =
      await this.profilesRepository.findOne({
        where: { id },
      });

    if (!profile) {
      throw new NotFoundException(
        'Profile not found',
      );
    }

    return ProfileMapper.toResponse(profile);
  }

  async findByUserId(userId: string) {
    const profiles =
      await this.profilesRepository.find({
        where: { userId },
        order: {
          createdAt: 'DESC',
        },
      });

    return ProfileMapper.toResponseList(
      profiles,
    );
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ) {
    const profile =
      await this.profilesRepository.findOne({
        where: { id },
      });

    if (!profile) {
      throw new NotFoundException(
        'Profile not found',
      );
    }

    if (
      updateProfileDto.displayName !==
      undefined
    ) {
      profile.displayName =
        updateProfileDto.displayName;
    }

    if (
      updateProfileDto.avatarUrl !==
      undefined
    ) {
      profile.avatarUrl =
        updateProfileDto.avatarUrl;
    }

    if (
      updateProfileDto.timezone !==
      undefined
    ) {
      profile.timezone =
        updateProfileDto.timezone;
    }

    if (
      updateProfileDto.locale !==
      undefined
    ) {
      profile.locale =
        updateProfileDto.locale;
    }

    const updatedProfile =
      await this.profilesRepository.save(
        profile,
      );

    return ProfileMapper.toResponse(
      updatedProfile,
    );
  }

  async remove(id: string) {
    const profile =
      await this.profilesRepository.findOne({
        where: { id },
      });

    if (!profile) {
      throw new NotFoundException(
        'Profile not found',
      );
    }

    await this.profilesRepository.remove(
      profile,
    );

    return {
      id,
      deleted: true,
    };
  }
}