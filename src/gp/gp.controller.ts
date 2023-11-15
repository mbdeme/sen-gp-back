import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GpService } from './gp.service';
import { GpEntity } from './entities/gp.entity';
import { AddGpDto } from './dto/Add-gp.dto';
import { UpdateGpDto } from './dto/Update-gp.dto';
import { JwtAuthGuard } from 'src/user/Guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorators';
import { AddVoyageDto } from 'src/voyage/dto/add-voyage.dto';
import { VoyageEntity } from 'src/voyage/entites/voyage.entity';

@Controller('gp')
export class GpController {
  constructor(private gpService: GpService) {}


// Ajouter un voyage au GP
  @Post('voyage')
  @UseGuards(JwtAuthGuard)
  addVoyage(@User() user, @Body() addVoyageDto: AddVoyageDto) {
    const userId = user.userId;
    this.gpService.addVoyageToGp(userId, addVoyageDto);
  }

// retourner l'ensemble des voyages
  @Get('voyages')
  async getAllVoyages(): Promise<VoyageEntity[]> {
    return this.gpService.getAllVoyages();
  }


// retourner l'ensemble des GP avec leurs voyages
  @Get('withVoyages')
  getGpWithVoyage(): Promise<GpEntity[]> {
    return this.gpService.getGpsWithVoyages();
  }

// retourner les voyages en fonction du gpId
  @Get(':gpId/voyages')
  getVoyagesByUserId(
    @Param('gpId', ParseIntPipe) gpId: number,
  ): Promise<GpEntity> {
    return this.gpService.getVoyagesByGpId(gpId);
  }


// mettre à jour un voyage avec son id
@Patch('voyage/:voyageId')
updateVoyageById(
    @Param('voyageId', ParseIntPipe) voyageId: number,
    @Body() updatedVoyageData: Partial<VoyageEntity>
){
    this.gpService.updateVoyageById(voyageId,updatedVoyageData);
}


// supprimer un voyage avec son id
  @Delete('voyage/:voyageId')
  deleteVoyageById(
    @Param('voyageId', ParseIntPipe) voyageId: number
  ) {
    return this.gpService.deleteVoyageById(voyageId);
  }
}
