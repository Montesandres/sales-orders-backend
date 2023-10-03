import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateManageEmployeeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
