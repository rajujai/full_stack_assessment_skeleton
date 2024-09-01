import { User } from '@entities/user.entity';
import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from '@services/user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) { }

  @Get('all')
  findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Get('find-by-home')
  findByHome(@Query('id') homeId: number): Promise<User[]> {
    console.log('homeId', homeId);

    return this.service.findByHomeId(homeId);
  }
}
