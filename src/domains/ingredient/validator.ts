import { DomainActionValidator } from '@/types/domains'

const validators: DomainActionValidator = {
    // CREATE
    create: {
        params: {
            type: 'object',
            optional: true,
            props: {},
        },
        query: {
            type: 'object',
            optional: true,
            props: {},
        },
        body: {
            type: 'object',
            optional: true,
            props: {
                name: 'string',
                color: 'number',
                img: {
                    type: 'string',
                    optional: true,
                },
                categories: 'number[]',
            },
        },
    },
}

export default validators
