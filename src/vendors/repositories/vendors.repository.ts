import { EntityRepository, Repository } from 'typeorm';
import { Vendors } from '../entities/vendors.entity';
@EntityRepository(Vendors)
export class VendorsRepository extends Repository<Vendors> {}
