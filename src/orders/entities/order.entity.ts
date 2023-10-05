import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Order {
 
  @PrimaryGeneratedColumn('uuid')
  @Field(()=>ID)
  id:string;

  @Column('int',{unique:true,})
  @Generated('increment')
  @Field(()=>Number)
  orderNumber:number;

  @Column('varchar',{length:70})
  @Field(()=>String)
  deliveryMan:string;

  @Column('varchar',{length:200})
  @Field(()=>String)
  deliveryAddress:string;

  @Column('varchar',{length:500,nullable:true})
  @Field(()=>String, {nullable:true})
  observation:string;

  @CreateDateColumn()
  @Field(()=>Date)
  createAt:Date;

  @UpdateDateColumn()
  @Field(()=>Date)
  updateAt:Date;

  @DeleteDateColumn({nullable:true})
  @Field(()=>Date,{nullable:true})
  deleteAt:Date

}
