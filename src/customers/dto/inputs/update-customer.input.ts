import { IsUUID } from 'class-validator';
import { CreateCustomerInput } from './create-customer.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {

  @IsUUID()
  @Field(() => ID)
  id: string;
}
