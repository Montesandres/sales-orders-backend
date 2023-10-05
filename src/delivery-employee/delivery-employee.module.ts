import { Module } from '@nestjs/common';
import { DeliveryEmployeeService } from './delivery-employee.service';
import { DeliveryEmployeeResolver } from './delivery-employee.resolver';

@Module({
  providers: [DeliveryEmployeeResolver, DeliveryEmployeeService]
})
export class DeliveryEmployeeModule {}
