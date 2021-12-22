import { ApiProperty } from '@nestjs/swagger';
import { UsersRoles } from '../entities/roles.entity';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'The id for the user',
    example: '6b5abe8c-a71f-4945-a9e8-90859472c50c',
  })
  @IsUUID()
  @IsOptional()
  id_user: string;

  @ApiProperty({
    description: 'The login for the user',
    example: 'joseantoniobg',
  })
  @IsString()
  @MaxLength(50)
  login: string;

  @ApiProperty({
    description: 'The email for the user',
    example: 'joseantoniobg@jabg.com.br',
  })
  @IsEmail()
  @MaxLength(70)
  email: string;

  @ApiProperty({
    description: 'The password for the user',
    example: 'hylr5t43fo987',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The array of initial roles',
  })
  @IsOptional()
  roles: UsersRoles[];
}
