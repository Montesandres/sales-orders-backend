import { IsArray, IsOptional, IsUUID } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {

  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsOptional()
  @IsArray()
  @Field(()=>[ValidRoles],{nullable:true})
  roles?:ValidRoles[];

  @IsOptional()
  @IsArray()
  @Field(()=>Boolean,{nullable:true})
  isActive?:boolean;
}
