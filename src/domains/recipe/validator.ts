import { DomainActionValidator } from '@/types/domains'

const validators: DomainActionValidator = {
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
                        page: 'string',
                        limit: 'string',
                    },
                },
                sort: {
                    type: 'object',
                    default: {
                        by: 'id',
                        mode: 'ASC',
                    },
                    props: {
                        by: 'string',
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
}

export default validators
