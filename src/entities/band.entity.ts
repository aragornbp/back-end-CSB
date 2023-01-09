import { getRounds, hashSync } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
} from "typeorm";
import Invites from "./invites.entity";
import Requirement from "./requirement.entity";

@Entity("band")
export default class Band {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 800, nullable: true })
  bio: string;

  @Column({ length: 2, nullable: true })
  state: string;

  @Column({ length: 50, nullable: true })
  genre: string;

  @Column({ length: 50, nullable: true })
  social_media: string;

  @Column({ length: 400, nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Requirement, (requirement) => requirement.bands)
  requirement: Requirement[];

  @OneToMany(() => Invites, (invite) => invite.bandId)
  invites: Invites[];

  @Column({ default: false })
  isAdm: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);

    if (!isEncrypted) this.password = hashSync(this.password, 10);
  }
}
