import { DomainActionValidator } from '@/types/domains'

const validators: DomainActionValidator = {
    welcome: {
        params: {
            $$type: 'object|optional',
        },
        query: {
            $$type: 'object|optional',
            pagination: {
                $$type: 'object|optional',
                page: 'string',
                limit: 'string',
            },
        },
        body: {
            $$type: 'object|optional',
        },
    },
}

export default validators
