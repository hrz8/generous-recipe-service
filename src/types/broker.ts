import {
    Context,
    Service,
    ServiceBroker,
    ServiceSchema,
} from 'moleculer'
import {
    Connection,
    EntityManager,
    QueryRunner,
} from 'typeorm'

export type CustomServiceBroker = ServiceBroker & {
    dbService: Connection
}

export type CustomContext<T = unknown> = Context<T> & {
    broker: CustomServiceBroker
    $dbTrx: EntityManager
    $dbRunner: QueryRunner
}

export type MixinSchema = Partial<ServiceSchema> &
    ThisType<Service>
