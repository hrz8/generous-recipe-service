import { RestfulEndpoint } from '@/types/domains'

const restfulEndpoints: RestfulEndpoint[] = [
    {
        path: '/v2/greeter',
        aliases: {
            'GET hello': 'v2.greeter.hello',
            'GET welcome': 'v2.greeter.welcome',
        },
    },
]

export default restfulEndpoints
