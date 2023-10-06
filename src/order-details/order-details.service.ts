import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailInput, UpdateOrderDetailInput } from './dto';
import { OrderDetail } from './entities/order-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsService { 

  private logger = new Logger('OrderDetailsService');

  constructor(
    @InjectRepository(OrderDetail)
    private readonly ordersDetailRepository: Repository<OrderDetail>
  ) {}

  async create(createOrderDetailInput: CreateOrderDetailInput):Promise<OrderDetail> {
    try {
      const newOrderDetail = this.ordersDetailRepository.create(createOrderDetailInput);
      return await this.ordersDetailRepository.save(newOrderDetail);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll():Promise<OrderDetail[]> {
    return await this.ordersDetailRepository.find();
  }

  async findOne(id: string):Promise<OrderDetail> {
    try {
      return await this.ordersDetailRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `Employee with id: ${id} not found`,
      });
    }
  }

  async update(id: string, updateOrderDetailInput: UpdateOrderDetailInput):Promise<OrderDetail> {
    try {
      const orderDetailPreload = await this.ordersDetailRepository.preload({
        ...updateOrderDetailInput,
      });
      return await this.ordersDetailRepository.save(orderDetailPreload);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string):Promise<OrderDetail> {
    const orderDetail = await this.findOne(id);
    await this.ordersDetailRepository.softDelete(orderDetail);
 
    return orderDetail;
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
