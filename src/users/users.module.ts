import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmployeeTypesModule } from 'src/employee-types/employee-types.module';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    EmployeeTypesModule,
    EmployeesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
