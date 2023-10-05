import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Category {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar', {length:10})
  @Field(()=>String)
  code:string;

  @Column('varchar', {length:20})
  @Field(()=>String)
  name:string;

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
