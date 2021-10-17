import { DomainActionValidator } from '@/types/domains'

const validators: DomainActionValidator = {
    // LIST
    list: {
        params: {
            type: 'object',
            optional: true,
            props: {},
        },
        query: {
            type: 'object',
            optional: true,
            props: {
                pagination: {
                    type: 'object',
                    default: {
                        page: '1',
                        limit: '5',
                    },
                    props: {
                        page: {
                            type: 'string',
                            empty: false,
                        },
                        limit: {
                            type: 'string',
                            empty: false,
                        },
                    },
                },
                sort: {
                    type: 'object',
                    default: {
                        by: 'id',
                        mode: 'ASC',
                    },
                    props: {
                        by: {
                            type: 'string',
                            empty: false,
                        },
                        mode: {
                            type: 'enum',
                            values: ['ASC', 'DESC'],
                        },
                    },
                },
            },
        },
        body: {
            type: 'object',
            optional: true,
            props: {},
        },
    },
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
                description: {
                    type: 'string',
                    optional: true,
                },
                author: {
                    type: 'number',
                    positive: true,
                },
                categories: 'number[]',
            },
        },
    },
}

export default validators
