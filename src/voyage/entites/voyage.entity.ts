import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GpEntity } from "../../gp/entities/gp.entity";
import { TimestampEntites } from "src/gp/Generics/timestamp.entites";


@Entity('gp_voyages')
export class VoyageEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  departureDate: Date;

  @Column()
  arrivalDate: Date;

  @Column()
  departureLocation: string;

  @Column()
  arrivalLocation: string;

  @Column()
  airline: string;

  @Column()
  weightKilos: number;
} 