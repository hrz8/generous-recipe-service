import { Service, ServiceSchema } from 'moleculer'
import { set as _set, get as _get } from 'lodash'
import { FindManyOptions } from 'typeorm'
import { SuccessResponse } from '@/utils/response/success'
import { Response } from '@/utils/response/response'
import { MixinSchema } from '@/types/broker'

export default class CommonMixin
    implements Partial<ServiceSchema>, ThisType<Service>
{
    public schema: MixinSchema

    public constructor() {
        this.schema = {
            hooks: {
                before: {
                    list: (ctx) => {
                        const payload: FindManyOptions = {}
                        const page = Number(
                            _get(
                                ctx.params.query,
                                'pagination.page',
                                null
                            )
                        )
                        const limit = Number(
                            _get(
                                ctx.params.query,
                                'pagination.limit',
                                null
                            )
                        )
                        if (page && limit) {
                            payload.take = limit
                            payload.skip =
                                limit * (page - 1)
                        }
                        _set(ctx, 'listPayload', payload)
                    },
                },
                after: {
                    '*': (
                        ctx,
                        res: Response
                    ): SuccessResponse => {
                        const serviceName = ctx.service.name
                        const actionName =
                            ctx.action.rawName
                        const version =
                            ctx.service.version || 1
                        const { responseMessage } =
                            ctx.action
                        return new SuccessResponse(
                            res.data,
                            res.meta,
                            {
                                responseMessage:
                                    responseMessage ||
                                    `success ${actionName} ${serviceName}`,
                                apiVersion: `v${version}`,
                            }
                        )
                    },
                },
            },
        }
    }
}
