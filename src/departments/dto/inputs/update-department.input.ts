import { IsUUID } from 'class-validator';
import { CreateDepartmentInput } from './create-department.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @IsUUID()
  @Field(() => ID)
  id: string;
}
