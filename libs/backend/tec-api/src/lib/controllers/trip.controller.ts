import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateTripDto, UpdateTripDto } from '@trip-expense-calculator/api-interfaces';

import { Trip } from '../entities/trip.entity';
import { User } from '../entities/user.entity';
import { TripService } from '../services/trip.service';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post('settle-up')
  async settleUp(
    @Body() { tripId }: { tripId: string },
  ): Promise<{ member?: User; amount: number; payTo?: User }[]> {
    return await this.tripService.settleUp(tripId);
  }

  @Post()
  async create(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return await this.tripService.create(createTripDto);
  }

  @Get()
  async findAll(): Promise<Trip[]> {
    return await this.tripService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<Trip> {
    return await this.tripService.findOne(slug);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto): Promise<Trip> {
    const found = await this.tripService.findOne(id);

    if (!found) throw new NotFoundException();

    return await this.tripService.update(updateTripDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.tripService.remove(id);
  }
}
