import { Repository } from 'typeorm'
import { User } from '@db/entities/User'
import { CustomContext } from '@/types/broker'

export default abstract class UserRepository {
    public static async repo(
        ctx: CustomContext
    ): Promise<Repository<User>> {
        return ctx.broker.dbService.getRepository(User)
    }

    public static async get(
        ctx: CustomContext,
        id: number
    ): Promise<User> {
        const result = await (
            await this.repo(ctx)
        ).findOne(id)
        return result
    }
}
