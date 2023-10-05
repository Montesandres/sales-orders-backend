import { Injectable } from '@nestjs/common';
import { CreateEmployeeTypeInput } from './dto/create-employee-type.input';
import { UpdateEmployeeTypeInput } from './dto/update-employee-type.input';

@Injectable()
export class EmployeeTypesService {
  create(createEmployeeTypeInput: CreateEmployeeTypeInput) {
    return 'This action adds a new employeeType';
  }

  findAll() {
    return `This action returns all employeeTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeType`;
  }

  update(id: number, updateEmployeeTypeInput: UpdateEmployeeTypeInput) {
    return `This action updates a #${id} employeeType`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeType`;
  }
}
