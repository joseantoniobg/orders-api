import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';
import { VendorsRepository } from './repositories/vendors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VendorsRepository])],
  providers: [VendorsService],
  controllers: [VendorsController],
})
export class VendorsModule {}
