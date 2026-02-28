import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, ManyToOne } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/user.entity';
;

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({
    type: 'text',
    unique: true,
  })
  title: string;

  @Column({
    type: 'float',
    default: 0,
  })
  price: number

  @Column({
    type: 'text',
    default: '',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'text',
    unique: true,
    nullable: false
  })
  slug: string;

  @Column({
    type: 'float',
    default: 0,
  })
  stock: number;

  @Column({
    type: 'text',
    array: true,
  })
  sizes: string[];

  @Column('text')
  gender: string;

  //tags
  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags: string[];

 @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  }) 
  images?: ProductImage[];

  @ManyToOne(
    () => User, 
    (user) => user.products,
    {eager: true},
  )
  user: User;

  @BeforeInsert()
  checkSlug() {
    if(!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug.toLowerCase().replaceAll(' ', '_').replaceAll("'","");
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug.toLowerCase().replaceAll(' ', '_').replaceAll("'","");
  }
}
