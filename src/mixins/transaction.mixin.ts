import { Service, ServiceSchema } from 'moleculer'
import { set as _set, get as _get } from 'lodash'
import { QueryRunner } from 'typeorm'
import { CustomContext, MixinSchema } from '@/types/broker'

export default class TransactionMixin
    implements Partial<ServiceSchema>, ThisType<Service>
{
    public schema: MixinSchema

    public constructor() {
        this.schema = {
            hooks: {
                before: {
                    '*': async (
                        ctx: CustomContext
                    ): Promise<void> => {
                        const queryRunner =
                            ctx.broker.dbService.createQueryRunner()
                        await queryRunner.connect()
                        await queryRunner.startTransaction()
                        _set(ctx, '$dbRunner', queryRunner)
                        _set(
                            ctx,
                            'dbTrx',
                            queryRunner.manager
                        )
                    },
                },
                after: {
                    '*': async (
                        ctx: CustomContext,
                        res: any
                    ): Promise<any> => {
                        const queryRunner: QueryRunner =
                            _get(ctx, '$dbRunner')
                        if (queryRunner) {
                            await queryRunner.commitTransaction()
                            await queryRunner.release()
                        }
                        return res
                    },
                },
                error: {
                    '*': async (
                        ctx: CustomContext,
                        err: Error
                    ): Promise<any> => {
                        const queryRunner: QueryRunner =
                            _get(ctx, '$dbRunner')
                        if (queryRunner) {
                            await queryRunner.rollbackTransaction()
                            await queryRunner.release()
                        }
                        throw err
                    },
                },
            },
        }
    }
}
