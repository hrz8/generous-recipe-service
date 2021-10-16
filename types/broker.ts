import { ServiceBroker } from 'moleculer'
import { Connection } from 'typeorm'

export type CustomServiceBroker = ServiceBroker & {
    connection: Connection
}

export interface RestfulEndpoint {
    path: string
    aliases: {
        [key: string]: string
    }
}
