import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm'
import { IngredientCategory } from './IngredientCategory'

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column({
        length: 45,
    })
    public name!: string

    @Column()
    public color!: number

    @Column({
        length: 45,
        nullable: true,
    })
    public img?: string

    // Relations M2M
    @ManyToMany(() => IngredientCategory)
    @JoinTable({
        name: 'ingredient_category_ingredient',
    })
    public ingredientCategories?: IngredientCategory[]
}
