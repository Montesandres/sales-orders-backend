import { IsUUID } from 'class-validator';
import { CreateDeliveryEmployeeInput } from './create-delivery-employee.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateDeliveryEmployeeInput extends PartialType(CreateDeliveryEmployeeInput) {
  
  @IsUUID()
  @Field(() => ID)
  id: string;
}
