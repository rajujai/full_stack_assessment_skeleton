import { PageRequest } from '@dto/page-request.dto';
import { PageDto } from '@dto/page.dto';
import { Home } from '@entities/home.entity';
import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { HomeService } from '@services/home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly service: HomeService) { }

  @Get('find-by-user')
  findByUser(
    @Query('id') userId: number,
    @Query() pageRequest: PageRequest,
  ): Promise<PageDto<Home>> {
    return this.service.findByUserId(userId, pageRequest);
  }

  @Put('update-users/:id')
  updateUsers(
    @Param('id') homeId: number,
    @Body('userIds') userIds: number[],
  ): Promise<Home> {
    return this.service.updateUsers(homeId, userIds);
  }
}
