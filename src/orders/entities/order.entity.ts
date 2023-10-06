import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Customer } from 'src/customers/entities/customer.entity';
import { DeliveryEmployee } from 'src/delivery-employee/entities/delivery-employee.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @UpdateDateColumn({ name: 'update_at' })
  @Field(() => Date)
  updateAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'delete_at' })
  @Field(() => Date, { nullable: true })
  deleteAt: Date;

  @ManyToOne(()=>Employee, (employee)=>employee.orders,{nullable:false})
  @JoinColumn({name:'employee_id'})
  @Field(()=>Employee)
  employee:Employee;

  @ManyToOne(()=>Customer, (customer)=>customer.orders,{nullable:false})
  @JoinColumn({name:'customer_id'})
  @Field(()=>Customer)
  customer:Customer;

  @ManyToOne(()=>DeliveryEmployee, (deliveryEmployee)=>deliveryEmployee.orders,{nullable:false})
  @JoinColumn({name:'delivery_employee_id'})
  @Field(()=>DeliveryEmployee)
  deliveryEmployee:DeliveryEmployee;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, { cascade: true })
  @Field(() => [OrderDetail])
  orderDetails: OrderDetail[];

}
