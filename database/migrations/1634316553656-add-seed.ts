import { getRepository, MigrationInterface } from 'typeorm'
import { Ingredient } from '../entities/Ingredient'
import { IngredientCategory } from '../entities/IngredientCategory'
import { Recipe } from '../entities/Recipe'
import { RecipeCategory } from '../entities/RecipeCategory'
import { Step } from '../entities/Step'
import { StepIngredients } from '../entities/StepIngredients'
import { User } from '../entities/User'
import ingredients from '../seeds/ingredient'
import ingredientCategories from '../seeds/ingredient_category'
import recipes from '../seeds/recipe'
import recipeCategories from '../seeds/recipe_category'
import steps from '../seeds/step'
import stepIngredients from '../seeds/step_ingredient'
import users from '../seeds/user'

export class addSeed1634234758016 implements MigrationInterface {
    public async up(): Promise<void> {
        await Promise.all([
            getRepository(User).save(users),
            getRepository(IngredientCategory).save(ingredientCategories),
            getRepository(RecipeCategory).save(recipeCategories),
            ,
        ])
        await getRepository(Ingredient).save(ingredients)
        await getRepository(Recipe).save(recipes)
        await getRepository(Step).save(steps)
        await getRepository(StepIngredients).save(stepIngredients)
    }

    public async down(): Promise<void> {
        return
    }
}
