import {
    Entity,
    Column,
    OneToMany,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm'
import { Recipe } from './Recipe'
import { StepIngredients } from './StepIngredients'

@Entity()
export class Step {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column()
    public stepNumber!: number

    @Column('text', {
        nullable: true,
    })
    public description?: string

    @Column({
        nullable: true,
    })
    public timer?: number

    @Column({
        length: 100,
        nullable: true,
    })
    public image?: string

    // Relations FK
    @ManyToOne(() => Recipe, {
        nullable: false,
    })
    public recipe!: Recipe

    // Relations 1toM
    @OneToMany(
        () => StepIngredients,
        (stepIngredients) => stepIngredients.step
    )
    public stepIngredients?: StepIngredients[]
}
