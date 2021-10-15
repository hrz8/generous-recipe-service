import { Step } from '@db/entities/Step'
import recipes from './recipe'

const steps: Step[] = [
    // Telur Gulung
    {
        id: 1,
        recipe: recipes[1],
        stepNumber: 1,
        timer: 3,
        description: 'menyiapkan',
    },
    {
        id: 2,
        recipe: recipes[1],
        stepNumber: 2,
        timer: 10,
        description: 'meng cracking kan',
    },
    {
        id: 3,
        recipe: recipes[1],
        stepNumber: 3,
        timer: 15,
        description: 'mengocok',
    },
    {
        id: 4,
        recipe: recipes[1],
        stepNumber: 4,
        timer: 10,
        description: 'menggoreng',
    },
    {
        id: 5,
        recipe: recipes[1],
        stepNumber: 5,
        timer: 5,
        description: 'meng cracking kan',
    },
    // Ulala Bakar
    {
        id: 6,
        recipe: recipes[3],
        stepNumber: 1,
        timer: 30,
        description: 'bla 1',
    },
    {
        id: 7,
        recipe: recipes[3],
        stepNumber: 2,
        timer: 20,
        description: 'bla 2',
    },
    {
        id: 8,
        recipe: recipes[3],
        stepNumber: 3,
        timer: 20,
        description: 'bla 3',
    },
    // Frutang Cungcan
    {
        id: 9,
        recipe: recipes[0],
        stepNumber: 1,
        timer: 3,
        description: 'open',
    },
    {
        id: 10,
        recipe: recipes[0],
        stepNumber: 2,
        timer: 6,
        description: 'shake',
    },
    {
        id: 11,
        recipe: recipes[0],
        stepNumber: 3,
        timer: 11,
        description: 'dipping',
    },
    {
        id: 12,
        recipe: recipes[0],
        stepNumber: 4,
        timer: 5,
        description: 'baking',
    },
]

export default steps
