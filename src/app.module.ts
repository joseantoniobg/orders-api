import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseConnectionService } from './shared/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VendorsModule } from './vendors/vendors.module';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { TableModelModule } from './table-model/table-model.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConnectionService,
    }),
    AuthModule,
    UsersModule,
    VendorsModule,
    ProductModule,
    BrandModule,
    TableModelModule,
  ],
})
export class AppModule {}
