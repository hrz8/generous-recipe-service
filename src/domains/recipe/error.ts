import { Errors } from 'moleculer'

const prefix = 'recipe'
export class DomainsRecipeError extends Errors.MoleculerError {
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
    notFound: (id: number): DomainsRecipeError =>
        new DomainsRecipeError(
            'recipe id not found',
            404,
            `DOMAINS-${prefix}-001`.toUpperCase(),
            { id }
        ),
}
