import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateDepartmentInput, UpdateDepartmentInput } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {

  private logger = new Logger('DepartmentsService');

  constructor(
    @InjectRepository(Department) private readonly departmentRepository: Repository<Department>
  ) {}

  async create(createDepartmentInput: CreateDepartmentInput):Promise<Department> {
    try {
      const newDepartment = this.departmentRepository.create(createDepartmentInput);
      return await this.departmentRepository.save(newDepartment);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll():Promise<Department[]> {
    return await this.departmentRepository.find()
  }

  async findOne(id: string):Promise<Department> {
    try {
      return await this.departmentRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `city with id: ${id} not found`,
      });
    }
  }

  async update(id: string, updateDepartmentInput: UpdateDepartmentInput):Promise<Department> {
    try {
      const departmentPreload = await this.departmentRepository.preload({...updateDepartmentInput});
      return await this.departmentRepository.save(departmentPreload);
    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async remove(id: string):Promise<Department> {
    const department = await this.findOne(id);
    await this.departmentRepository.softDelete(department);

    return department;
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
