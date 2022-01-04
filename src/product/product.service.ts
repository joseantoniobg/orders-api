import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { TableModelService } from '../table-model/table-model.service';
import { TableModel } from '../table-model/entities/table-model.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    private tableModelService: TableModelService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productRepository.save(createProductDto);
  }

  async findAll(): Promise<{ products: Product[]; model: TableModel[] }> {
    const model = await this.tableModelService.findOne('product');
    const products = await this.productRepository.find();
    return { model, products };
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepository.save({
      id_product: id,
      ...updateProductDto,
    });
  }

  async remove(id: number): Promise<UpdateResult> {
    return await this.productRepository.softDelete(id);
  }
}
