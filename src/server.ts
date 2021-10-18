import { ServiceBroker } from 'moleculer'
import dotenv from 'dotenv'

import 'tsconfig-paths/register'

import { createConnection } from 'typeorm'
import { CustomServiceBroker } from '@/types/broker'
import moleculerConfig from '~/moleculer.config'
import typeormConfig from '~/typeorm.config'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const broker = new ServiceBroker({
    ...moleculerConfig,
    created: async (
        brk: CustomServiceBroker
    ): Promise<void> => {
        const connection = await createConnection(
            typeormConfig
        )
        brk.dbService = connection
    },
})

// Load gateway services
broker.loadService('./src/services/restful.service.js')
broker.loadService('./src/services/health.service.js')

// Load domains services
broker.loadServices('./src/domains', '**/service.js')

// Serve sevices
broker.start()
