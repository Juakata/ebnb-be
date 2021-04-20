import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Feature {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
