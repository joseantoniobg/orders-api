import { PartialType } from '@nestjs/swagger';
import { createBrandTypeDto } from './create-brand-type.dto';
export class updateBrandTypeDto extends PartialType(createBrandTypeDto) {
  id_brand_type: number;
}
