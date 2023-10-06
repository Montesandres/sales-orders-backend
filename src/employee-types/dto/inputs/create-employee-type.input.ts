import { InputType, Field } from '@nestjs/graphql';
import {  IsString } from 'class-validator';

@InputType()
export class CreateEmployeeTypeInput {
 
  @IsString()
  @Field(()=>String)
  code:string;

  @IsString()
  @Field(()=>String)
  description:string;

}
