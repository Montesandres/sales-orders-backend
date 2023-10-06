import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCustomerInput, CreateCustomerInput } from './dto';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  private logger = new Logger('CustomersService');

  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>
  ) {}

  async create(createCustomerInput: CreateCustomerInput): Promise<Customer> {
    try {
      const newCustomer = this.customersRepository.create(createCustomerInput);
      return await this.customersRepository.save(newCustomer);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(): Promise<Customer[]> {
    return await this.customersRepository.find();
  }

  async findOne(id: string): Promise<Customer> {
    try {
      return await this.customersRepository.findOneByOrFail({
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
    updateCustomerInput: UpdateCustomerInput
  ): Promise<Customer> {
    try {
      const customerPreload = await this.customersRepository.preload({
        ...updateCustomerInput,
      });
      return await this.customersRepository.save(customerPreload);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string): Promise<Customer> {
    const customer = await this.findOne(id);
    await this.customersRepository.softDelete(id);
 
    return customer;
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
