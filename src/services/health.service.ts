import { Service, ServiceBroker } from 'moleculer'
import { CustomContext } from '../types/broker'
import { SuccessResponse } from '../utils/response/success'

export default class HealthCheckService extends Service {
    public constructor(broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name: 'health-check',
            actions: {
                check: {
                    handler: async (ctx: CustomContext) =>
                        new SuccessResponse(
                            await ctx.broker.dbService.query(
                                'select 1+0 as result'
                            )
                        ),
                },
            },
        })
    }
}
