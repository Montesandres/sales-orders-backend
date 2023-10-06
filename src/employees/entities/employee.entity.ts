import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name:'employees'})
@ObjectType()
export class Employee { 
  
  @Field(()=>ID)
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Field(()=>String)
  @Column('varchar',{length:15, unique:true, name:'document_number'})
  documentNumber:string;

  @Field(()=>String)
  @Column('varchar',{length:30})
  name:string;

  @Field(()=>String)
  @Column('varchar',{length:30, name:'last_name'})
  lastName:string;

  @Field(()=>String)
  @Column('varchar',{length:100})
  address:string;

  @Field(()=>String)
  @Column('varchar',{length:100})
  neighborhood:string;

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
