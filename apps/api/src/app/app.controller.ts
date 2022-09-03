import { Controller, Get } from '@nestjs/common';

import { Message } from '@trip-expense-calculator/api-interfaces';

@Controller()
export class AppController {
  @Get('healthCheck')
  getHealthCheck(): Message {
    return { message: 'online' };
  }
}
