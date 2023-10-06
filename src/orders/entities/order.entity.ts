import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('int', { unique: true, name: 'order_number' })
  @Generated('increment')
  @Field(() => Number)
  orderNumber: number;

  @Column('varchar', { length: 70, name: 'delivery_man' })
  @Field(() => String)
  deliveryMan: string;

  @Column('varchar', { length: 200, name: 'delivery_address' })
  @Field(() => String)
  deliveryAddress: string;

  @Column('varchar', { length: 500, nullable: true })
  @Field(() => String, { nullable: true })
  observation: string;

  @CreateDateColumn({ name: 'create_at' })
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn({ name: 'update:at' })
  @Field(() => Date)
  updateAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'delete_at' })
  @Field(() => Date, { nullable: true })
  deleteAt: Date;
}
