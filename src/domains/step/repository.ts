import { get as _get } from 'lodash'
import { FindManyOptions, Repository } from 'typeorm'
import { Step } from '@db/entities/Step'
import { StepCreatePayload } from './types'
import { CustomContext } from '@/types/broker'

export default abstract class RecipeRepository {
    public static async repo(
        ctx: CustomContext
    ): Promise<Repository<Step>> {
        if (_get(ctx, '$dbTrx')) {
            return ctx.$dbTrx.getRepository(Step)
        }
        return ctx.broker.dbService.getRepository(Step)
    }

    public static async getAll(
        ctx: CustomContext,
        payload: FindManyOptions<Step>
    ): Promise<[Step[], number]> {
        const listPayload = _get(ctx, 'listPayload', {})
        return await (
            await this.repo(ctx)
        ).findAndCount({
            ...listPayload,
            ...payload,
        })
    }

    public static async create(
        ctx: CustomContext<StepCreatePayload>,
        payload: Step
    ): Promise<Step> {
        const result = await (
            await this.repo(ctx)
        ).save(payload)
        return result
    }

    public static async update(
        ctx: CustomContext<StepCreatePayload>,
        id: number,
        payload: Step
    ): Promise<Step> {
        const result = await (
            await this.repo(ctx)
        ).save({ ...payload, id })
        return result
    }
}
