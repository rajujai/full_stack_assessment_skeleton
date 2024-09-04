import { PageMetaDto } from '@dto/page-meta.dto';
import { PageRequest } from '@dto/page-request.dto';
import { PageDto } from '@dto/page.dto';
import { Home } from '@entities/home.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { Repository } from 'typeorm';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private readonly repository: Repository<Home>,
  ) {}

  async findByUserId(
    userId: number,
    pageRequest: PageRequest,
  ): Promise<PageDto<Home>> {
    const queryBuilder = this.repository
      .createQueryBuilder('home')
      .leftJoin('home.users', 'user')
      .where('user.id = :userId', { userId });
    queryBuilder
      .orderBy('user.createdAt', pageRequest.order)
      .skip(pageRequest.skip)
      .limit(pageRequest.size);

    const itemCount = await queryBuilder.getCount();
    const entities = await queryBuilder.getMany();
    const pageMetaDto = new PageMetaDto({ itemCount, pageRequest });
    return new PageDto(entities, pageMetaDto);
  }

  async updateUsers(homeId: number, userIds: number[]): Promise<Home> {
    const home: Home = await this.repository.findOne({
      where: { id: homeId },
      relations: { users: true },
    });
    if (!home) {
      throw new Error('Home not found');
    }
    const existingUserIds = home.users.map((user) => user.id);
    const userIdsToRemove = existingUserIds.filter(
      (id) => !userIds.includes(id),
    );
    const userIdsToAdd = userIds.filter((id) => !existingUserIds.includes(id));
    if (userIdsToAdd.length > 0 || userIdsToRemove.length > 0) {
      await this.repository
        .createQueryBuilder()
        .relation(Home, 'users')
        .of(homeId)
        .addAndRemove(userIdsToAdd, userIdsToRemove);
    }
    return this.repository.findOne({
      where: { id: homeId },
      relations: { users: true },
    });
  }
}
