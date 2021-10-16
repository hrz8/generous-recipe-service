import { Service, ServiceBroker, Context } from 'moleculer'
import { get as _get } from 'lodash'
import validators from './validator'
import { CustomServiceBroker } from '@/types/broker'
import { Recipe } from '~/database/entities/Recipe'
import { Response } from '~/src/utils/response/response'
import CommonMixin from '~/src/mixins/common.mixin'

export default class RecipeService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        const commonMixin = new CommonMixin().schema
        this.parseServiceSchema({
            name: 'recipe',
            mixins: [commonMixin],
            actions: {
                list: {
                    params: validators.welcome,
                    handler: async (
                        ctx: Context<{
                            query: {
                                pagination?: {
                                    page: string
                                    limit: string
                                }
                            }
                        }> & {
                            broker: CustomServiceBroker
                        }
                    ): Promise<any> => {
                        const payload = _get(
                            ctx,
                            'listPayload',
                            {}
                        )
                        const [result, count] =
                            await ctx.broker.dbService
                                .getRepository(Recipe)
                                .findAndCount(payload)
                        return new Response(result, {
                            total: count,
                        })
                    },
                },
            },
        })
    }
}
