// user.entity.ts
import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { TimestampEntites } from "../../gp/Generics/timestamp.entites";
import { GpEntity } from '../../gp/entities/gp.entity';
import { UserRoleEnum } from "src/enums/user-role.enum";
import { Exclude } from "class-transformer";

@Entity('users')
export class UserEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user', 'gp'],
    default: 'user',
  })
  role: string;

  @Column({ default: false })
  isGp: boolean;
    
      

}
