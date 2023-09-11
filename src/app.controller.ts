import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaException } from './AaaException';
import { AaaFilter } from './aaa.filter';
import { AaaGuard } from './aaa.guard';
import { Roles } from './roles.decorator';
import { Role } from './role';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseFilters(AaaFilter) // 路由级别启用AaaFilter 并且在handler里抛了一个AaaException类型的异常 也可以在main.ts中全局启用
  @UseGuards(AaaGuard)
  @Roles(Role.Admin) // 这里在handler上添加这个装饰器 参数为admin 也就是给这个handler添加了一个roles为admin的metadata
  getHello(): string {
    // 启用异常
    throw new AaaException('aaa', 'bbb');
    return this.appService.getHello();
  }
}
