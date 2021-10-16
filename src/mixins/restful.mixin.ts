import { Service, ServiceSchema } from 'moleculer'
import { MixinSchema } from '@/types/broker'

export default class RestfulMixin
    implements Partial<ServiceSchema>, ThisType<Service>
{
    public schema: MixinSchema

    public constructor() {
        this.schema = {
            settings: {
                cors: {
                    origin: '*',
                    methods: [
                        'GET',
                        'OPTIONS',
                        'POST',
                        'PUT',
                        'DELETE',
                    ],
                    allowedHeaders: '*',
                    exposedHeaders: '*',
                    credentials: true,
                    maxAge: 3600,
                },
            },
            merged: async (
                schema: ServiceSchema
            ): Promise<void> => {
                const routesDefaultOptions = {
                    mergeParams: false,
                    mappingPolicy: 'restrict',
                    logging: true,
                }
                const mutatedRoutes =
                    schema.settings.routes.map(
                        (route: any) => ({
                            ...routesDefaultOptions,
                            ...route,
                            bodyParsers: {
                                json: {
                                    strict: false,
                                    limit: '10MB',
                                },
                                urlencoded: {
                                    extended: true,
                                    limit: '10MB',
                                },
                            },
                        })
                    )
                schema.settings.routes = mutatedRoutes
            },
        }
    }
}
