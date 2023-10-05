import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCityInput,UpdateCityInput } from './dto';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {

  private logger = new Logger('CitiesService');

  constructor(
    @InjectRepository(City) private readonly citiesRepository: Repository<City>
  ) {}

  async create(createCityInput: CreateCityInput):Promise<City> {
    try {
      const newCity = this.citiesRepository.create(createCityInput);
      return await this.citiesRepository.save(newCity);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll():Promise<City[]> {
    return await this.citiesRepository.find()
  }

  async findOne(id: string):Promise<City>  {
    try {
      return await this.citiesRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `city with id: ${id} not found`,
      });
    }
  }

  async update(id: string, updateCityInput: UpdateCityInput):Promise<City> {
    try {
      const cityPreload = await this.citiesRepository.preload({...updateCityInput});
      return await this.citiesRepository.save(cityPreload);
    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async remove(id: string):Promise<City>  {
    const city = await this.findOne(id);
    await this.citiesRepository.softDelete(city);

    return city;
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
