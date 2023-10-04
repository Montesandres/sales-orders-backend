import { Module } from '@nestjs/common';
import { EmployeesResolver } from './employees.resolver';
import { Employee } from './entities/employee.entity';
import { EmployeesService } from './employees.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [EmployeesResolver, EmployeesService],
  imports:[
    TypeOrmModule.forFeature([Employee]),
  ],
  exports:[EmployeesService]
})
export class EmployeesModule {}
