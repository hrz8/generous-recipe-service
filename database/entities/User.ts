import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column({
        length: 45,
    })
    public name!: string
}
