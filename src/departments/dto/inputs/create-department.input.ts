import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateDepartmentInput {

  @IsString()
  @Field(() => String)
  idCity: string;

  @IsString()
  @Field(() => String)
  name: string;
}
