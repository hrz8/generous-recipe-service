import { get as _get } from 'lodash'
import { FindManyOptions, Repository } from 'typeorm'
import { Recipe } from '@db/entities/Recipe'
import { RecipeCreatePayload } from './types'
import { CustomContext } from '@/types/broker'

export default abstract class RecipeRepository {
    public static async repo(
        ctx: CustomContext
    ): Promise<Repository<Recipe>> {
        return ctx.broker.dbService.getRepository(Recipe)
    }

    public static async getAll(
        ctx: CustomContext,
        payload: FindManyOptions<Recipe>
    ): Promise<[Recipe[], number]> {
        const listPayload = _get(ctx, 'listPayload', {})
        return await (
            await this.repo(ctx)
        ).findAndCount({
            ...listPayload,
            payload,
        })
    }

    public static async get(
        ctx: CustomContext,
        id: number
    ): Promise<Recipe> {
        const result = await (
            await this.repo(ctx)
        ).findOne(id)
        return result
    }

    public static async create(
        ctx: CustomContext<RecipeCreatePayload>,
        payload: Recipe
    ): Promise<Recipe> {
        const result = await (
            await this.repo(ctx)
        ).save(payload)
        return result
    }
}
