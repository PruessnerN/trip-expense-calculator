import { InjectRepository } from '@nestjs/typeorm';

import { CreateTripDto, UpdateTripDto } from '@trip-expense-calculator/api-interfaces';
import { Repository } from 'typeorm';

import { Trip } from '../entities/trip.entity';

export class TripService {
  constructor(@InjectRepository(Trip) private repository: Repository<Trip>) {}

  create(createTripDto: CreateTripDto) {
    return this.repository.create(createTripDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: string, updateTripDto: UpdateTripDto) {
    return this.repository.update(id, updateTripDto);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
