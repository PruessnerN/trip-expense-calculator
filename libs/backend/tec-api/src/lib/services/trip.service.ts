import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTripDto, UpdateTripDto } from '@trip-expense-calculator/api-interfaces';
import { Repository } from 'typeorm';

import { Trip } from '../entities/trip.entity';

export class TripService {
  constructor(@InjectRepository(Trip) private repository: Repository<Trip>) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    return await this.repository.create(createTripDto);
  }

  async findAll(): Promise<Trip[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<Trip> {
    const result = await this.repository.findOne({ where: { id } });

    if (!result) throw new NotFoundException();

    return result;
  }

  async update(updateTripDto: UpdateTripDto): Promise<Trip> {
    return await this.repository.save(updateTripDto);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.repository.softDelete(id);

    return result.affected === 1;
  }
}
