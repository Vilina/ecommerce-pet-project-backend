import mongoose from 'mongoose';
import nconf from '../config/index';

// Set Mongoose Promise to global Promise
mongoose.Promise = global.Promise;

const connectToDatabase = async () => {
    // Get environment from configuration, default to 'development'
    const env = nconf.get('NODE_ENV') || 'development';
    const config = nconf.get(`db:${env}`); // get environment configs from config.json

    // Set dbName in nconf
    nconf.set('dbName', config.database);

    // Construct connection URL
    let connect: string;
    if (config.use_env_variable) {
        connect = nconf.get(config.use_env_variable);
    } else {
        console.log('CONNECTED');
        connect = `mongodb://${config.host}:${config.port}/${config.database}`;
    }

    try {
        await mongoose.connect(connect, config.options);
        console.log('Mongo connected');
        // Enable Mongoose debug mode if configured
        if (config.debug) {
            mongoose.set('debug', true);
        }
    } catch (err) {
        console.error(`Mongo connect Error => ${err}`);
    }
};

export default connectToDatabase;
