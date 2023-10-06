import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Customer } from 'src/customers/entities/customer.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Employee } from 'src/employees/entities/employee.entity';
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

@Entity({ name: 'cities' })
@ObjectType()
export class City {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar', { unique: true, name: 'id_city' })
  @Field(() => String)
  idCity: string;

  @Column('varchar')
  @Field(() => String)
  name: string;

  @CreateDateColumn({ name: 'create_at' })
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  @Field(() => Date)
  updateAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'delete_at' })
  @Field(() => Date, { nullable: true })
  deleteAt: Date;

  @OneToMany(() => Employee, (employee) => employee.city, { cascade: true })
  @Field(() => [Employee])
  employees: Employee[];

  @ManyToOne(()=>Department, (department)=>department.cities)
  @JoinColumn({name:'department_id'})
  @Field(()=>Department)
  department:Department;

  @OneToMany(() => Customer, (customer) => customer.city, { cascade: true })
  @Field(() => [Customer])
  customers: Customer[];
}
