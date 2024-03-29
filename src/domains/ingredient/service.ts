import { Service, ServiceBroker } from 'moleculer'
import { IngredientCategory } from '@db/entities/IngredientCategory'
import { Ingredient } from '@db/entities/Ingredient'
import validators from './validator'
import {
    IngredientCreatePayload,
    IngredientGetPayload,
} from './types'
import IngredientRepository from './repository'
import IngredientError from './error'
import { CustomContext } from '@/types/broker'
import { SuccessResponse } from '@/utils/response/success'
import CommonMixin from '@/mixins/common.mixin'

export default class IngredientService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        const commonMixin = new CommonMixin().schema
        this.parseServiceSchema({
            name: 'ingredient',
            mixins: [commonMixin],
            actions: {
                get: {
                    cache: true,
                    params: validators.get,
                    handler: async (
                        ctx: CustomContext<IngredientGetPayload>
                    ): Promise<SuccessResponse> => {
                        const id = ctx.params.params.id
                        const result =
                            await IngredientRepository.get(
                                ctx,
                                id
                            )
                        if (!result) {
                            throw IngredientError.notFound(
                                id
                            )
                        }
                        return new SuccessResponse(result)
                    },
                },
                create: {
                    params: validators.create,
                    handler: async (
                        ctx: CustomContext<IngredientCreatePayload>
                    ): Promise<SuccessResponse> => {
                        // Get required params
                        const categoriyIds =
                            ctx.params.body.categories

                        // Get IngredientCategory instance from db by calling its action
                        const categoriesInstance: IngredientCategory[] =
                            []
                        for (const cat of categoriyIds) {
                            const {
                                result: category,
                            }: {
                                result: IngredientCategory
                            } = await ctx.call(
                                'ingredient_category.get',
                                {
                                    params: {
                                        id: cat,
                                    },
                                }
                            )
                            categoriesInstance.push(
                                category
                            )
                        }

                        // Prepare new Ingredient instance
                        const ingredient = new Ingredient()
                        ingredient.ingredientCategories =
                            categoriesInstance
                        ingredient.name =
                            ctx.params.body.name
                        ingredient.color =
                            ctx.params.body.color
                        ingredient.img = ctx.params.body.img

                        // Create Ingredient with repository
                        const result =
                            await IngredientRepository.create(
                                ctx,
                                ingredient
                            )
                        return new SuccessResponse(result)
                    },
                },
            },
        })
    }
}
