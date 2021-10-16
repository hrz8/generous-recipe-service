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
                    cache: true,
                    params: validators.list,
                    handler: async (
                        ctx: Context & {
                            broker: CustomServiceBroker
                        }
                    ): Promise<any> => {
                        const payload = _get(
                            ctx,
                            'listPayload',
                            {}
                        )
                        const [result, total] =
                            await ctx.broker.dbService
                                .getRepository(Recipe)
                                .findAndCount({
                                    ...payload,
                                    relations: [
                                        'author',
                                        'steps',
                                        'steps.stepIngredients',
                                        'steps.stepIngredients.ingredient',
                                        'recipeCategories',
                                    ],
                                })
                        return new Response(result, {
                            count: result.length,
                            total,
                        })
                    },
                },
            },
            events: {
                'cache.clean.recipe.list': (): void => {
                    if (this.broker.cacher) {
                        this.broker.cacher.clean(
                            'recipe.list**'
                        )
                    }
                },
            },
        })
    }
}
