import { Injectable } from '@nestjs/common';
import { CreateOrdersProductInput } from './dto/create-orders-product.input';
import { UpdateOrdersProductInput } from './dto/update-orders-product.input';

@Injectable()
export class OrdersProductsService {
  create(createOrdersProductInput: CreateOrdersProductInput) {
    return 'This action adds a new ordersProduct';
  }

  findAll() {
    return `This action returns all ordersProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordersProduct`;
  }

  update(id: number, updateOrdersProductInput: UpdateOrdersProductInput) {
    return `This action updates a #${id} ordersProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordersProduct`;
  }
}
