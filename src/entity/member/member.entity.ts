import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class MemberEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

     @Column()
    role: string;

    @Column()
    email: string;
}