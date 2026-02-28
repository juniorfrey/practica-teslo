import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTabla();
    const adminUser = await this.insertUsers();
    await this.insertProducts(adminUser);
    return "Seed executed";
  }

  private async deleteTabla() {
    await this.productService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const users_sb = await this.userRepository.save(users);
    return users_sb[0];
  }

  private async insertProducts(adminUser: User) {
    await this.productService.deleteAllProducts();

    const products = initialData.products;

    //const insertPromises = [];
    const insertPromises: ReturnType<ProductsService["create"]>[] = [];

    products.forEach((product) => {
      insertPromises.push(this.productService.create(product, adminUser));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
