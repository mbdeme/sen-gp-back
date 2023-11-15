import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entites/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRoleEnum } from 'src/enums/user-role.enum';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  async register(userData: UserSubscribeDto): Promise<Partial<UserEntity>> {
    console.log('UserData before create:', userData);
    const user = this.userRepository.create({
      ...userData, // récupère toutes les informations de userData
    });
    user.salt = await bcrypt.genSalt(); // le genSalt() est une fonction asynchrone donc on doit attendre le resultat
    user.password = await bcrypt.hash(user.password, user.salt);
    console.log('user', user);

    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(
        `Le username et le password doivent être unique`,
      );
    }
    return {
      userId: user.userId,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedt: user.updatedt,
      email: user.email,
    };
  }

  // async login(credentials: LoginCredentialsDto): Promise<Partial<UserEntity>> {  on change le type de retour
  async login(credentials: LoginCredentialsDto) {
    const { username, password } = credentials;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username or user.email = :username', {
        username,
      })
      .getOne();

    if (!user) throw new NotFoundException('username ou password erronnée');
    const hashedPassword = await bcrypt.hash(password, user.salt);

    if (hashedPassword === user.password) {
      const payload = {
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const jwt = await this.jwtService.sign(payload);
      return {
        access_token: jwt,
      };
    } else {
      throw new NotFoundException('username ou password eronnée');
    }
  }

  isOwnerOrAdmin(objet, user) {
    return (
      user.role === UserRoleEnum.ADMIN ||
      (objet.user && objet.user.id === user.id)
    );
  }
}
