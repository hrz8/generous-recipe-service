import { Service, ServiceBroker } from 'moleculer'
import { Recipe } from '@db/entities/Recipe'
import validators from './validator'
import RecipeRepository from './repository'
import { RecipeCreatePayload } from './types'
import { CustomContext } from '@/types/broker'
import { Response } from '@/utils/response/response'
import CommonMixin from '@/mixins/common.mixin'
import { User } from '~/database/entities/User'
import { RecipeCategory } from '~/database/entities/RecipeCategory'

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
                        ctx: CustomContext
                    ): Promise<Response> => {
                        const [result, total] =
                            await RecipeRepository.getAll(
                                ctx,
                                {
                                    relations: [
                                        'author',
                                        'steps',
                                        'steps.stepIngredients',
                                        'steps.stepIngredients.ingredient',
                                        'recipeCategories',
                                    ],
                                }
                            )
                        return new Response(result, {
                            count: result.length,
                            total,
                        })
                    },
                },
                create: {
                    params: validators.create,
                    handler: async (
                        ctx: CustomContext<RecipeCreatePayload>
                    ): Promise<Response> => {
                        const authorId =
                            ctx.params.body.authorId
                        const categories =
                            ctx.params.body.categories
                        const {
                            data: author,
                        }: { data: User } = await ctx.call(
                            'user.get',
                            {
                                params: {
                                    id: authorId,
                                },
                            }
                        )
                        const categoriesInstance: RecipeCategory[] =
                            []
                        for (const cat of categories) {
                            const {
                                data: category,
                            }: { data: RecipeCategory } =
                                await ctx.call(
                                    'recipe_category.get',
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
                        const recipe = new Recipe()
                        recipe.author = author
                        recipe.recipeCategories =
                            categoriesInstance
                        recipe.name = ctx.params.body.name
                        recipe.description =
                            ctx.params.body.description
                        await RecipeRepository.create(
                            ctx,
                            recipe
                        )
                        return new Response(recipe)
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
