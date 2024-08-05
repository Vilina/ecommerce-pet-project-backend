import mongoose from 'mongoose';
import config from '../config/index';

const connectToDatabase = async () => {
  try {
    const mongooseConnect = await mongoose.connect(
      config.mongodb_uri,
      config.options,
    );
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
