import { ApiProperty } from '@nestjs/swagger';
import { Brand } from '../../brand/entities/brand.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product extends BaseEntity {
  @ApiProperty({
    description: 'autogenerated id for the product',
    example: '6b5abe8c-a71f-4945-a9e8-90859472c50c',
  })
  @PrimaryGeneratedColumn()
  id_product: number;

  @ApiProperty({
    description: 'product barcode',
    example: '5879536679',
    maxLength: 30,
  })
  @Column({ type: 'varchar', length: 30 })
  @Index('ix_bar_code', { unique: true })
  bar_code: string;

  @ApiProperty({
    description: 'product name',
    example: 'Coca-cola',
    maxLength: 100,
  })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({
    description: 'product description',
    example: 'Coca-cola lata 350 ml',
    maxLength: 300,
  })
  @Column({ type: 'varchar', length: 300 })
  description: string;

  @ApiProperty({
    description: 'product current price',
    example: 5.98,
  })
  @Column({ type: 'decimal', scale: 2, precision: 10 })
  current_price: number;

  @ApiProperty({
    description: 'product sale price, if appliccable',
    example: 4.0,
  })
  @Column({ type: 'decimal', scale: 2, precision: 10, nullable: true })
  sale_price: number;

  @JoinColumn({ name: 'id_brand' })
  @ManyToOne(() => Brand, { eager: true })
  brand: Brand;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
