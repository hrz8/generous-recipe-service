import { Repository } from 'typeorm'
import { IngredientCategory } from '@db/entities/IngredientCategory'
import { CustomContext } from '@/types/broker'

export default abstract class IngredientCategoryRepository {
    public static async repo(
        ctx: CustomContext
    ): Promise<Repository<IngredientCategory>> {
        return ctx.broker.dbService.getRepository(
            IngredientCategory
        )
    }

    public static async get(
        ctx: CustomContext,
        id: number
    ): Promise<IngredientCategory> {
        const result = await (
            await this.repo(ctx)
        ).findOne(id)
        return result
    }
}
