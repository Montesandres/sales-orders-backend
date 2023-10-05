import { CreateEmployeeTypeInput } from './create-employee-type.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeeTypeInput extends PartialType(CreateEmployeeTypeInput) {
  @Field(() => Int)
  id: number;
}
