import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../shared/guards/jwt.auth.guard';
import { UsersRoles } from './entities/roles.entity';

@ApiTags('Users')
@Controller('users')
@UsePipes(new ValidationPipe())
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('')
  @ApiResponse({
    status: 201,
    description: 'Gets the id of a new user',
  })
  async create(@Body() newUser: UserDto) {
    return this.userService.add(newUser);
  }

  @Put('')
  @ApiResponse({
    status: 201,
    description: 'updates the user',
  })
  async update(@Body() newUser: UserDto) {
    return this.userService.update(newUser);
  }

  @Get('')
  @ApiResponse({
    status: 200,
    type: [Users],
    description: 'Gets all users',
  })
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return this.userService.getAll();
  }

  @Get('/allRoles')
  @ApiResponse({
    status: 200,
    type: [UsersRoles],
    description: 'Gets all users',
  })
  @UseGuards(JwtAuthGuard)
  async getAllRoles() {
    return this.userService.getAllRoles();
  }

  @Get('/me')
  @ApiResponse({
    status: 200,
    type: Users,
    description: 'Gets the user by the authorizaation header',
  })
  @UseGuards(JwtAuthGuard)
  async getUserFromToken(@Headers() headers) {
    return this.userService.getByToken(headers.authorization);
  }
}
