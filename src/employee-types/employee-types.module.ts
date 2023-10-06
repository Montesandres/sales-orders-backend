import { Module } from '@nestjs/common';
import { EmployeeTypesService } from './employee-types.service';
import { EmployeeTypesResolver } from './employee-types.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeType } from './entities/employee-type.entity';

@Module({
  providers: [EmployeeTypesResolver, EmployeeTypesService],
  imports:[TypeOrmModule.forFeature([EmployeeType])],
  exports:[EmployeeTypesService]
})
export class EmployeeTypesModule {}
