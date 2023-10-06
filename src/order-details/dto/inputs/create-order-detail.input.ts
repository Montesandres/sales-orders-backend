import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateOrderDetailInput {
  
  @IsNumber()
  @Field(()=>Number)
  quantity:number;

  @IsString()
  @Field(()=>String)
  detailDescription:string;
  
}
