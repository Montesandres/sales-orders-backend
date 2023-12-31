import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersResolver } from './customers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';

@Module({
  providers: [CustomersResolver, CustomersService],
  imports:[TypeOrmModule.forFeature([Customer])]
})
export class CustomersModule {}
