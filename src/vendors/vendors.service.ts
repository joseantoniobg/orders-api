import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendors } from './entities/vendors.entity';
import { VendorsRepository } from './repositories/vendors.repository';
import { VendorDto } from './dto/vendor.dto';
import { getNumbersFromString } from '../shared/helpers/helpers.functions';
import { languages, lang } from '../shared/languages/content.lang';

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
    vendorDto.CNPJ = getNumbersFromString(vendorDto.CNPJ);

    const existingVendor = await this.vendorsRepository.findOne({
      CNPJ: vendorDto.CNPJ,
    });

    if (existingVendor) {
      throw new HttpException(languages[lang].SameCNPJ, 403);
    }

    return await this.vendorsRepository.save(vendorDto);
  }
}
