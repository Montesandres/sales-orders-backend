import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateEmployeeTypeInput,UpdateEmployeeTypeInput } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeType } from './entities/employee-type.entity';

@Injectable()
export class EmployeeTypesService {

  private logger = new Logger('EmployeeTypesService');

  constructor(
    @InjectRepository(EmployeeType)
    private readonly employeesTypesRepository: Repository<EmployeeType>
  ) {}

  async create(createEmployeeTypeInput: CreateEmployeeTypeInput):Promise<EmployeeType> {
    try {
      const newEmployeeType = this.employeesTypesRepository.create(createEmployeeTypeInput);
      return await this.employeesTypesRepository.save(newEmployeeType);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll():Promise<EmployeeType[]>{
    return await this.employeesTypesRepository.find();
  }

  async findOne(id: string):Promise<EmployeeType> {
    try {
      return await this.employeesTypesRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `Employee with id: ${id} not found`,
      });
    }
  }

  async update(id: string, updateEmployeeTypeInput: UpdateEmployeeTypeInput):Promise<EmployeeType> {
    try {
      const employeTypePreload = await this.employeesTypesRepository.preload({
        ...updateEmployeeTypeInput,
      });
      return await this.employeesTypesRepository.save(employeTypePreload);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string):Promise<EmployeeType> {
    const employee = await this.findOne(id);
    await this.employeesTypesRepository.softDelete(id);
 
    return employee;
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
