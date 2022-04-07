import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Product } from 'src/resources/products/entities/product.entity';
import { NotExists } from 'src/validators/not-exists.rule';

export class CreateProductDto {
  @NotExists(Product, 'ticker')
  @MaxLength(16)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  ticker: string;
}
