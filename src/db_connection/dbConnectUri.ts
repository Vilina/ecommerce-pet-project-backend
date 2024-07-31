// Get environment from configuration, default to 'development'
import nconf from '../config';

const env = nconf.get('NODE_ENV') || 'development';
const db = nconf.get('db');
const dbEnvConfig = db[env];
const MONGODB_URI: string = `${nconf.get(dbEnvConfig.mongo_connection_string)}://${nconf.get(dbEnvConfig.root_username)}:${nconf.get(dbEnvConfig.root_password)}@${nconf.get(dbEnvConfig.mongo_host_port)}/`;
export default MONGODB_URI;
