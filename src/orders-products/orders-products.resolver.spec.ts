import { Test, TestingModule } from '@nestjs/testing';
import { OrdersProductsResolver } from './orders-products.resolver';
import { OrdersProductsService } from './orders-products.service';

describe('OrdersProductsResolver', () => {
  let resolver: OrdersProductsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersProductsResolver, OrdersProductsService],
    }).compile();

    resolver = module.get<OrdersProductsResolver>(OrdersProductsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
