import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTripDto, UpdateTripDto } from '@trip-expense-calculator/api-interfaces';
import { Repository } from 'typeorm';

import { Trip } from '../entities/trip.entity';
import { User } from '../entities/user.entity';

export class TripService {
  private readonly SLUG_NUM_MIN = 10000;
  private readonly SLUG_NUM_MAX = 99999;

  constructor(@InjectRepository(Trip) private repository: Repository<Trip>) {}

  async settleUp(tripId: string): Promise<{ member?: User; amount: number; payTo?: User }[]> {
    const debts: { member?: User; amount: number; payTo?: User }[] = [];

    const trip = await this.getOne(tripId);

    if (!trip.expenses.length || !trip.members.length) return [];

    const total = trip.expenses.map((expense) => expense.value).reduce((prev, next) => prev + next);

    const memberCount = trip.members.length;

    const even = total / memberCount;

    const memberExpenses = trip.members.map((member) => ({
      member,
      expense: trip.expenses
        .filter((expense) => expense.userId === member.id)
        ?.map((expense) => expense.value)
        ?.reduce((prev, next) => prev + next, 0),
    }));

    const memberExpensesObj: { [key: string]: number } = memberExpenses.reduce(
      (prev, next) => ({
        ...prev,
        [next.member.id]: next.expense,
      }),
      {},
    );

    const members = Object.keys(memberExpensesObj);

    const sortedMembers = members.sort(
      (personA, personB) => memberExpensesObj[personA] - memberExpensesObj[personB],
    );
    const sortedExpenses = sortedMembers.map((person) => memberExpensesObj[person] - even);

    let i = 0;
    let j = sortedMembers.length - 1;
    let debt;

    while (i < j) {
      debt = Math.min(-sortedExpenses[i], sortedExpenses[j]);
      sortedExpenses[i] += debt;
      sortedExpenses[j] -= debt;

      console.log(`${sortedMembers[i]} owes ${sortedMembers[j]} $${debt}`);
      debts.push({
        member: trip.members.find((member) => member.id === sortedMembers[i]),
        amount: debt,
        payTo: trip.members.find((member) => member.id === sortedMembers[j]),
      });

      if (sortedExpenses[i] === 0) {
        i++;
      }

      if (sortedExpenses[j] === 0) {
        j--;
      }
    }

    return debts;
  }

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
    const result = await this.repository.findOne({
      where: { slug },
      relations: ['members', 'expenses'],
    });

    if (!result) throw new NotFoundException();

    return result;
  }

  async getOne(id: string): Promise<Trip> {
    const result = await this.repository.findOne({
      where: { id },
      relations: ['members', 'expenses'],
    });

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
