import mongoose from 'mongoose';
import nconf from '../config/index';

const connectToDatabase = async () => {
    // Get environment from configuration, default to 'development'
    const env = nconf.get('NODE_ENV') || 'development';
    const db = nconf.get(`db`);
    const dbEnvConfig = db[env]

    // Construct connection URL
    const MONGODB_URI: string = `${nconf.get(dbEnvConfig.mongo_connection_string)}://${nconf.get(dbEnvConfig.root_username)}:${nconf.get(dbEnvConfig.root_password)}@${nconf.get(dbEnvConfig.mongo_host_port)}/`

    try {
        let mongooseConnect  =  await mongoose.connect(MONGODB_URI, dbEnvConfig.options);
        console.log('Mongo connected');
        // Enable Mongoose debug mode if configured
        if (dbEnvConfig.debug) {
            mongoose.set('debug', true);
        }
        return mongooseConnect;
    } catch (err) {
        console.error(`Mongo connect Error => ${err}`);
    }

};

export default connectToDatabase;
