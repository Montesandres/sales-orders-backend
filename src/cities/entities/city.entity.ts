import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity({name:'cities'})
@ObjectType()
export class City {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar',{unique:true, name:'id_city'})
  @Field(()=>String)
  idCity:string;

  @Column('varchar')
  @Field(()=>String)
  name:string;

  @CreateDateColumn({name:'create_at'})
  @Field(()=>Date)
  createAt:Date;

  @UpdateDateColumn({name:'update_at'})
  @Field(()=>Date)
  updateAt:Date;

  @DeleteDateColumn({nullable:true,name:'delete_at'})
  @Field(()=>Date,{nullable:true})
  deleteAt:Date
}
