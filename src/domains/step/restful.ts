import { RestfulEndpoint } from '@/types/domains'

const restfulEndpoints: RestfulEndpoint[] = [
    {
        path: '/recipe/step',
        aliases: {
            'POST ': 'step.create',
        },
    },
]

export default restfulEndpoints
