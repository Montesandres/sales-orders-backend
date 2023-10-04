import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'employees'})
@ObjectType()
export class Employee {
  
  @Field(()=>ID)
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Field(()=>String)
  @Column()
  name:string;

  @Field(()=>String)
  @Column()
  lastName:string;

  @Field(()=>String)
  @Column()
  documentNumber:string;

  @Field(()=>String)
  @Column()
  address:string;

  @Field(()=>String)
  @Column()
  departmentId:string;

  @Field(()=>String)
  @Column()
  cityId:string;

  @Field(()=>String)
  @Column()
  neighborhood:string;

}
