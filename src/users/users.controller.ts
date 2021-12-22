import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../shared/guards/jwt.auth.guard';

@ApiTags('Users')
@Controller('users')
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
}
