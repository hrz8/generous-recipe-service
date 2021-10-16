import { RestfulEndpoint } from '@/types/domains'

const restfulEndpoints: RestfulEndpoint[] = [
    {
        path: '/greeter',
        aliases: {
            'GET hello': 'greeter.hello',
            'GET welcome': 'greeter.welcome',
        },
    },
]

export default restfulEndpoints
