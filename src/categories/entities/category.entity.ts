import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar', { length: 10 })
  @Field(() => String)
  code: string;

  @Column('varchar', { length: 20 })
  @Field(() => String)
  name: string;

  @Column('varchar', { length: 500 })
  @Field(() => String)
  description: string;

  @CreateDateColumn({ name: 'create_at' })
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  @Field(() => Date)
  updateAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'delete_at' })
  @Field(() => Date, { nullable: true })
  deleteAt: Date;

  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  @Field(() => [Product])
  products: Product[];
}
