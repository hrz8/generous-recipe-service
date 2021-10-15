import env from 'env-var'
import dotenv from 'dotenv'

import { ConnectionOptions } from 'typeorm'

const ormconfig = (): ConnectionOptions => {
    dotenv.config()
    // - set connection options
    const options: ConnectionOptions = {
        // - dbms
        type: 'sqlite',
        // - connection
        database: env.get('DB_PATH').required().asString(),
        // - file-ing
        entities: [`${__dirname}/database/entities/*.js`],
        migrations: [`${__dirname}/database/migrations/*.js`],
        // - typeorm cli
        cli: {
            entitiesDir: `${__dirname}/database/entities`,
            migrationsDir: `${__dirname}/database/migrations`,
        },
    }
    return options
}

export default ormconfig()
