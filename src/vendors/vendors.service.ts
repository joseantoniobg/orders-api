import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendors } from './entities/vendors.entity';
import { VendorsRepository } from './repositories/vendors.repository';
import { VendorDto } from './dto/vendor.dto';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(VendorsRepository)
    private vendorsRepository: VendorsRepository,
  ) {}

  async getAll(): Promise<Vendors[]> {
    return await this.vendorsRepository.find();
  }

  async getByCnpj(cnpj: string): Promise<Vendors> {
    return await this.vendorsRepository.findOne({ where: { CNPJ: cnpj } });
  }

  async create(vendorDto: VendorDto): Promise<Vendors> {
    return await this.vendorsRepository.save(vendorDto);
  }
}
