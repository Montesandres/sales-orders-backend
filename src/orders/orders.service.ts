import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrderInput, UpdateOrderInput } from './dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class OrdersService {

  private logger = new Logger('OrdersService');

  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly employeeService:EmployeesService
  ) {}

  async create(createOrderInput: CreateOrderInput):Promise<Order>  {

    const employee = await this.employeeService.findOne(createOrderInput.employeeId)

    try {
      const newOrder = this.ordersRepository.create({...createOrderInput,employee});
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
    await this.ordersRepository.softDelete(id);
    return order;
  }

  private handleDBErrors(error: any): never {
    console.log(error)
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    if (error.code === '23502') {
      throw new BadRequestException(`Violate constraint of ${error.column}`);
    }

    if (error.code === 'error-001') {
      throw new NotFoundException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('please check server logs');
  }
}
