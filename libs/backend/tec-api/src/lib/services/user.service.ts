import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto, UpdateUserDto } from '@trip-expense-calculator/api-interfaces';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
