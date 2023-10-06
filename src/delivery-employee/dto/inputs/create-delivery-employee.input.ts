import { InputType, Field } from '@nestjs/graphql';
import { IsNumberString, IsString } from 'class-validator';

@InputType()
export class CreateDeliveryEmployeeInput {
  
  @IsString()
  @Field(()=>String)
  name:string;

  @IsString()
  @Field(()=>String)
  lastName:string;

  @IsNumberString()
  @Field(()=>String)
  documentNumber:string;

  @IsString()
  @Field(()=>String)
  address:string;
}
