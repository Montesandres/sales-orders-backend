import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Brand } from 'src/brands/entities/brand.entity';
import { Category } from 'src/categories/entities/category.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.product) // specify inverse side as a second parameter
  orderDetail: OrderDetail;

  @ManyToOne(()=>Category, (category)=>category.products,{nullable:false})
  @JoinColumn({name:'category_id'})
  @Field(()=>Category)
  category:Category;

  @ManyToOne(()=>Brand, (brand)=>brand.products,{nullable:false})
  @JoinColumn({name:'brand_id'})
  @Field(()=>Brand)
  brand:Brand;
}
