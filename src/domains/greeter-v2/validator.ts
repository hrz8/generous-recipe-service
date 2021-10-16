import { DomainActionValidator } from '@/types/domains'

const validators: DomainActionValidator = {
    welcome: {
        params: {
            $$type: 'object|optional',
        },
        query: {
            $$type: 'object',
            name: 'string',
        },
        body: {
            $$type: 'object|optional',
        },
    },
}

export default validators
