import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@Entity('period_type')
export class Period {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text', nullable: false })
    type: string
    //'morning', 'afternoon', 'fullday'

    @OneToMany(() => Book, book => book.period)
    books: Book[]

}