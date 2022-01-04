import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { createBrandTypeDto } from './dto/create-brand-type.dto';
import { updateBrandTypeDto } from './dto/update-brand-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../shared/guards/jwt.auth.guard';

@ApiTags('Brands')
@UseGuards(JwtAuthGuard)
@Controller('brand')
@UsePipes(new ValidationPipe())
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Post('type')
  createBrandType(@Body() createBrandTypeDto: createBrandTypeDto) {
    return this.brandService.createBrandType(createBrandTypeDto);
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get('type')
  findAllBrandTypes() {
    return this.brandService.findAllBrandTypes();
  }

  @Patch()
  update(@Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(updateBrandDto);
  }

  @Patch('type')
  updateBrandType(@Body() updateBrandTypeDto: updateBrandTypeDto) {
    return this.brandService.updateBrandeType(updateBrandTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }

  @Delete('type/:id')
  removeBrandType(@Param('id') id: string) {
    return this.brandService.removeBrandType(+id);
  }
}
