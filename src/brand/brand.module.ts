import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandTypeRepository } from './repositories/brand-type.reposity';
import { BrandRepository } from './repositories/brand.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BrandTypeRepository, BrandRepository])],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}
