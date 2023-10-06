import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateDeliveryEmployeeInput,
  UpdateDeliveryEmployeeInput,
} from './dto';
import { DeliveryEmployee } from './entities/delivery-employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryEmployeeService {
  private logger = new Logger('DeliveryEmployeeService');

  constructor(
    @InjectRepository(DeliveryEmployee)
    private readonly deliveryEmployeesRepository: Repository<DeliveryEmployee>
  ) {}

  async create(
    createDeliveryEmployeeInput: CreateDeliveryEmployeeInput
  ): Promise<DeliveryEmployee> {
    try {
      const newDeliveryEmployee = this.deliveryEmployeesRepository.create(
        createDeliveryEmployeeInput
      );
      return await this.deliveryEmployeesRepository.save(newDeliveryEmployee);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(): Promise<DeliveryEmployee[]> {
    return await this.deliveryEmployeesRepository.find();
  }

  async findOne(id: string): Promise<DeliveryEmployee> {
    try {
      return await this.deliveryEmployeesRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `city with id: ${id} not found`,
      });
    }
  }

  async update(
    id: string,
    updateDeliveryEmployeeInput: UpdateDeliveryEmployeeInput
  ): Promise<DeliveryEmployee> {
    try {
      const delyveryEmployeePreload = await this.deliveryEmployeesRepository.preload({
        ...updateDeliveryEmployeeInput,
      });
      return await this.deliveryEmployeesRepository.save(delyveryEmployeePreload);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

 async  remove(id: string): Promise<DeliveryEmployee> {
    const deliveryEmployee = await this.findOne(id);
    await this.deliveryEmployeesRepository.softDelete(id);

    return deliveryEmployee;
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
