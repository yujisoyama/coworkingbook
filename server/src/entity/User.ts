import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Book } from "./Book";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text', nullable: false})
    name: string

    @Column({type: 'text', nullable: false})
    email: string

    @Column({type: 'text', nullable: false})
    password: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Book, book => book.user)
    books: Book[]
}
