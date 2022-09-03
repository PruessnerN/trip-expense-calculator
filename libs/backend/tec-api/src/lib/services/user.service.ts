import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto, UpdateUserDto } from '@trip-expense-calculator/api-interfaces';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.repository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<User> {
    const result = await this.repository.findOne({ where: { id } });

    if (!result) throw new NotFoundException();

    return result;
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    return await this.repository.save(updateUserDto);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.repository.softDelete(id);

    return result.affected === 1;
  }
}
