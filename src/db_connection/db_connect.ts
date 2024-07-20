import mongoose from 'mongoose';
import config from '../config/index';

const connectToDatabase = async () => {


    // Construct connection URL
    const MONGODB_URI: string = `${config.mongo_connection_string}://${config.root_username}:${config.root_password}@${config.mongo_host_port}/`

    try {
        let mongooseConnect  =  await mongoose.connect(MONGODB_URI, config.options);
        console.log('Mongo connected');
        // Enable Mongoose debug mode if configured
        if (config.debug) {
            mongoose.set('debug', true);
        }
        return mongooseConnect;
    } catch (err) {
        console.error(`Mongo connect Error => ${err}`);
    }

};

export default connectToDatabase;
