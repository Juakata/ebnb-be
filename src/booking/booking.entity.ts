import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Booking {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  initial_time: string;

  @Column()
  end_time: string;

  @Column()
  initial_date: string;

  @Column()
  end_date: string;

  @Column()
  space: string;
}
