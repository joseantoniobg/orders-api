import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VendorsService } from './vendors.service';
import { Vendors } from './entities/vendors.entity';
import { VendorDto } from './dto/vendor.dto';
import { JwtAuthGuard } from '../shared/guards/jwt.auth.guard';

@ApiTags('Vendors')
@UseGuards(JwtAuthGuard)
@Controller('vendors')
@UsePipes(new ValidationPipe())
export class VendorsController {
  constructor(private vendorService: VendorsService) {}

  @Post('')
  @ApiResponse({
    status: 201,
    type: Vendors,
    description: 'Creates a new Vendor',
  })
  async create(@Body() newVendor: VendorDto) {
    return this.vendorService.create(newVendor);
  }

  @Get('')
  @ApiResponse({
    status: 200,
    type: [Vendors],
    description: 'Gets all vendors',
  })
  async getAll() {
    return this.vendorService.getAll();
  }
}
