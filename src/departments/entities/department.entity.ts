import { ObjectType, Field, ID } from '@nestjs/graphql';
import { City } from 'src/cities/entities/city.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'departments' })
@ObjectType()
export class Department {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar', { unique: true, name: 'id_department' })
  @Field(() => String)
  idDepartment: string;

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

  @OneToOne(() => Employee, (employee) => employee.department) // specify inverse side as a second parameter
  employee: Employee;

  @OneToMany(() => City, (city) => city.department)
  cities: City[]
}
