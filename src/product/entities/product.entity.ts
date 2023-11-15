import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text', {nullable: true})
  name: string;

  @Column('decimal', {nullable: true})
  price: number;
}
