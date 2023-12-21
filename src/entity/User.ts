import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  firstName: string;

  @Column({ type: "varchar" })
  lastName: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  hashed_password: string;

  @Column({ type: "varchar", nullable: true })
  twitter_token: string;
}
