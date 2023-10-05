import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LogInInput {

    @IsString()
    @Field(()=>String)
    userName:string;

    @IsString()
    @Field(()=>String)
    password:string;
}