import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({
      id: randomUUID(),
      email: createUserDto.email,
      name: createUserDto.name ?? null,
    });

    const savedUser =
      await this.usersRepository.save(user);

    return UserMapper.toResponse(savedUser);
  }

  async findAll() {
    const users = await this.usersRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return UserMapper.toResponseList(users);
  }

  async findOne(id: string) {
    const user =
      await this.usersRepository.findOne({
        where: { id },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return UserMapper.toResponse(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ) {
    const user =
      await this.usersRepository.findOne({
        where: { id },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    if (updateUserDto.email !== undefined) {
      user.email = updateUserDto.email;
    }

    if (updateUserDto.name !== undefined) {
      user.name = updateUserDto.name;
    }

    const updatedUser =
      await this.usersRepository.save(user);

    return UserMapper.toResponse(updatedUser);
  }

  async remove(id: string) {
    const user =
      await this.usersRepository.findOne({
        where: { id },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    await this.usersRepository.remove(user);

    return {
      id,
      deleted: true,
    };
  }
}