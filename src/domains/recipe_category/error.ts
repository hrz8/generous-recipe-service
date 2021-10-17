import { Errors } from 'moleculer'

const prefix = 'recipe-category'
export class DomainsRecipeCategoryError extends Errors.MoleculerError {
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
    notFound: (id: number): DomainsRecipeCategoryError =>
        new DomainsRecipeCategoryError(
            'recipe category id not found',
            404,
            `DOMAINS-${prefix}-001`.toUpperCase(),
            { id }
        ),
}
