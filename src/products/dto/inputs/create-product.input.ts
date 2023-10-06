import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateProductInput {
  
  @MaxLength(10)
  @IsString()
  @Field(()=>String)
  code:string;

  @IsString()
  @Field(()=>String)
  name:string;

  @IsNumber()
  @Field(()=>Boolean)
  enable:boolean;

  @IsNumber()
  @Field(()=>Number)
  salesQuantity:number;

  @IsNumber()
  @Field(()=>Number)
  stock:number;
} 
