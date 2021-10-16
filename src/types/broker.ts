import {
    Service,
    ServiceBroker,
    ServiceSchema,
} from 'moleculer'
import { Connection } from 'typeorm'

export type CustomServiceBroker = ServiceBroker & {
    dbService: Connection
}

export type MixinSchema = Partial<ServiceSchema> &
    ThisType<Service>
