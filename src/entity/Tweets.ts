import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "./User";

@Entity()
export class Tweets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  text: string;

  @Column({ type: "int8" })
  userId: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "userId" })
  user: Users;
}
