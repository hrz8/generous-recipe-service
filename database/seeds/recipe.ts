import { Recipe } from '@db/entities/Recipe'
import recipeCategories from './recipe_category'
import users from './user'

const recipes: Recipe[] = [
    {
        id: 1,
        name: 'Frutang Cungcan',
        author: users[3],
        recipeCategories: [recipeCategories[2], recipeCategories[0]],
    },
    {
        id: 2,
        name: 'Telur Gulung',
        author: users[1],
        recipeCategories: [recipeCategories[1]],
    },
    {
        id: 3,
        name: 'Crabby Patty',
        author: users[4],
        recipeCategories: [recipeCategories[1]],
    },
    {
        id: 4,
        name: 'Ulala Bakar',
        author: users[1],
        recipeCategories: [recipeCategories[0]],
    },
    {
        id: 5,
        name: 'Horses Head',
        author: users[3],
        recipeCategories: [recipeCategories[4]],
    },
    {
        id: 6,
        name: 'Nasi Goreng',
        author: users[2],
        recipeCategories: [recipeCategories[2]],
    },
    {
        id: 7,
        name: 'Sate Bebek',
        author: users[0],
        recipeCategories: [recipeCategories[3]],
    },
]

export default recipes
