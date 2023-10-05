import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput, UpdateCategoryInput } from './dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {

  private logger = new Logger('CategoriesService');

  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) {}

  async create(createCategoryInput: CreateCategoryInput):Promise<Category> {
    try {
      const newCategory = this.categoryRepository.create(createCategoryInput);
      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll():Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: string):Promise<Category> {
    try {
      return await this.categoryRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `category with id: ${id} not found`,
      });
    }
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput):Promise<Category> {
    try {
      const categoryPreload = await this.categoryRepository.preload({...updateCategoryInput});
      return await this.categoryRepository.save(categoryPreload);
    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async remove(id: string):Promise<Category> {
    
    const category = await this.findOne(id);
    await this.categoryRepository.softDelete(category);

    return category;
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
