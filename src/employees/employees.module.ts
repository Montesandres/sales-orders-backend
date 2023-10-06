import { Module } from '@nestjs/common';
import { EmployeesResolver } from './employees.resolver';
import { Employee } from './entities/employee.entity';
import { EmployeesService } from './employees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeTypesModule } from 'src/employee-types/employee-types.module';

@Module({
  providers: [EmployeesResolver, EmployeesService],
  imports:[
    TypeOrmModule.forFeature([Employee]),
    EmployeeTypesModule
  ],
  exports:[EmployeesService]
})
export class EmployeesModule {}
