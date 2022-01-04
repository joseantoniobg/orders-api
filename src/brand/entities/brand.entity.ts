import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BrandType } from './brand-type.entity';

@Entity('brand')
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_brand: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @JoinColumn({ name: 'id_brand_type' })
  @ManyToOne(() => BrandType, { eager: true })
  brand_type: BrandType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
