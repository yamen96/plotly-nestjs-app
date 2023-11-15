import { Product } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text', {nullable: true})
  name: string;

  @Column('text', {nullable: true})
  email: string;

  @Column('int', {nullable: true})
  age: number;

  @Column('simple-array', {nullable: true})
  orders: string[];
}
