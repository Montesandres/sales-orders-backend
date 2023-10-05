import { Injectable } from '@nestjs/common';
import { CreateDeliveryEmployeeInput } from './dto/create-delivery-employee.input';
import { UpdateDeliveryEmployeeInput } from './dto/update-delivery-employee.input';

@Injectable()
export class DeliveryEmployeeService {
  create(createDeliveryEmployeeInput: CreateDeliveryEmployeeInput) {
    return 'This action adds a new deliveryEmployee';
  }

  findAll() {
    return `This action returns all deliveryEmployee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryEmployee`;
  }

  update(id: number, updateDeliveryEmployeeInput: UpdateDeliveryEmployeeInput) {
    return `This action updates a #${id} deliveryEmployee`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryEmployee`;
  }
}
