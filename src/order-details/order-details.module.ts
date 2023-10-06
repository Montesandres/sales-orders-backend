import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsResolver } from './order-details.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';

@Module({
  providers: [OrderDetailsResolver, OrderDetailsService],
  imports:[TypeOrmModule.forFeature([OrderDetail])]
})
export class OrderDetailsModule {}
