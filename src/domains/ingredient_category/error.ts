import { Errors } from 'moleculer'

const prefix = 'ingredient-category'
export class DomainsIngredientCategoryError extends Errors.MoleculerError {
    public constructor(
        msg: string,
        code: number,
        type: string,
        data: any
    ) {
        super(msg, code, type, data)
    }
}

export default {
    notFound: (
        id: number
    ): DomainsIngredientCategoryError =>
        new DomainsIngredientCategoryError(
            'ingredient category id not found',
            404,
            `DOMAINS-${prefix}-001`.toUpperCase(),
            { id }
        ),
}
