import { Service, ServiceBroker } from 'moleculer'
import { IngredientCategory } from '@db/entities/IngredientCategory'
import { Ingredient } from '@db/entities/Ingredient'
import validators from './validator'
import { IngredientCreatePayload } from './types'
import IngredientRepository from './repository'
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
                                data: category,
                            }: {
                                data: IngredientCategory
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
                        ingredient.ingredientCatories =
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
