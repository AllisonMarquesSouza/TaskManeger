import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity({ name: 'task' })
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @Column({ type: 'timestamp' })
    expiration_date: Date;


}