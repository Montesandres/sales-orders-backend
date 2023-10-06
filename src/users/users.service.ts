import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { CreateUserInput, UpdateUserInput } from './dto';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly employeeService:EmployeesService,
  ) {}
 
  async create(createUserInput: CreateUserInput): Promise<User> {

    const employee = await this.employeeService.create({...createUserInput, tipeEmployeeId:createUserInput.typeEmployeeId})

    try {
      const newUser = this.userRepository.create({...createUserInput,employee});
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(roles: ValidRoles[]): Promise<User[]> {
    if (roles.length === 0) return await this.userRepository.find();

    return await this.userRepository
      .createQueryBuilder()
      .andWhere('ARRAY[roles] && ARRAY[:...roles]')
      .setParameter('roles', roles)
      .getMany();
  }

  async finOneById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `user with id: ${id} not found`,
      });
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput, user:User): Promise<User> {
    try {
      const userPreload = await this.userRepository.preload({...updateUserInput});
      userPreload.lastUpdateBy = user;
      return await this.userRepository.save(userPreload);
    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async blockUser(id: string): Promise<User> {
    const userToBLock = await this.finOneById(id);
    userToBLock.isActive = false;
    return this.userRepository.save(userToBLock);
  }

  async finOneByUserName(user: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({
        userName: user,
      });
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `user: ${user} not found`,
      });
    }
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
