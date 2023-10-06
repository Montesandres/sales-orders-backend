import { IsUUID } from 'class-validator';
import { CreateEmployeeTypeInput } from './create-employee-type.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeeTypeInput extends PartialType(CreateEmployeeTypeInput) {
  @IsUUID()
  @Field(() => ID)
  id: string;
}
