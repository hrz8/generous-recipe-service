import { Context, Service, ServiceSchema } from 'moleculer'
import { set as _set, get as _get } from 'lodash'
import { FindManyOptions } from 'typeorm'
import {
    CustomServiceBroker,
    MixinSchema,
} from '@/types/broker'

interface QueryParamsList {
    query: {
        pagination?: {
            page: string
            limit: string
        }
        sort?: {
            by: string
            mode: string
        }
    }
}

export default class CommonMixin
    implements Partial<ServiceSchema>, ThisType<Service>
{
    public schema: MixinSchema

    public constructor() {
        this.schema = {
            hooks: {
                before: {
                    list: (
                        ctx: Context<QueryParamsList> & {
                            broker: CustomServiceBroker
                        }
                    ) => {
                        const payload: FindManyOptions = {}
                        this.extractPagingClause(
                            ctx,
                            payload
                        )
                        this.extractSortingClause(
                            ctx,
                            payload
                        )
                        _set(ctx, 'listPayload', payload)
                    },
                },
            },
        }
    }

    private extractPagingClause(
        ctx: Context<QueryParamsList>,
        payload: FindManyOptions
    ): void {
        const page = Number(
            _get(ctx.params.query, 'pagination.page', null)
        )
        const limit = Number(
            _get(ctx.params.query, 'pagination.limit', null)
        )
        if (page && limit) {
            payload.take = limit
            payload.skip = limit * (page - 1)
        }
    }

    private extractSortingClause(
        ctx: Context<QueryParamsList> & {
            broker: CustomServiceBroker
        },
        payload: FindManyOptions
    ): void {
        const sortBy = _get(
            ctx.params.query,
            'sort.by',
            null
        )
        const sortMode = _get(
            ctx.params.query,
            'sort.mode',
            null
        )
        if (sortBy && sortMode) {
            const columns = ctx.broker.dbService
                .getMetadata(ctx.service.name)
                .ownColumns.map(
                    (column) => column.propertyName
                )
            if (columns.includes(sortBy)) {
                payload.order = { [sortBy]: sortMode }
            }
        }
    }
}
