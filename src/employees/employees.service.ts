import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeInput, UpdateEmployeeInput } from './dto/index';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  private logger = new Logger('EmployeesService');

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>
  ) {}

  async create(createEmployeeInput: CreateEmployeeInput): Promise<Employee> {
    try {
      const newEmployee = this.employeeRepository.create(createEmployeeInput);
      return this.employeeRepository.save(newEmployee);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findOne(id: string): Promise<Employee> {
    try {
      const employeeFound = await this.employeeRepository.findOne({
        where: { id },
      });

      if (!employeeFound)
        throw new NotFoundException(`The employee with id ${id} was not found`);

      return employeeFound;
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `Employee with id: ${id} not found`,
      });
    }
  }

  async update(
    id: string,
    updateEmployeeInput: UpdateEmployeeInput
  ): Promise<Employee> {
    try {
      const employeeToUpdate = await this.employeeRepository.preload(
        updateEmployeeInput
      );

      return this.employeeRepository.save(employeeToUpdate);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string): Promise<Employee> {
    const employee = await this.findOne(id);

    await this.employeeRepository.remove(employee);

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
