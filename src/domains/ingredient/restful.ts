import { RestfulEndpoint } from '@/types/domains'

const restfulEndpoints: RestfulEndpoint[] = [
    {
        path: '/ingredient',
        aliases: {
            'POST ': 'ingredient.create',
        },
    },
]

export default restfulEndpoints
