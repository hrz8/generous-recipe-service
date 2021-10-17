import { Errors } from 'moleculer'

const prefix = 'user'
export class DomainsUserError extends Errors.MoleculerError {
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
    notFound: (id: number): DomainsUserError =>
        new DomainsUserError(
            'user id not found',
            404,
            `DOMAINS-${prefix}-001`.toUpperCase(),
            { id }
        ),
}
