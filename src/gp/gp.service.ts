import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GpEntity } from './entities/gp.entity';
import { Repository } from 'typeorm';
import { AddGpDto } from './dto/Add-gp.dto';
import { UpdateGpDto } from './dto/Update-gp.dto';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { UserService } from 'src/user/user.service';
import { VoyageService } from 'src/voyage/voyage.service';
import { AddVoyageDto } from 'src/voyage/dto/add-voyage.dto';
import { UserEntity } from 'src/user/entites/user.entity';
import { VoyageEntity } from 'src/voyage/entites/voyage.entity';

@Injectable()
export class GpService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(VoyageEntity)
    private readonly voyageRepository: Repository<VoyageEntity>,
    @InjectRepository(GpEntity)
    private readonly gpRepository: Repository<GpEntity>,
  ) {}
  // methode permettant d'ajouter un voyage
  async addVoyageToGp(
    userId: number,
    addVoyageDto: AddVoyageDto,
  ): Promise<void> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.userId = :userId AND user.isGp = :isGp', {
        userId,
        isGp: false,
      })
      .getOne();

    if (!user) {
      throw new NotFoundException(
        `Utilisateur avec l'ID ${userId} et isGp=true non trouvé.`,
      );
    }

    const voyage = this.voyageRepository.create(addVoyageDto);
    const newVoyage = await this.voyageRepository.save(voyage);

    // Créer l'entité GpVoyage
    const gpVoyage = this.gpRepository.create({
      user,
      voyage: newVoyage,
    });

    // Enregistrer l'entité GpVoyage
    await this.gpRepository.save(gpVoyage);
  }


  // methode permettant de retourner tous les voyages
  async getAllVoyages(): Promise<VoyageEntity[]> {
    return this.voyageRepository.find();
  }
  async getGpsWithVoyages(): Promise<GpEntity[]> {
    try {
      return await this.gpRepository.find({ relations: ['voyage', 'user'] });
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des Gp avec voyages :',
        error.message,
      );
      throw error; // Vous pouvez choisir de gérer l'erreur d'une manière spécifique ici
    }
  }


  async getVoyagesByGpId(gpId: number): Promise<GpEntity> {
    try {
      return await this.gpRepository.findOne({
        where: { gpId: gpId },
        relations: ['voyage', 'user'],
      });
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des voyages pour le Gp :',
        error.message,
      );
      throw error;
    }
  }

  
  async deleteVoyageById(voyageId: number){
    try {
        const result = await this.voyageRepository.delete(voyageId);
        if (result.affected === 0) {
          throw new NotFoundException(`Voyage avec l'ID ${voyageId} non trouvé.`);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du voyage :', error.message);
        throw error;
      }
  }


  async updateVoyageById(voyageId, updatedVoyageData: Partial<VoyageEntity>){
    try {
        const updateResult = await this.voyageRepository.update(voyageId, updatedVoyageData);
  
        if (updateResult.affected === 0) {
          throw new NotFoundException(`Voyage avec l'ID ${voyageId} non trouvé.`);
        }
  
        return updateResult;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du voyage :', error.message);
        throw error;
      }
  }





}
