import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ReimbursementEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    totalValue: number;

    @Column()
    status: boolean;

     @Column()
    description: string;
}