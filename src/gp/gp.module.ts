import { Module } from '@nestjs/common';
import { GpController } from './gp.controller';
import { GpService } from './gp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GpEntity } from './entities/gp.entity';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/entites/user.entity';
import { VoyageEntity } from 'src/voyage/entites/voyage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GpEntity, UserEntity, VoyageEntity]),
    UserModule,
  ],
  controllers: [GpController],
  providers: [GpService],
})
export class GpModule {}
