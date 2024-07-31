import mongoose from 'mongoose';
import nconf from '../config/index';
import MONGODB_URI from './dbConnectUri';

const connectToDatabase = async () => {
  // Get environment from configuration, default to 'development'
  const env = nconf.get('NODE_ENV') || 'development';
  const db = nconf.get('db');
  const dbEnvConfig = db[env];

  try {
    const mongooseConnect = await mongoose.connect(
      MONGODB_URI,
      dbEnvConfig.options,
    );
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
