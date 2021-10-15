import { Entity, Column, ManyToOne } from 'typeorm'
import { Ingredient } from './Ingredient'
import { Recipe } from './Recipe'
import { Step } from './Step'

@Entity()
export class StepIngredients {
    @Column({
        nullable: true,
    })
    public amount?: number

    @Column({
        length: 25,
        nullable: true,
    })
    public unit?: string

    // Relations FK
    @ManyToOne(() => Ingredient, {
        nullable: false,
    })
    public ingredient!: Ingredient

    // Relations Mto1
    @ManyToOne(() => Recipe, (recipe) => recipe.stepIngredients, {
        primary: true,
    })
    public recipe!: Recipe

    @ManyToOne(() => Step, (step) => step.stepIngredients, {
        primary: true,
    })
    public step!: Step
}
