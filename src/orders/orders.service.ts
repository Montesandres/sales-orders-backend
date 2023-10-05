import { Injectable } from '@nestjs/common';
import { CreateOrderInput, UpdateOrderInput } from './dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  async create(createOrderInput: CreateOrderInput):Promise<Order>  {
    return null;
  }

  async findAll():Promise<Order[]>  {
    return null
  }

  async findOne(id: string ):Promise<Order>  {
    return null
  }

  async update(id: string, updateOrderInput: UpdateOrderInput):Promise<Order>  {
    return null
  }

  async remove(id: string):Promise<Order>  {
    return null
  }
}
