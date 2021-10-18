import dotenv from 'dotenv'

import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'

const ormconfig = (): SqliteConnectionOptions => {
    if (process.env.NODE_ENV !== 'production') {
        dotenv.config()
    }
    // - set connection options
    const options: SqliteConnectionOptions = {
        namingStrategy: new SnakeNamingStrategy(),
        // - dbms
        type: 'sqlite',
        // - connection
        database: './database/db.sqlite',
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
