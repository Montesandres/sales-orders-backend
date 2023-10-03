import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ManageEmployee {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
