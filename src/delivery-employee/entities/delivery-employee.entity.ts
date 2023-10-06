import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';

@Entity({ name: 'delivery_Employees' })
@ObjectType()
export class DeliveryEmployee {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Column('varchar', { length: 15, unique: true, name: 'document_number' })
  documentNumber: string;

  @Column('varchar', { length: 20 })
  @IsString()
  @Field(() => String)
  name: string;

  @Column('varchar', { length: 20, name: 'last_name' })
  @IsString()
  lastName: string;

  @Column('varchar', { length: 100 })
  @IsString()
  address: string;

  @CreateDateColumn({ name: 'create_at' })
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  @Field(() => Date)
  updateAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'delete_at' })
  @Field(() => Date, { nullable: true })
  deleteAt: Date;

  @OneToMany(() => Order, (order) => order.deliveryEmployee, { cascade: true })
  @Field(() => [Order])
  orders: Order[];
}
