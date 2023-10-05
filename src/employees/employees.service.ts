import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeInput, UpdateEmployeeInput } from './dto/index';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>
  ) {}

  async create(createEmployeeInput: CreateEmployeeInput): Promise<Employee> {
    const newEmployee = this.employeeRepository.create(createEmployeeInput);
    return this.employeeRepository.save(newEmployee);
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findOne(id: string): Promise<Employee> {
    const employeeFound = await this.employeeRepository.findOne({
      where: { id },
    });

    if (!employeeFound)
      throw new NotFoundException(`The employee with id ${id} was not found`);

    return employeeFound;
  }

  async update(
    id: string,
    updateEmployeeInput: UpdateEmployeeInput
  ): Promise<Employee> {
    const employeeToUpdate = await this.employeeRepository.preload(
      updateEmployeeInput
    );

    return this.employeeRepository.save(employeeToUpdate);
  }

  async remove(id: string): Promise<Employee> {
    const employee = await this.findOne(id);

    await this.employeeRepository.remove(employee);

    return employee;
  }
}
