import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaException } from './AaaException';
import { AaaFilter } from './aaa.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseFilters(AaaFilter) // 路由级别启用AaaFilter 并且在handler里抛了一个AaaException类型的异常 也可以在main.ts中全局启用
  getHello(): string {
    // 启用异常
    throw new AaaException('aaa', 'bbb');
    return this.appService.getHello();
  }
}
