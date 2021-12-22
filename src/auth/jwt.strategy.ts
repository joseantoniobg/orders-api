import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { HttpException, Injectable } from '@nestjs/common';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    try {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtConstants.secret,
      });
    } catch (error) {
      throw new HttpException('Unauthorized', 403);
    }
  }

  async validate(payload: any) {
    const { val } = payload;
    if (val !== 'mySecretToken') {
      throw new HttpException('Invalid Token', 400);
    }
    return { val };
  }
}
