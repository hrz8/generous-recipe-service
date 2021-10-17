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
                stepNumber: {
                    type: 'number',
                    positive: true,
                    optional: true,
                },
                description: {
                    type: 'string',
                    optional: true,
                },
                timer: {
                    type: 'number',
                    positive: true,
                    optional: true,
                },
                image: {
                    type: 'string',
                    empty: false,
                    optional: true,
                },
                recipe: {
                    type: 'number',
                    positive: true,
                },
                ingredients: {
                    type: 'array',
                    optional: true,
                    items: {
                        type: 'object',
                        props: {
                            id: {
                                type: 'number',
                                positive: true,
                            },
                            amount: {
                                type: 'number',
                                optional: true,
                                positive: true,
                            },
                            unit: {
                                type: 'string',
                                optional: true,
                                empty: false,
                            },
                        },
                    },
                },
            },
        },
    },
}

export default validators
