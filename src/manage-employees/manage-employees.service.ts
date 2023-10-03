import { Injectable } from '@nestjs/common';
import { CreateManageEmployeeInput } from './dto/create-manage-employee.input';
import { UpdateManageEmployeeInput } from './dto/update-manage-employee.input';

@Injectable()
export class ManageEmployeesService {
  create(createManageEmployeeInput: CreateManageEmployeeInput) {
    return 'This action adds a new manageEmployee';
  }

  findAll() {
    return `This action returns all manageEmployees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manageEmployee`;
  }

  update(id: number, updateManageEmployeeInput: UpdateManageEmployeeInput) {
    return `This action updates a #${id} manageEmployee`;
  }

  remove(id: number) {
    return `This action removes a #${id} manageEmployee`;
  }
}
