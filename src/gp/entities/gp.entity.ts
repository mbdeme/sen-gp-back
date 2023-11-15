// gp.entity.ts
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VoyageEntity } from '../../voyage/entites/voyage.entity';
import { UserEntity } from '../../user/entites/user.entity';

@Entity('gp')
export class GpEntity {
  @PrimaryGeneratedColumn()
  gpId: number;

  @Column()
  userId: number;

  @Column()
  voyageId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => VoyageEntity,  { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'voyageId' })
  voyage: VoyageEntity;
}
