import { IsUUID } from 'class-validator';
import { CreateOrderDetailInput } from './create-order-detail.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateOrderDetailInput extends PartialType(CreateOrderDetailInput) {
  
  @IsUUID()
  @Field(()=>ID)
  id:string;
}
