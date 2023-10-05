import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersProductsService } from './orders-products.service';
import { OrdersProduct } from './entities/orders-product.entity';
import { CreateOrdersProductInput } from './dto/create-orders-product.input';
import { UpdateOrdersProductInput } from './dto/update-orders-product.input';

@Resolver(() => OrdersProduct)
export class OrdersProductsResolver {
  constructor(private readonly ordersProductsService: OrdersProductsService) {}

  @Mutation(() => OrdersProduct)
  createOrdersProduct(@Args('createOrdersProductInput') createOrdersProductInput: CreateOrdersProductInput) {
    return this.ordersProductsService.create(createOrdersProductInput);
  }

  @Query(() => [OrdersProduct], { name: 'ordersProducts' })
  findAll() {
    return this.ordersProductsService.findAll();
  }

  @Query(() => OrdersProduct, { name: 'ordersProduct' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ordersProductsService.findOne(id);
  }

  @Mutation(() => OrdersProduct)
  updateOrdersProduct(@Args('updateOrdersProductInput') updateOrdersProductInput: UpdateOrdersProductInput) {
    return this.ordersProductsService.update(updateOrdersProductInput.id, updateOrdersProductInput);
  }

  @Mutation(() => OrdersProduct)
  removeOrdersProduct(@Args('id', { type: () => Int }) id: number) {
    return this.ordersProductsService.remove(id);
  }
}
