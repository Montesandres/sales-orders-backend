import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name:'employee_types'})
@ObjectType()
export class EmployeeType {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar',{unique:true, length:15})
  @Field(()=>String)
  code:string;
  
  @Column('varchar')
  @Field(()=>String)
  description:string;

  @CreateDateColumn({name:'create_at'})
  @Field(()=>Date)
  createAt:Date;

  @UpdateDateColumn({name:'update:at'})
  @Field(()=>Date)
  updateAt:Date;

  @DeleteDateColumn({nullable:true, name:'delete_at'})
  @Field(()=>Date,{nullable:true})
  deleteAt:Date
}
