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

import { TripService } from '../services/trip.service';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  async create(@Body() createTripDto: CreateTripDto) {
    return await this.tripService.create(createTripDto);
  }

  @Get()
  async findAll() {
    return await this.tripService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tripService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    const found = await this.tripService.findOne(id);

    if (!found) throw new NotFoundException();

    return await this.tripService.update(updateTripDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tripService.remove(id);
  }
}
