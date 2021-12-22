import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/users.repository';
import { UserDto } from './dto/user.dto';
import { encrypt, passwordMatch } from 'src/shared/helpers/helpers.functions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async add(user: UserDto): Promise<{ id_user: string }> {
    const existingUser = await this.usersRepository.findOne({
      where: [{ login: user.login }, { email: user.email }],
    });

    if (existingUser && existingUser.email === user.email) {
      throw new HttpException(
        'An user with the same e-mail already exists',
        400,
      );
    }

    if (existingUser && existingUser.login === user.login) {
      throw new HttpException(
        'An user with the same login already exists',
        400,
      );
    }

    user.password = await encrypt(user.password);

    const userReturn = await this.usersRepository.save(user);
    return { id_user: userReturn.id_user };
  }

  async getByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<{ id_user: string }> {
    const existingUser = await this.usersRepository.findOne({
      where: [{ login: username }],
    });

    if (existingUser) {
      const match = await passwordMatch(existingUser.password, password);

      if (match) {
        return { id_user: existingUser.id_user };
      }
    }
    return null;
  }

  async getAll() {
    return await this.usersRepository.find();
  }
}
