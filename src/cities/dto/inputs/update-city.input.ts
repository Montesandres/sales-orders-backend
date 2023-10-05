import { IsUUID } from 'class-validator';
import { CreateCityInput } from './create-city.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCityInput extends PartialType(CreateCityInput) {

  @IsUUID()
  @Field(() => ID)
  id: string;
}
