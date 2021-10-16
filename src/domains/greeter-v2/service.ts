import { Service, ServiceBroker, Context } from 'moleculer'
import validators from './validator'
import { CustomServiceBroker } from '@/types/broker'

export default class GreeterV2Service extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name: 'greeter',
            version: 2,
            actions: {
                hello: {
                    async handler(): Promise<string> {
                        return this.ActionHello()
                    },
                },
                welcome: {
                    params: validators.welcome,
                    async handler(
                        ctx: Context<{
                            name: string
                            broker: CustomServiceBroker
                        }>
                    ): Promise<string> {
                        return this.ActionWelcome(
                            ctx.params.name
                        )
                    },
                },
            },
        })
    }

    public ActionHello(): string {
        return 'Hello Moleculer v2'
    }

    public ActionWelcome(name: string): string {
        return `Welcome, ${name} v2`
    }
}
