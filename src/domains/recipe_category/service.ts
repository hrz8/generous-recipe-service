import { Service, ServiceBroker, Errors } from 'moleculer'
import validators from './validator'
import RecipeCategoryRepository from './repository'
import { RecipeCategoryGetPayload } from './types'
import { CustomContext } from '@/types/broker'
import { Response } from '@/utils/response/response'
import CommonMixin from '@/mixins/common.mixin'

export default class RecipeCategoryService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        const commonMixin = new CommonMixin().schema
        this.parseServiceSchema({
            name: 'recipe_category',
            mixins: [commonMixin],
            actions: {
                get: {
                    cache: true,
                    params: validators.get,
                    handler: async (
                        ctx: CustomContext<RecipeCategoryGetPayload>
                    ): Promise<Response> => {
                        const id = ctx.params.params.id
                        const result =
                            await RecipeCategoryRepository.get(
                                ctx,
                                id
                            )
                        if (!result) {
                            throw new Errors.MoleculerError(
                                'recipe category not found',
                                404,
                                'NOT_FOUND',
                                { id }
                            )
                        }
                        return new Response(result)
                    },
                },
            },
        })
    }
}
