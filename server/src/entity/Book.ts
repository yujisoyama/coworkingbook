import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Users";


@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.books)
    @JoinColumn({name: 'user_id'})
    user: User

    @Column({type: 'int', nullable: false})
    desk: number

    @Column({type: 'text', nullable: false})
    period: string

    @Column({type: 'date', nullable: false})
    booking_day: Date

    @CreateDateColumn()
    created_at: Date
}