import { Service, ServiceBroker } from 'moleculer'
import validators from './validator'
import RecipeCategoryRepository from './repository'
import RecipeCategoryError from './error'
import { RecipeCategoryGetPayload } from './types'
import { CustomContext } from '@/types/broker'
import { SuccessResponse } from '@/utils/response/success'
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
                    ): Promise<SuccessResponse> => {
                        const id = ctx.params.params.id
                        const result =
                            await RecipeCategoryRepository.get(
                                ctx,
                                id
                            )
                        if (!result) {
                            throw RecipeCategoryError.notFound(
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
