import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandRepository } from './repositories/brand.repository';
import { createBrandTypeDto } from './dto/create-brand-type.dto';
import { BrandTypeRepository } from './repositories/brand-type.reposity';
import { BrandType } from './entities/brand-type.entity';
import { Brand } from './entities/brand.entity';
import { UpdateResult } from 'typeorm';
import { updateBrandTypeDto } from './dto/update-brand-type.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandRepository) private brandRepository: BrandRepository,
    @InjectRepository(BrandTypeRepository)
    private brandTypeRepository: BrandTypeRepository,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    return await this.brandRepository.save(createBrandDto);
  }

  async createBrandType(
    createBrandTypeDto: createBrandTypeDto,
  ): Promise<BrandType> {
    return await this.brandTypeRepository.save(createBrandTypeDto);
  }

  findAll(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  findAllBrandTypes(): Promise<BrandType[]> {
    return this.brandTypeRepository.find();
  }

  async update(updateBrandDto: UpdateBrandDto): Promise<Brand> {
    return await this.brandRepository.save(updateBrandDto);
  }

  async updateBrandeType(
    updateBrandTypeDto: updateBrandTypeDto,
  ): Promise<BrandType> {
    return await this.brandTypeRepository.save(updateBrandTypeDto);
  }

  async remove(id: number): Promise<UpdateResult> {
    return await this.brandRepository.softDelete(id);
  }

  async removeBrandType(id: number): Promise<UpdateResult> {
    return await this.brandTypeRepository.softDelete(id);
  }
}
