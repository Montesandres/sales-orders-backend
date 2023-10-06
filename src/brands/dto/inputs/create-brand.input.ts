import { InputType, Field } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateBrandInput {

  @IsString()
  @MaxLength(10)
  @Field(() => String)
  code: string;

  @IsString()
  @MaxLength(20)
  @Field(() => String)
  name: string;

  @IsString()
  @MaxLength(500)
  @Field(() => String)
  description: string;
}
