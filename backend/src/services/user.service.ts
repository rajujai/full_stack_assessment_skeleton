import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

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
