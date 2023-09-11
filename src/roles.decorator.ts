import { SetMetadata } from '@nestjs/common';
import { Role } from './role';

// 定义一个装饰器 它的作用是往修饰的目标上添加roles的metadata
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
