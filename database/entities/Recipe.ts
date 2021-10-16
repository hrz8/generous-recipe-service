import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm'
import { RecipeCategory } from './RecipeCategory'
import { Step } from './Step'
import { StepIngredients } from './StepIngredients'
import { User } from './User'

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column({
        length: 255,
    })
    public name!: string

    @Column('text', {
        nullable: true,
    })
    public description?: string

    // Relations FK
    @ManyToOne(() => User, {
        nullable: false,
    })
    @JoinColumn({
        name: 'author_id',
    })
    public author!: User

    // Relations M2M
    @ManyToMany(() => RecipeCategory)
    @JoinTable({
        name: 'recipe_category_recipe',
    })
    public recipeCategories?: RecipeCategory[]

    // Relations 1toM
    @OneToMany(() => Step, (steps) => steps.recipe)
    public steps?: Step[]

    @OneToMany(
        () => StepIngredients,
        (stepIngredients) => stepIngredients.recipe
    )
    public stepIngredients?: StepIngredients[]
}
