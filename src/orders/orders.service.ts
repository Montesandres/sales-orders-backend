import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrderInput, UpdateOrderInput } from './dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {

  private logger = new Logger('OrdersService');

  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>
  ) {}

  async create(createOrderInput: CreateOrderInput):Promise<Order>  {
    try {
      const newOrder = this.ordersRepository.create(createOrderInput);
      return await this.ordersRepository.save(newOrder);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll():Promise<Order[]>  {
    return await this.ordersRepository.find();
  }

  async findOne(id: string ):Promise<Order>  {
    try {
      return await this.ordersRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `Employee with id: ${id} not found`,
      });
    }
  }

  async update(id: string, updateOrderInput: UpdateOrderInput):Promise<Order>  {
    try {
      const orderPreload = await this.ordersRepository.preload({
        ...updateOrderInput,
      });
      return await this.ordersRepository.save(orderPreload);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string):Promise<Order>  {
    const order = await this.findOne(id);
    await this.ordersRepository.softDelete(order);
 
    return order;
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
