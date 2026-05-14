import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Registration {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  eventName!: string;

}