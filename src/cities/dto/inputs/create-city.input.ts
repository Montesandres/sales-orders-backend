import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateCityInput {
 
    @IsString()
    @Field(()=>String)
    idCity:string;
  
    @IsString()
    @Field(()=>String)
    name:string;
}
