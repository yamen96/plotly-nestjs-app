## Description

Simple [NestJS](https://github.com/nestjs/nest) app using a TypeScript, TypeORM, SQLite and GraphQL backend and a simple front-end to add users / products.

## Installation

```bash
$ npm install
```

## Running the app locally

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Usage

### Frontend

Once the app is running locally you can visit the UI on `http://localhost:3000/` and the GraphQL playground on `http://localhost:3000/graphql`. The GraphQL playground also includes graphql docs and a schema for all Queries, Mutations, Types and Inputs.

### GraphQL Queries

You can perform the following queries:

```
type Query {
  products: [Product]!
  product(id: String!): Product
  users: [User]!
  user(id: String!): User
}
```

**Example 1**

To get all users and display their `id`, `name`, `email` and list of `orders`:

```
query {
  users {
    id
    name
    email
    orders {
      name,
      price
    }
  }
}
```

**Example 2**

To get a specific product and display its `name` and `price` you must provide the `id`:

```
query {
  product(id: "3") {
    name
    price
  }
}
```

### GraphQL Mutations

You can perform the following mutations:

```
type Mutation {
  createProduct(createProductInput: CreateProductInput!): Product!
  updateProduct(updateProductInput: UpdateProductInput!): Product!
  removeProduct(id: String!): Product
  createUser(createUserInput: CreateUserInput!): User!
  updateUser(updateUserInput: UpdateUserInput!): User!
  removeUser(id: String!): User
  addProduct(addProductInput: AddProductInput!): User!
}
```

Most mutations are self explanatory and provide basic CRUD functionality for the User and Product entities, other than the `addProduct` mutation. Given a user's name and a product's name this mutation allows the product to be added to the user's list of orders. If a user with the given name doesn't exist, a new user is created and if a product with the given name doesn't exist a new product is created then added to that user's list of orders. This mutation is used by the simple front-end.

**Example**

```
mutation {
  addProduct(addProductInput:  {
    userName: "testUser",
    productName: "testProduct",
  }) {
    name,
    email,
    age,
    orders {
      name
    }
  }
}
```
