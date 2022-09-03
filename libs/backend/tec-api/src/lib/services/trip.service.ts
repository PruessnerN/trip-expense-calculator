import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTripDto, UpdateTripDto } from '@trip-expense-calculator/api-interfaces';
import { Repository } from 'typeorm';

import { Trip } from '../entities/trip.entity';

export class TripService {
  private readonly SLUG_NUM_MIN = 10000;
  private readonly SLUG_NUM_MAX = 99999;

  constructor(@InjectRepository(Trip) private repository: Repository<Trip>) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    return await this.repository.save({
      ...createTripDto,
      slug: this.generateSlug(createTripDto.name),
    });
  }

  async findAll(): Promise<Trip[]> {
    return await this.repository.find();
  }

  async findOne(slug: string): Promise<Trip> {
    const result = await this.repository.findOne({ where: { slug } });

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

  private generateSlug(name: string): string {
    const num =
      Math.floor(Math.random() * (this.SLUG_NUM_MAX - this.SLUG_NUM_MIN + 1)) + this.SLUG_NUM_MIN;

    return (
      name
        .toLocaleLowerCase()
        .replace(' ', '-')
        .replace(/[^a-zA-Z0-9-]/g, '') + `-${num}`
    );
  }
}
