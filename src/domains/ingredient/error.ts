import { Errors } from 'moleculer'

const prefix = 'ingredient'
export class DomainsIngredientError extends Errors.MoleculerError {
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
    notFound: (id: number): DomainsIngredientError =>
        new DomainsIngredientError(
            'ingredient id not found',
            404,
            `DOMAINS-${prefix}-001`.toUpperCase(),
            { id }
        ),
}
