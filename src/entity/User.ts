import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users {
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
  twitter_oauth_token: string;

  @Column({ type: "varchar", nullable: true })
  twitter_oauth_token_secret: string;
}
