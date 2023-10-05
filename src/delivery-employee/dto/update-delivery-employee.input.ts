import { CreateDeliveryEmployeeInput } from './create-delivery-employee.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDeliveryEmployeeInput extends PartialType(CreateDeliveryEmployeeInput) {
  @Field(() => Int)
  id: number;
}
