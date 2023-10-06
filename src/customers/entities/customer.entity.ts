import { ObjectType, Field, ID } from '@nestjs/graphql';
import { City } from 'src/cities/entities/city.entity';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'customers' })
@ObjectType()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar', { unique: true, length: 15, name: 'document_number' })
  @Field(() => String)
  documentNumber: string;

  @Column('varchar')
  @Field(() => String)
  name: string;

  @Column('varchar', { name: 'last_name' })
  @Field(() => String)
  lastName: string;

  @Column('varchar')
  @Field(() => String)
  address: string;

  @Column('varchar', { length: 15 })
  @Field(() => String)
  phone: string;

  @Column('boolean')
  @Field(() => Boolean)
  active: boolean;

  @Column('timestamptz', { name: 'born_date' })
  @Field(() => Date)
  bornDate: Date;

  @CreateDateColumn({ name: 'create_at' })
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  @Field(() => Date)
  updateAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'delete_at' })
  @Field(() => Date, { nullable: true })
  deleteAt: Date;

  @OneToMany(() => Order, (order) => order.customer, { cascade: true })
  @Field(() => [Order])
  orders: Order[];

  @ManyToOne(()=>City, (city)=>city.customers,{nullable:false})
  @JoinColumn({name:'city_id'})
  @Field(()=>City)
  city:City;
}
