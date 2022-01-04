import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { BrandModule } from '../brand/brand.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandRepository } from '../brand/repositories/brand.repository';
import { ProductRepository } from './repositories/product.repository';

@Module({
  imports: [BrandModule, TypeOrmModule.forFeature([ProductRepository])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
