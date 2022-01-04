import { EntityRepository, Repository } from 'typeorm';
import { BrandType } from '../entities/brand-type.entity';

@EntityRepository(BrandType)
export class BrandTypeRepository extends Repository<BrandType> {}
