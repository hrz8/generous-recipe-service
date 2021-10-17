import { Service, ServiceBroker } from 'moleculer'
import validators from './validator'
import UserRepository from './repository'
import UserError from './error'
import { UserGetPayload } from './types'
import { CustomContext } from '@/types/broker'
import { SuccessResponse } from '@/utils/response/success'
import CommonMixin from '@/mixins/common.mixin'

export default class UserService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        const commonMixin = new CommonMixin().schema
        this.parseServiceSchema({
            name: 'user',
            mixins: [commonMixin],
            actions: {
                get: {
                    cache: true,
                    params: validators.get,
                    handler: async (
                        ctx: CustomContext<UserGetPayload>
                    ): Promise<SuccessResponse> => {
                        const id = ctx.params.params.id
                        const result =
                            await UserRepository.get(
                                ctx,
                                id
                            )
                        if (!result) {
                            throw UserError.notFound(id)
                        }
                        return new SuccessResponse(result)
                    },
                },
            },
        })
    }
}
