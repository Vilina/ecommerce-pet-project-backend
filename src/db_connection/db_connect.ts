import mongoose from 'mongoose';
import nconf from '../config/index';

const connectToDatabase = async () => {
    // Get environment from configuration, default to 'development'
    const env = nconf.get('NODE_ENV') || 'development';
    const dbConfig = nconf.get(`db:${env}`);
    console.log(env, "${env}");
    console.log(dbConfig, "dbConfig");

    // Construct connection URL
    const MONGODB_URI: string = `${nconf.get(dbConfig.mongo_connection_string)}://${nconf.get(dbConfig.root_username)}:${nconf.get(dbConfig.root_password)}@${nconf.get(dbConfig.mongo_host_port)}/`
    console.log(MONGODB_URI, "MongoDB");

    try {
        await mongoose.connect(MONGODB_URI, dbConfig.options);
        console.log('Mongo connected');
        // Enable Mongoose debug mode if configured
        if (dbConfig.debug) {
            mongoose.set('debug', true);
        }
    } catch (err) {
        console.error(`Mongo connect Error => ${err}`);
    }
};

export default connectToDatabase;
