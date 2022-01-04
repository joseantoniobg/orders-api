import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/users.repository';
import { UserDto } from './dto/user.dto';
import { encrypt, passwordMatch } from 'src/shared/helpers/helpers.functions';
import { languages, lang } from '../shared/languages/content.lang';
import { Not } from 'typeorm';
import { Users } from './entities/users.entity';
import jwt_decode from 'jwt-decode';
import { RolesRepository } from './repositories/roles.repository';
import { UsersRoles } from './entities/roles.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(RolesRepository)
    private readonly rolesRepository: RolesRepository,
  ) {}

  async add(user: UserDto): Promise<{ id_user: string }> {
    const existingUser = await this.usersRepository.findOne({
      where: [{ login: user.login }, { email: user.email }],
    });

    if (existingUser && existingUser.email === user.email) {
      throw new HttpException(languages[lang].SameEmail, 400);
    }

    if (existingUser && existingUser.login === user.login) {
      throw new HttpException(languages[lang].SameUser, 400);
    }

    user.password = await encrypt(user.password);

    const userReturn = await this.usersRepository.save(user);
    return { id_user: userReturn.id_user };
  }

  async update(user: UserDto): Promise<{ id_user: string }> {
    const existingUser = await this.usersRepository.findOne({
      where: [{ id_user: user.id_user }],
    });

    if (!existingUser) {
      throw new HttpException(languages[lang].UserNotFound, 400);
    }

    const otherUserWithSameEmailOrLogin = await this.usersRepository.findOne({
      where: [
        { email: user.email, id_user: Not(user.id_user) },
        { login: user.login, id_user: Not(user.id_user) },
      ],
    });

    if (otherUserWithSameEmailOrLogin) {
      throw new HttpException(
        otherUserWithSameEmailOrLogin.email === user.email
          ? languages[lang].SameEmail
          : languages[lang].SameUser,
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
  ): Promise<Users> {
    const existingUser = await this.usersRepository.findOne({
      where: [{ login: username }],
    });

    if (existingUser) {
      const match = await passwordMatch(existingUser.password, password);
      if (match) {
        delete existingUser.password;
        return existingUser;
      }
    }
    return null;
  }

  async getAll() {
    return await (
      await this.usersRepository.find()
    ).map((user) => {
      delete user.password;
      return user;
    });
  }

  async getByToken(token: string): Promise<Users> {
    token = token.replace('Bearer ', '');
    const data: any = jwt_decode(token);

    const user = await this.usersRepository.findOne({ id_user: data.id_user });

    if (!user) {
      throw new HttpException(languages[lang].UserNotFound, 400);
    }

    delete user.password;

    return user;
  }

  async getAllRoles(): Promise<UsersRoles[]> {
    return await this.rolesRepository.find();
  }
}
