import { Role } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class SwitchRoleDto {
  @IsEnum(Role)
  role: Role;
}
