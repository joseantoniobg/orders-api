import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { getDateNow } from '../shared/helpers/helpers.functions';
import { languages, lang } from '../shared/languages/content.lang';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async getApiToken(): Promise<{ accessToken: string }> {
    const accessToken = await this.jwtService.sign({ val: 'mySecretToken' });
    return { accessToken: accessToken };
  }

  async getPartnerApiToken(authDto: AuthCredentialsDto): Promise<TokenDto> {
    const user = await this.usersService.getByUsernameAndPassword(
      authDto.client_id,
      authDto.client_secret,
    );

    if (!user) {
      throw new HttpException(languages[lang].InvalidCredentials, 403);
    }

    const accessToken = await this.jwtService.sign({
      date: getDateNow(),
      val: 'mySecretToken',
      id_user: user.id_user,
    });
    return <TokenDto>{
      user,
      access_token: accessToken,
      expires_in: 3600,
      token_type: 'Bearer',
    };
  }
}
