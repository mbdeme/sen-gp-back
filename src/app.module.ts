import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { GpModule } from './gp/gp.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoyageModule } from './voyage/voyage.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv'

dotenv.config()
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*entity{.ts,.js}"],
      synchronize: false,
    }),
    TestModule, 
    GpModule, VoyageModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
