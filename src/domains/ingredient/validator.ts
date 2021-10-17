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
                name: {
                    type: 'string',
                    empty: false,
                },
                color: {
                    type: 'number',
                    positive: true,
                },
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
