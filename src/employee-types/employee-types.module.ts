import { Module } from '@nestjs/common';
import { EmployeeTypesService } from './employee-types.service';
import { EmployeeTypesResolver } from './employee-types.resolver';

@Module({
  providers: [EmployeeTypesResolver, EmployeeTypesService]
})
export class EmployeeTypesModule {}
