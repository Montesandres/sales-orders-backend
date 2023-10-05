import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity()
@ObjectType()
export class City {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar',{unique:true})
  @Field(()=>String)
  idCity:string;

  @Column('varchar')
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
