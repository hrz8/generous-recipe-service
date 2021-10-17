import { Repository } from 'typeorm'
import { RecipeCategory } from '@db/entities/RecipeCategory'
import { CustomContext } from '@/types/broker'

export default abstract class RecipeCategoryRepository {
    public static async repo(
        ctx: CustomContext
    ): Promise<Repository<RecipeCategory>> {
        return ctx.broker.dbService.getRepository(
            RecipeCategory
        )
    }

    public static async get(
        ctx: CustomContext,
        id: number
    ): Promise<RecipeCategory> {
        const result = await (
            await this.repo(ctx)
        ).findOne(id)
        return result
    }
}
