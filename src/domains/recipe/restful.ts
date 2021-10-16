import { RestfulEndpoint } from '@/types/domains'

const restfulEndpoints: RestfulEndpoint[] = [
    {
        path: '/recipe',
        aliases: {
            'GET ': 'recipe.list',
        },
    },
]

export default restfulEndpoints
