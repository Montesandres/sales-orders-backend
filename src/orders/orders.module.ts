import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  providers: [OrdersResolver, OrdersService],
  imports:[TypeOrmModule.forFeature([Order]),
  EmployeesModule]
})
export class OrdersModule {}
