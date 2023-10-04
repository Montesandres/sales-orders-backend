import { IsUUID } from 'class-validator';
import { CreateEmployeeInput } from './create-employee.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {

  @IsUUID()
  @Field(() => ID)
  id: string;
}
