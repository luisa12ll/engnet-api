import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ReimbursementEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    value: number;

    @Column()
    status: boolean;

     @Column()
    description: string;

    @Column()
    date: string;
}