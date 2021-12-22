import { IsString } from 'class-validator';
import { IsCnpj } from 'src/shared/decorators/cnpj.decorator';

export class VendorDto {
  @IsCnpj()
  CNPJ: string;

  @IsString()
  description: string;
}
