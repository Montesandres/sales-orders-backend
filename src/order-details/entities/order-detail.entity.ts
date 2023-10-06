import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('order_details')
@ObjectType()
export class OrderDetail {
  
  @Field(()=>ID)
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column('int')
  @Field(()=>Number)
  quantity:number;

  @Column('varchar',{name:'detail_description'})
  @Field(()=>String)
  detailDescription:string;

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
