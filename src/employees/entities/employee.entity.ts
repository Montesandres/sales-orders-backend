import { Field, ID, ObjectType } from '@nestjs/graphql';
import { City } from 'src/cities/entities/city.entity';
import { Department } from 'src/departments/entities/department.entity';
import { EmployeeType } from 'src/employee-types/entities/employee-type.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'employees' })
@ObjectType()
export class Employee {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('varchar', { length: 15, unique: true, name: 'document_number' })
  documentNumber: string;

  @Field(() => String)
  @Column('varchar', { length: 30 })
  name: string;

  @Field(() => String)
  @Column('varchar', { length: 30, name: 'last_name' })
  lastName: string;

  @Field(() => String)
  @Column('varchar', { length: 100 })
  address: string;

  @Field(() => String)
  @Column('varchar', { length: 100 })
  neighborhood: string;

  @CreateDateColumn({ name: 'create_at' })
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn({ name: 'update:at' })
  @Field(() => Date)
  updateAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'delete_at' })
  @Field(() => Date, { nullable: true })
  deleteAt: Date;

  @OneToMany(() => Order, (order) => order.employee, { cascade: true })
  @Field(() => [Order])
  orders: Order[];

  @OneToOne(() => EmployeeType, (employeeType) => employeeType.employee, {
    nullable: false,
  })
  @JoinColumn({ name: 'employee_type_id' })
  employeeType: EmployeeType;

  @OneToOne(() => User, (user) => user.employee)
  user: User;

  @OneToOne(() => Department, (department) => department.employee) // specify inverse side as a second parameter
  @JoinColumn({name:'department_id'})
  department: Department;

  @ManyToOne(()=>City, (city)=>city.employees)
  @JoinColumn({name:'city_id'})
  @Field(()=>City)
  city:City;
}
