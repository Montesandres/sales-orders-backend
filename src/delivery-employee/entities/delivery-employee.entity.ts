import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DeliveryEmployee {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
