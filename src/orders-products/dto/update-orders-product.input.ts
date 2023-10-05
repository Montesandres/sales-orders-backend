import { CreateOrdersProductInput } from './create-orders-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrdersProductInput extends PartialType(CreateOrdersProductInput) {
  @Field(() => Int)
  id: number;
}
