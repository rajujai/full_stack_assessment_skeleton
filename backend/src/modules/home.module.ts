import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeController } from 'src/controllers/home.controller';
import { Home } from 'src/entities/home.entity';
import { HomeService } from 'src/services/home.service';

@Module({
  imports: [TypeOrmModule.forFeature([Home])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
