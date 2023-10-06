import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Employee } from 'src/employees/entities/employee.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name:'users'})
@ObjectType()
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(()=>ID)
  id:string;

  @Column({unique:true})
  @Field(()=>String)
  userName:string;

  @Column()
  password:string;

  // @Column({
  //   type:'text',
  //   array:true,
  //   default:['user']
  // })
  // @Field(()=>[String])
  // roles:string[];

  @Column({
    type:'boolean',
    default: true
  })
  @Field(()=>Boolean)
  isActive:boolean;

  @ManyToOne(()=>User, (user)=>user.lastUpdateBy, {nullable:true})
  @JoinColumn({name:'lastUpdateBy'})
  @Field(()=>User,{nullable:true})
  lastUpdateBy:User;

  @OneToOne(() => Employee, (employee) => employee.user,{nullable:false, lazy:true}) // specify inverse side as a second parameter
  @JoinColumn({name:'employee_id'})
  @Field(()=>Employee)
  employee: Employee

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
