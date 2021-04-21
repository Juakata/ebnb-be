import { Entity, ObjectIdColumn, PrimaryColumn, Column } from 'typeorm';
import { AllowedType } from './space.type';

@Entity()
export class Space {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: AllowedType;

  @Column()
  place: string;

  @Column()
  image: string;

  @Column()
  capacity: number;
}
