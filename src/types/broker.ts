import {
    Context,
    Service,
    ServiceBroker,
    ServiceSchema,
} from 'moleculer'
import { Connection } from 'typeorm'

export type CustomServiceBroker = ServiceBroker & {
    dbService: Connection
}

export type CustomContext<T = unknown> = Context<T> & {
    broker: CustomServiceBroker
}

export type MixinSchema = Partial<ServiceSchema> &
    ThisType<Service>
