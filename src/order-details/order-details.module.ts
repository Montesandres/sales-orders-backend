import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsResolver } from './order-details.resolver';

@Module({
  providers: [OrderDetailsResolver, OrderDetailsService]
})
export class OrderDetailsModule {}
