import { IncomingMessage, ServerResponse } from 'http'
import { Service, ServiceSchema } from 'moleculer'
import { get as _get } from 'lodash'
import { SuccessResponse } from '../utils/response/success'
import { CustomContext, MixinSchema } from '@/types/broker'
import { Response } from '@/utils/response/response'

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
                            onAfterCall: (
                                ctx: CustomContext,
                                routes: any,
                                req: IncomingMessage,
                                res: ServerResponse,
                                response: SuccessResponse
                            ) => {
                                const serviceName = _get(
                                    req,
                                    '$action.service.name',
                                    ''
                                )
                                const actionName = _get(
                                    req,
                                    '$action.rawName',
                                    ''
                                )
                                const version = _get(
                                    req,
                                    '$action.service.version',
                                    1
                                )
                                const responseMessage =
                                    _get(
                                        req,
                                        '$action.responseMessage',
                                        `success ${actionName} ${serviceName}`
                                    )
                                return new Response(
                                    response.result,
                                    response.meta,
                                    {
                                        responseMessage,
                                        apiVersion: `v${version}`,
                                    }
                                )
                            },
                            onError: (
                                req: IncomingMessage,
                                res: ServerResponse,
                                err: Error & {
                                    ctx: CustomContext
                                }
                            ) => {
                                const errorName = _get(
                                    err,
                                    'name',
                                    'ErrorResponse'
                                )
                                const errorMsg = _get(
                                    err,
                                    'message',
                                    'Internal Server Error'
                                )
                                const errorType = _get(
                                    err,
                                    'type',
                                    'INTERNAL_SERVER_ERROR'
                                )
                                const errorData = _get(
                                    err,
                                    'data',
                                    null
                                )
                                const errorCode = _get(
                                    err,
                                    'code',
                                    500
                                )
                                const version = _get(
                                    err.ctx,
                                    'service.version',
                                    1
                                )

                                res.setHeader(
                                    'Content-Type',
                                    'application/json'
                                )
                                res.statusCode = errorCode
                                res.end(
                                    JSON.stringify(
                                        new Response(
                                            null,
                                            {},
                                            {
                                                responseMessage:
                                                    errorMsg,
                                                apiVersion: `v${version}`,
                                                code: errorCode,
                                                error: {
                                                    name: errorName,
                                                    type: errorType,
                                                    data: errorData,
                                                },
                                            }
                                        )
                                    )
                                )
                            },
                        })
                    )
                schema.settings.routes = mutatedRoutes
            },
        }
    }
}
