import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNumberString, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateEmployeeInput {
  
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

  @IsString()
  @Field(()=>String)
  neighborhood:string;

  @IsUUID()
  @Field(()=>ID)
  tipeEmployeeId:string;
}
