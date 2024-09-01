import { Controller, Get, Put, Query } from '@nestjs/common';
import { PageRequest } from 'src/dtos/page-request.dto';
import { PageDto } from 'src/dtos/page.dto';
import { Home } from 'src/entities/home.entity';
import { HomeService } from '../services/home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly service: HomeService) {}

  @Get('find-by-user')
  findByUser(
    @Query('id') userId: number,
    @Query() pageRequest: PageRequest,
  ): Promise<PageDto<Home>> {
    return this.service.findByUserId(userId, pageRequest);
  }

  @Put('update-users')
  updateUsers(
    @Query('id') homeId: number,
    @Query('user-ids') userIds: string,
  ): Promise<string> {
    return this.service.updateUsers(
      homeId,
      userIds.trim().split(',').map(Number),
    );
  }
}
