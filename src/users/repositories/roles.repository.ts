import { EntityRepository, Repository } from 'typeorm';
import { UsersRoles } from '../entities/roles.entity';
@EntityRepository(UsersRoles)
export class RolesRepository extends Repository<UsersRoles> {}
