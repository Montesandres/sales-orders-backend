import { InputType, Field } from '@nestjs/graphql';
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

  @IsUUID()
  @Field(()=>String)
  departmentId:string;

  @IsUUID()
  @Field(()=>String)
  cityId:string;

  @IsString()
  @Field(()=>String)
  neighborhood:string;
}
