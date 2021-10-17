import { Repository } from 'typeorm'
import { Ingredient } from '@db/entities/Ingredient'
import { IngredientCreatePayload } from './types'
import { CustomContext } from '@/types/broker'

export default abstract class IngredientRepository {
    public static async repo(
        ctx: CustomContext
    ): Promise<Repository<Ingredient>> {
        return ctx.broker.dbService.getRepository(
            Ingredient
        )
    }

    public static async get(
        ctx: CustomContext,
        id: number
    ): Promise<Ingredient> {
        const result = await (
            await this.repo(ctx)
        ).findOne(id)
        return result
    }

    public static async create(
        ctx: CustomContext<IngredientCreatePayload>,
        payload: Ingredient
    ): Promise<Ingredient> {
        const result = await (
            await this.repo(ctx)
        ).save(payload)
        return result
    }
}
