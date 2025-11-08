import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      status: 'ok',
      message: 'API Hotel Ventura funcionando en Railway 🚀',
    };
  }
}
