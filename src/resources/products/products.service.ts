import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { data } = await axios.get<{
      results: {
        [key: string]: {
          name: string;
          currency: string;
          price: number;
        };
      };
    }>('https://api.hgbrasil.com/finance/stock_price', {
      params: {
        symbol: createProductDto.ticker,
        key: process.env.QUOTES_API_KEY,
      },
    });

    if (!data) {
      throw new BadRequestException('Invalid ticker');
    }

    const values = data.results?.[createProductDto.ticker];

    if (!values) {
      return new InternalServerErrorException('Product value not found');
    }

    return this.productsRepository.save({
      ...createProductDto,
      name: values.name,
      currency: values.currency,
      price: values.price,
    });
  }

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: string) {
    return this.productsRepository.findOneOrFail(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
