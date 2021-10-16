import env from 'env-var'
import dotenv from 'dotenv'

import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'

const ormconfig = (): SqliteConnectionOptions => {
    dotenv.config()
    // - set connection options
    const options: SqliteConnectionOptions = {
        namingStrategy: new SnakeNamingStrategy(),
        // - dbms
        type: 'sqlite',
        // - connection
        database: env.get('DB_PATH').required().asString(),
        // - file-ing
        entities: [`${__dirname}/database/entities/*.js`],
        migrations: [
            `${__dirname}/database/migrations/*.js`,
        ],
        // - typeorm cli
        cli: {
            entitiesDir: `${__dirname}/database/entities`,
            migrationsDir: `${__dirname}/database/migrations`,
        },
    }
    return options
}

export default ormconfig()
