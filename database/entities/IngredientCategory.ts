import {
    Entity,
    Column,
    OneToMany,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm'

@Entity()
export class IngredientCategory {
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

    // Relations SELF
    @ManyToOne(
        () => IngredientCategory,
        (ingredientCategory) => ingredientCategory.children
    )
    public parent?: IngredientCategory

    @OneToMany(
        () => IngredientCategory,
        (ingredientCategory) => ingredientCategory.parent
    )
    public children?: IngredientCategory[]
}
