import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateOrderInput {
  

  @IsString()
  @MaxLength(70)
  @Field(()=>String)
  deliveryMan:string;

  @IsString()
  @MaxLength(200)
  @MinLength(5)
  @Field(()=>String)
  deliveryAddress:string;

  @IsString()
  @MaxLength(500)
  @Field(()=>String, {nullable:true})
  observation?:string;

  @IsUUID()
  @Field(()=>ID)
  employeeId:string;
}
