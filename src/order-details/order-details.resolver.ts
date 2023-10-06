import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { OrderDetailsService } from './order-details.service';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderDetailInput,UpdateOrderDetailInput } from './dto';

@Resolver(() => OrderDetail)
export class OrderDetailsResolver {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Mutation(() => OrderDetail)
  createOrderDetail(@Args('createOrderDetailInput') createOrderDetailInput: CreateOrderDetailInput):Promise<OrderDetail> {
    return this.orderDetailsService.create(createOrderDetailInput);
  }

  @Query(() => [OrderDetail], { name: 'orderDetails' })
  findAll():Promise<OrderDetail[]> {
    return this.orderDetailsService.findAll();
  }

  @Query(() => OrderDetail, { name: 'orderDetail' })
  findOne(@Args('id', { type: () => ID }) id: string):Promise<OrderDetail> {
    return this.orderDetailsService.findOne(id);
  }

  @Mutation(() => OrderDetail)
  updateOrderDetail(@Args('updateOrderDetailInput') updateOrderDetailInput: UpdateOrderDetailInput):Promise<OrderDetail> {
    return this.orderDetailsService.update(updateOrderDetailInput.id, updateOrderDetailInput);
  }

  @Mutation(() => OrderDetail)
  removeOrderDetail(@Args('id', { type: () => ID }) id: string):Promise<OrderDetail> {
    return this.orderDetailsService.remove(id);
  }
}
