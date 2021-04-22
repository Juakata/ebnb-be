import { Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
@Unique(['employee_code'])
export class User {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  employee_code: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  email: string;

  @Column()
  liked_spaces: string[];

  @Column()
  reviews: string[];

  @Column()
  bookings: string[];
}
