import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { ProductService } from 'src/product/product.service';
import { AddProductInput } from './dto/add-product.input';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService, 
    private readonly productService: ProductService) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query('users')
  findAll() {
    return this.userService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.userService.remove(id);
  }

  @Mutation('addProduct')
  addProduct(@Args('addProductInput') addProductInput: AddProductInput) {
    return this.userService.addProduct(addProductInput.userName, addProductInput.productName);
  }

  @ResolveField()
  orders(@Parent() user: User) {
    return this.productService.findAllWithIds(user.orders);
  }
}
