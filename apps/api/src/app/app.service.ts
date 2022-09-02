import { Injectable } from '@nestjs/common';
import { Message } from '@trip-expense-calculator/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
