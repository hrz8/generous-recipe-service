import { DomainActionValidator } from '@/types/domains'

const validators: DomainActionValidator = {
    // GET
    get: {
        params: {
            type: 'object',
            optional: true,
            props: {
                id: {
                    type: 'number',
                    positive: true,
                },
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
