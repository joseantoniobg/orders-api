import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { BrandModule } from '../brand/brand.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './repositories/product.repository';
import { TableModelModule } from '../table-model/table-model.module';

@Module({
  imports: [
    BrandModule,
    TableModelModule,
    TypeOrmModule.forFeature([ProductRepository]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
