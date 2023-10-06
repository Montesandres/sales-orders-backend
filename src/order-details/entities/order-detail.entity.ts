import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order_details')
@ObjectType()
export class OrderDetail {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  @Field(() => Number)
  quantity: number;

  @Column('varchar', { name: 'detail_description' })
  @Field(() => String)
  detailDescription: string;

  @CreateDateColumn({ name: 'create_at' })
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn({ name: 'update:at' })
  @Field(() => Date)
  updateAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'delete_at' })
  @Field(() => Date, { nullable: true })
  deleteAt: Date;

  @ManyToOne(()=>Order, (order)=>order.orderDetails)
  @JoinColumn({name:'order_id'})
  @Field(()=>Order)
  order:Order;

  @OneToOne(() => Product, (product) => product.orderDetail) // specify inverse side as a second parameter
  @JoinColumn({name:'product_id'})
  product: Product;
}
