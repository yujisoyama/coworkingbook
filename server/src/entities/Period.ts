import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('period_type')
export class Period {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text', nullable: false })
    type: string
    //'fullday', 'morning', 'afternoon'

}