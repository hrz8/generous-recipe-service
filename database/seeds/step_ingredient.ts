import { StepIngredients } from '../entities/StepIngredients'
import ingredients from './ingredient'
import recipes from './recipe'
import steps from './step'

const stepIngredients: StepIngredients[] = [
    // Telur Gulung
    {
        ingredient: ingredients[6],
        amount: 20,
        unit: 'pcs',
        recipe: recipes[1],
        step: steps[1],
    },
    {
        ingredient: ingredients[7],
        amount: 500,
        unit: 'ml',
        recipe: recipes[1],
        step: steps[3],
    },
    // Ulala Bakar
    {
        ingredient: ingredients[0],
        amount: 10,
        unit: 'gram',
        recipe: recipes[3],
        step: steps[5],
    },
    {
        ingredient: ingredients[4],
        amount: 21,
        unit: 'sdt',
        recipe: recipes[3],
        step: steps[6],
    },
    {
        ingredient: ingredients[1],
        amount: 1,
        unit: 'liter',
        recipe: recipes[3],
        step: steps[7],
    },
    // Frutang Cungcan
    {
        ingredient: ingredients[8],
        amount: 240,
        unit: 'ml',
        recipe: recipes[0],
        step: steps[9],
    },
    {
        ingredient: ingredients[5],
        amount: 15,
        unit: 'gram',
        recipe: recipes[0],
        step: steps[9],
    },
    {
        ingredient: ingredients[2],
        amount: 95,
        unit: 'lb',
        recipe: recipes[0],
        step: steps[11],
    },
]

export default stepIngredients
