import { Service, ServiceBroker, Context } from 'moleculer'
import validators from './validator'
import { CustomServiceBroker } from '@/types/broker'

export default class GreeterService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name: 'greeter',
            actions: {
                hello: {
                    async handler(): Promise<{
                        response: string
                    }> {
                        return this.ActionHello()
                    },
                },
                welcome: {
                    params: validators.welcome,
                    async handler(
                        ctx: Context<{
                            query: { name: string }
                        }> & {
                            broker: CustomServiceBroker
                        }
                    ): Promise<{ response: string }> {
                        return this.ActionWelcome(
                            ctx.params.query.name
                        )
                    },
                },
            },
        })
    }

    public ActionHello(): {
        response: string
    } {
        return {
            response: 'Hello Moleculer',
        }
    }

    public ActionWelcome(name: string): {
        response: string
    } {
        return {
            response: `Welcome, ${name}`,
        }
    }
}
