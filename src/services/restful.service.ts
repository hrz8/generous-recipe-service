import env from 'env-var'
import { Service, ServiceBroker } from 'moleculer'
import ApiGateway from 'moleculer-web'
import glob from 'glob'
import RestfulMixin from '@/mixins/restful.mixin'
import { RestfulEndpoint } from '@/types/domains'

export default class RestfulService extends Service {
    public constructor(broker: ServiceBroker) {
        super(broker)

        const restfulMixin = new RestfulMixin().schema

        const routes = this.buildRoutes()

        this.parseServiceSchema({
            name: 'restful-gateway',
            mixins: [ApiGateway, restfulMixin],
            settings: {
                path: env
                    .get('RESTFUL_PATH')
                    .default('/api')
                    .asString(),
                port: env
                    .get('RESTFUL_PORT')
                    .default(3000)
                    .asInt(),
                routes,
                logging: false,
            },
        })
    }

    private buildRoutes(): RestfulEndpoint[] {
        const routes = glob.sync(
            './src/domains/**/restful.js'
        )
        return routes.reduce(
            (acc, curr) => [
                ...acc,
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                ...require(curr.replace('./src', '..'))
                    .default,
            ],
            [] as RestfulEndpoint[]
        )
    }
}
