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
                    handler: (): {
                        response: string
                    } => this.ActionHello(),
                },
                welcome: {
                    params: validators.welcome,
                    handler: (
                        ctx: Context<{
                            query: { name: string }
                        }> & {
                            broker: CustomServiceBroker
                        }
                    ): { response: string } =>
                        this.ActionWelcome(
                            ctx.params.query.name
                        ),
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
