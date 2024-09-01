import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/dtos/page-meta.dto';
import { PageDto } from 'src/dtos/page.dto';
import { Repository } from 'typeorm';
import { PageRequest } from '../dtos/page-request.dto';
import { Home } from '../entities/home.entity';

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
      // .orderBy("user.createdAt", pageRequest.order)
      .skip(pageRequest.skip)
      .take(pageRequest.size);

    const itemCount = await queryBuilder.getCount();
    const entities = await queryBuilder.getRawMany();
    const pageMetaDto = new PageMetaDto({ itemCount, pageRequest });
    return new PageDto(entities, pageMetaDto);
  }

  async updateUsers(homeId: number, userIds: number[]): Promise<string> {
    const home: Home = await this.repository.findOne({
      where: { id: homeId },
      relations: { users: true },
    });
    const existingUserIds = home.users.map((user) => user.id);
    const userIdsToremove = existingUserIds.filter(
      (id) => !userIds.includes(id),
    );
    const userIdsToAdd = userIds.filter((id) => !existingUserIds.includes(id));

    this.repository
      .createQueryBuilder()
      .relation(Home, 'users')
      .of(homeId)
      .addAndRemove(userIdsToAdd, userIdsToremove);
    return 'Users updated in home ' + homeId;
  }
}
