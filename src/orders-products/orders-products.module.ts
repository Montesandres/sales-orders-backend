import { Module } from '@nestjs/common';
import { OrdersProductsService } from './orders-products.service';
import { OrdersProductsResolver } from './orders-products.resolver';

@Module({
  providers: [OrdersProductsResolver, OrdersProductsService]
})
export class OrdersProductsModule {}
