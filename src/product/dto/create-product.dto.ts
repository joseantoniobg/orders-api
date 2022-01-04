export class CreateProductDto {
  bar_code: string;
  name: string;
  description: string;
  current_price: number;
  sale_price: number;
  brand: { id_brand: number };
}
