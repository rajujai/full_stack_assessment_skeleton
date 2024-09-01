import { User } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findById(userId: number): Promise<User> {
    return this.repository.findOne({
      where: { id: userId },
      relations: { homes: true },
    });
  }

  findByHomeId(homeId: number): Promise<User[]> {
    return this.repository
      .createQueryBuilder('user')
      .leftJoin('user.homes', 'home')
      .where('home.id = :homeId', { homeId })
      .getMany();
  }
}
