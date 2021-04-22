import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
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
  email: string;

  @Column()
  liked_spaces: string[];
}
