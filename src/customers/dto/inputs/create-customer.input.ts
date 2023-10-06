import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumberString, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateCustomerInput {

  @IsNumberString()
  @MinLength(4)
  @MaxLength(15)
  @Field(()=>String)
  documentNumber:string;

  @IsString()
  @IsNotEmpty()
  @Field(()=>String)
  name:string;

  @IsString()
  @IsNotEmpty()
  @Field(()=>String)
  lastName:string;

  @IsString()
  @Field(()=>String)
  address:string;

  @IsString()
  @Field(()=>String)
  phone:string;

  @IsDate()
  @Field(()=>Date)
  bornDate:Date;
}
