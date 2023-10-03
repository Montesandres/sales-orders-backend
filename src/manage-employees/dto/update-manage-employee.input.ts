import { CreateManageEmployeeInput } from './create-manage-employee.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateManageEmployeeInput extends PartialType(CreateManageEmployeeInput) {
  @Field(() => Int)
  id: number;
}
