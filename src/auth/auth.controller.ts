import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/token')
  @ApiResponse({
    status: 200,
    description: 'Gets the token to perform calls',
  })
  getApiTokenJD(@Body() authData: AuthCredentialsDto) {
    return this.authService.getPartnerApiToken(authData);
  }
}
