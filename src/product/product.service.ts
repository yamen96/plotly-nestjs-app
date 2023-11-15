import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    return await this.productRepository.save(createProductInput);
  }

  async createOrGet(productName: string): Promise<Product> {
    let product: Product = await this.findOneByName(productName);
    if (!product) {
      const createProductInput: CreateProductInput = new CreateProductInput();
      createProductInput.name = productName;
      product = await this.create(createProductInput);
    }
    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOne({where: {id: id}});;
  }

  async findOneByName(name: string): Promise<Product> {
    return await this.productRepository.findOne({where: {name: name}});;
  }

  async findAllWithIds(ids: string[]): Promise<Product[]> {
    const productsWithId: Product[] = [];
    if (!ids ) return productsWithId;
    
    await Promise.all(
      ids.map(async (id) => {
        const product: Product = await this.findOne(id);
        productsWithId.push(product);
      })
    );
    return productsWithId;
  }

  async update(id: string, updateProductInput: UpdateProductInput): Promise<UpdateResult> {
    return await this.productRepository.update(id, updateProductInput)
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }
}
