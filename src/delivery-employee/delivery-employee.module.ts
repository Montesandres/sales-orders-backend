import { Module } from '@nestjs/common';
import { DeliveryEmployeeService } from './delivery-employee.service';
import { DeliveryEmployeeResolver } from './delivery-employee.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryEmployee } from './entities/delivery-employee.entity';

@Module({
  providers: [DeliveryEmployeeResolver, DeliveryEmployeeService],
  imports:[TypeOrmModule.forFeature([DeliveryEmployee])]
})
export class DeliveryEmployeeModule {}
