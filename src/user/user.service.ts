import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { CreateProductInput } from 'src/product/dto/create-product.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly productService: ProductService
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    return await this.userRepository.save(createUserInput);
  }

  async createOrGet(userName: string): Promise<User> {
    let user: User = await this.findOneByName(userName);
    if (!user) {
      const createUserInput: CreateUserInput = new CreateUserInput();
      createUserInput.name = userName;
      user = await this.create(createUserInput);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: string) {
    return await await this.userRepository.findOne({where: {id: id}});;
  }
  
  async findOneByName(name: string) {
    return await await this.userRepository.findOne({where: {name: name}});;
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<UpdateResult> {
    return await this.userRepository.update(id, updateUserInput)
  }

  async addProduct(userName: string, productName: string) {
    let user: User = await this.createOrGet(userName);
    let product: Product = await this.productService.createOrGet(productName);

    const orders = user.orders || [];
    orders.push(product.id);
    await this.userRepository.update(user.id, {orders: orders});
    return user;
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
