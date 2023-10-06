import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductInput,UpdateProductInput } from './dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  private logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) {}
  
  async create(createProductInput: CreateProductInput):Promise<Product> {
    try {
      const newProduct = this.productsRepository.create(createProductInput);
      return await this.productsRepository.save(newProduct);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll():Promise<Product[]> {
    return await this.productsRepository.find();
  }

 async findOne(id: string):Promise<Product> {
  try {
    return await this.productsRepository.findOneByOrFail({
      id,
    });
  } catch (error) {
    this.handleDBErrors({
      code: 'error-001',
      detail: `Employee with id: ${id} not found`,
    });
  }
  }

  async update(id: string, updateProductInput: UpdateProductInput):Promise<Product> {
    try {
      const productPreload = await this.productsRepository.preload({
        ...updateProductInput,
      });
      return await this.productsRepository.save(productPreload);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string):Promise<Product> {
    const product = await this.findOne(id);
    await this.productsRepository.softDelete(product);
 
    return product;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }
    if (error.code === 'error-001') {
      throw new NotFoundException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('please check server logs');
  }
}
