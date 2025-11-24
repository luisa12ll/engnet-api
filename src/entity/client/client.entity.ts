import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ClientEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

     @Column()
    fiscalCode: string;

    @Column()
    email: string;
}