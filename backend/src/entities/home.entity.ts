import { AbstractEntity } from '@entities/abstract.entity';
import { User } from '@entities/user.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity({ name: 'home' })
export class Home extends AbstractEntity {

  @ManyToMany(() => User, (user) => user.homes)
  users: User[];

  @Column({ name: 'street_address' })
  streetAddress: string;

  @Column()
  state: string;

  @Column()
  zip: number;

  @Column()
  sqft: number;

  @Column()
  beds: number;

  @Column()
  baths: number;

  @Column({ name: 'list_price' })
  listPrice: number;
}
