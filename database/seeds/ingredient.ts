import { Ingredient } from '@db/entities/Ingredient'
import ingredientCategories from './ingredient_category'

const ingredients: Ingredient[] = [
    {
        id: 1,
        name: 'ingredient 901',
        color: 527,
        ingredientCategories: [
            ingredientCategories[1],
            ingredientCategories[2],
        ],
    },
    {
        id: 2,
        name: 'ingredient 902',
        color: 293,
        ingredientCategories: [
            ingredientCategories[2],
            ingredientCategories[4],
        ],
    },
    {
        id: 3,
        name: 'ingredient 903',
        color: 748,
        ingredientCategories: [
            ingredientCategories[1],
            ingredientCategories[3],
        ],
    },
    {
        id: 4,
        name: 'ingredient 904',
        color: 228,
        ingredientCategories: [
            ingredientCategories[0],
            ingredientCategories[1],
        ],
    },
    {
        id: 5,
        name: 'ingredient 905',
        color: 982,
        ingredientCategories: [
            ingredientCategories[0],
            ingredientCategories[5],
        ],
    },
    {
        id: 6,
        name: 'gula pasir',
        color: 128,
        ingredientCategories: [
            ingredientCategories[4],
            ingredientCategories[2],
        ],
    },
    {
        id: 7,
        name: 'telur',
        color: 948,
        ingredientCategories: [
            ingredientCategories[0],
            ingredientCategories[3],
        ],
    },
    {
        id: 8,
        name: 'minyak',
        color: 390,
        ingredientCategories: [ingredientCategories[2]],
    },
    {
        id: 9,
        name: 'susu kental manis',
        color: 111,
        ingredientCategories: [ingredientCategories[4]],
    },
]

export default ingredients
