import { IsUUID } from 'class-validator';
import { CreateBrandInput } from './create-brand.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateBrandInput extends PartialType(CreateBrandInput) {
  
  @IsUUID()
  @Field(() => ID)
  id: string;
}
