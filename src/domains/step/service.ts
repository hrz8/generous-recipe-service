import { Service, ServiceBroker } from 'moleculer'
import { UserGetPayload } from '@domains/user/types'
import { Ingredient } from '@db/entities/Ingredient'
import { MoreThanOrEqual } from 'typeorm'
import { Step } from '@db/entities/Step'
import { Recipe } from '@db/entities/Recipe'
import { StepIngredients } from '@db/entities/StepIngredients'
import validators from './validator'
import StepRepository from './repository'
import { StepCreatePayload } from './types'
import { CustomContext } from '@/types/broker'
import { SuccessResponse } from '@/utils/response/success'
import CommonMixin from '@/mixins/common.mixin'
import TransactionMixin from '~/src/mixins/transaction.mixin'

export default class RecipeService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)

        const commonMixin = new CommonMixin().schema
        const trxMixin = new TransactionMixin().schema

        this.parseServiceSchema({
            name: 'step',
            mixins: [commonMixin, trxMixin],
            actions: {
                create: {
                    params: validators.create,
                    handler: async (
                        ctx: CustomContext<StepCreatePayload>
                    ): Promise<SuccessResponse> => {
                        // Get required params
                        const stepNumberPayload =
                            ctx.params.body.stepNumber
                        const recipeId =
                            ctx.params.body.recipe
                        const ingredients =
                            ctx.params.body.ingredients

                        const recipeGetPayload: UserGetPayload =
                            {
                                params: {
                                    id: recipeId,
                                },
                                query: {},
                                body: {},
                            }

                        const {
                            data: recipe,
                        }: { data: Recipe } =
                            await ctx.call(
                                'recipe.get',
                                recipeGetPayload
                            )

                        const stepIngredientsInstance: StepIngredients[] =
                            []
                        for (const ing of ingredients) {
                            const {
                                data: ingredient,
                            }: { data: Ingredient } =
                                await ctx.call(
                                    'ingredient.get',
                                    {
                                        params: {
                                            id: ing.id,
                                        },
                                    }
                                )
                            const stepIngredient =
                                new StepIngredients()
                            stepIngredient.ingredient =
                                ingredient
                            stepIngredient.recipe = recipe
                            stepIngredient.amount =
                                ing.amount
                            stepIngredient.unit = ing.unit
                            stepIngredientsInstance.push(
                                stepIngredient
                            )
                        }

                        // Get latest step number by getAll with sort by stepNumber limit 1
                        const [lastSteps] = (
                            await StepRepository.getAll(
                                ctx,
                                {
                                    where: {
                                        recipe: recipeId,
                                    },
                                    order: {
                                        stepNumber: 'DESC',
                                    },
                                    take: 1,
                                }
                            )
                        )[0]
                        let stepNumberToAppend =
                            lastSteps.stepNumber + 1

                        if (
                            stepNumberPayload <=
                            lastSteps.stepNumber
                        ) {
                            // If stepNumberPayload is in the middle
                            // Shifting the upper stepNumber
                            stepNumberToAppend =
                                stepNumberPayload
                            const [steps] =
                                await StepRepository.getAll(
                                    ctx,
                                    {
                                        where: {
                                            recipe: recipeId,
                                            stepNumber:
                                                MoreThanOrEqual(
                                                    stepNumberPayload
                                                ),
                                        },
                                    }
                                )
                            for (const s of steps) {
                                s.stepNumber =
                                    s.stepNumber + 1
                                await StepRepository.update(
                                    ctx,
                                    s.id,
                                    s
                                )
                            }
                        }

                        // Create Step with repository
                        const step = new Step()
                        step.stepNumber = stepNumberToAppend
                        step.recipe = recipe
                        step.timer = ctx.params.body.timer
                        step.image = ctx.params.body.image
                        step.description =
                            ctx.params.body.description
                        step.stepIngredients =
                            stepIngredientsInstance
                        const result =
                            await StepRepository.create(
                                ctx,
                                step
                            )

                        // Clean Recipe list cache
                        await ctx.broker.broadcast(
                            'cache.clean.recipe.list'
                        )

                        // Return action's response
                        return new SuccessResponse(result)
                    },
                },
            },
        })
    }
}
