import { Entity, PrimaryColumn, Column, ObjectIdColumn, Unique } from 'typeorm';
@Unique(['name'])
@Entity()
export class Feature {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
