import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Book } from "./Book";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text', nullable: false })
    fullname: string

    @Column({ type: 'text', nullable: false })
    email: string

    @Column({ type: 'text', nullable: false })
    password: string

    @Column({ type: 'text', nullable: true })
    company: string

    @Column({ type: 'text', nullable: true })
    role: string

    // @Column({ type: 'boolean', nullable: false })
    // confirmed: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Book, book => book.user)
    books: Book[]
}
