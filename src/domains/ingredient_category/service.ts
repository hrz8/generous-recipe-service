import { Service, ServiceBroker } from 'moleculer'
import validators from './validator'
import IngredientCategoryRepository from './repository'
import IngredientCategoryError from './error'
import { IngredientCategoryGetPayload } from './types'
import { CustomContext } from '@/types/broker'
import { SuccessResponse } from '@/utils/response/success'
import CommonMixin from '@/mixins/common.mixin'

export default class IngredientCategoryService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        const commonMixin = new CommonMixin().schema
        this.parseServiceSchema({
            name: 'ingredient_category',
            mixins: [commonMixin],
            actions: {
                get: {
                    cache: true,
                    params: validators.get,
                    handler: async (
                        ctx: CustomContext<IngredientCategoryGetPayload>
                    ): Promise<SuccessResponse> => {
                        const id = ctx.params.params.id
                        const result =
                            await IngredientCategoryRepository.get(
                                ctx,
                                id
                            )
                        if (!result) {
                            throw IngredientCategoryError.notFound(
                                id
                            )
                        }
                        return new SuccessResponse(result)
                    },
                },
            },
        })
    }
}
