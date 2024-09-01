import { AbstractEntity } from 'src/entities/abstract.entity';
import { Home } from 'src/entities/home.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'user' })
export class User extends AbstractEntity {
  @ManyToMany(() => Home, (home) => home.users)
  @JoinTable({
    name: 'user_home_rel',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'home_id',
      referencedColumnName: 'id',
    },
  })
  homes: Home[];

  @Column()
  username: string;

  @Column()
  email: string;
}
