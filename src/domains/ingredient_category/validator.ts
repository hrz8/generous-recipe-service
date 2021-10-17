import { DomainActionValidator } from '@/types/domains'

const validators: DomainActionValidator = {
    // GET
    get: {
        params: {
            type: 'object',
            optional: true,
            props: {
                id: 'number',
            },
        },
        query: {
            type: 'object',
            optional: true,
            props: {},
        },
        body: {
            type: 'object',
            optional: true,
            props: {},
        },
    },
}

export default validators
