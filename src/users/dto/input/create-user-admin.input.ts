import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserAdminInput {
 
  @IsString()
  @Field(()=>String)
  userName:string;

  @MinLength(6)
  @Field(()=>String)
  password:string;

  

}
