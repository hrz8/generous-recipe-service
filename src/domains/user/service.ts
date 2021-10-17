import { Service, ServiceBroker, Errors } from 'moleculer'
import validators from './validator'
import UserRepository from './repository'
import { UserGetPayload } from './types'
import { CustomContext } from '@/types/broker'
import { Response } from '@/utils/response/response'
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
                    ): Promise<Response> => {
                        const id = ctx.params.params.id
                        const result =
                            await UserRepository.get(
                                ctx,
                                id
                            )
                        if (!result) {
                            throw new Errors.MoleculerError(
                                'user not found',
                                404,
                                'NOT_FOUND',
                                { id }
                            )
                        }
                        return new Response(result)
                    },
                },
            },
        })
    }
}
