import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name:'products'})
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(()=>ID)
  id:string;

  @Column('varchar',{unique:true})
  @Field(()=>String)
  code:string;

  @Column('varchar',{length:30})
  @Field(()=>String)
  name:string;

  @Column('boolean')
  @Field(()=>Boolean)
  enable:boolean;

  @Column('bigint',{name:'sales_quantity'})
  @Field(()=>Number)
  salesQuantity:number;

  @Column('bigint')
  @Field(()=>Number)
  stock:number;

  @CreateDateColumn({ name: 'create_at' })
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn({ name: 'update:at' })
  @Field(() => Date)
  updateAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'delete_at' })
  @Field(() => Date, { nullable: true })
  deleteAt: Date;
}
