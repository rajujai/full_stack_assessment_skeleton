import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './services/app.service';
import { Home } from './entities/home.entity';
import { User } from './entities/user.entity';
import { UserModule } from './modules/user.module';
import { AppController } from './controllers/app.controller';
import { HomeModule } from './modules/home.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '6equj5_root',
      database: 'home_db',
      entities: [User, Home],
      synchronize: false,
      logging: true,
    }),
    UserModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
