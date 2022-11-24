import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Period } from "./Period";
import { User } from "./User";


@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.books)
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column({type: 'text', nullable: false})
    type: string;

    @Column({ type: 'int', nullable: false })
    booking_number: number;

    @ManyToOne(() => Period, period => period.id)
    @JoinColumn({ name: 'period_id' })
    period: Period

    @Column({ type: 'date', nullable: false })
    booking_day: Date;

    @CreateDateColumn()
    created_at: Date;
}