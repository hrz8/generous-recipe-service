import {
    Entity,
    Column,
    OneToMany,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm'

@Entity()
export class RecipeCategory {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column({
        length: 45,
    })
    public name!: string

    // Relations SELF
    @ManyToOne(
        () => RecipeCategory,
        (recipeCategory) => recipeCategory.children
    )
    public parent?: RecipeCategory

    @OneToMany(
        () => RecipeCategory,
        (recipeCategory) => recipeCategory.parent
    )
    public children?: RecipeCategory[]
}
