import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateBrandInput,UpdateBrandInput } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable() 
export class BrandsService {

  private logger = new Logger('BrandsService');

  constructor(
    @InjectRepository(Brand) private readonly brandsRepository: Repository<Brand>
  ) {}

  async create(createBrandInput: CreateBrandInput):Promise<Brand> {
    try {
      const newBrand = this.brandsRepository.create(createBrandInput);
      return await this.brandsRepository.save(newBrand);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll():Promise<Brand[]> {
    return this.brandsRepository.find();
  }

  async findOne(id: string):Promise<Brand> {
    try {
      return await this.brandsRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `brand with id: ${id} not found`,
      });
    }
  }

  async update(id: string, updateBrandInput: UpdateBrandInput):Promise<Brand> {
    try {
      const brandPreload = await this.brandsRepository.preload({...updateBrandInput});
      return await this.brandsRepository.save(brandPreload);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string):Promise<Brand> {
    const brand = await this.findOne(id);
    await this.brandsRepository.softDelete(brand);

    return brand;;
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
