import { Module } from '@nestjs/common';
import { ManageEmployeesService } from './manage-employees.service';
import { ManageEmployeesResolver } from './manage-employees.resolver';

@Module({
  providers: [ManageEmployeesResolver, ManageEmployeesService],
})
export class ManageEmployeesModule {}
