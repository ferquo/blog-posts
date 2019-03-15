import { ConnectionOptions } from 'typeorm';
import { ConfigurationService } from './configuration/configuration.service';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { DatabaseService } from './database-service';

export const databaseServiceFactory = async (configManager: ConfigurationService) => {

    const config = configManager.getSettings();

    const options: ConnectionOptions | MongoConnectionOptions = {
        username: config.db.username || null,

        password: config.db.password || null,
        ssl: config.db.ssl || false,
        sslValidate: false,
        replicaSet: config.db.replicaSet,
        type: config.db.type,
        url: config.db.url,
        database: config.db.database,
        reconnectTries: 3000,
        entities: [
            __dirname + '/../models/database/*.js',
        ],
    };

    const databaseService = new DatabaseService(options);
    await databaseService.connect();
    return databaseService;
}