const dotenv = require('dotenv')
const path = require('path');
const nconf = require('nconf');

// Load environment variables from .env file
dotenv.config();

// Set up nconf to use (in order): command-line arguments, environment variables, config file
nconf.argv().env().file({ file: path.join(__dirname, 'config.json') });

const env = nconf.get('NODE_ENV') || 'development';
const db = nconf.get(`db`);
const dbEnvConfig = db[env];

const config = {
    env: env,
    database: dbEnvConfig.database,
    root_username: nconf.get(dbEnvConfig.root_username),
    root_password: nconf.get(dbEnvConfig.root_password),
    me_basic_auth_username: nconf.get(dbEnvConfig.me_basic_auth_username),
    me_basic_auth_password: nconf.get(dbEnvConfig.me_basic_auth_password),
    mongo_host_port: nconf.get(dbEnvConfig.mongo_host_port),
    mongo_connection_string: nconf.get(dbEnvConfig.mongo_connection_string),
    use_env_variable: dbEnvConfig.use_env_variable,
    options: dbEnvConfig.options,
    debug: dbEnvConfig.debug,
    aws: {
        aws_access_key_id: nconf.get(dbEnvConfig.aws.aws_access_key_id),
        aws_secret_access_key: nconf.get(dbEnvConfig.aws.aws_secret_access_key),
        aws_region: nconf.get(dbEnvConfig.aws.aws_region),
        aws_bucket_name: nconf.get(dbEnvConfig.aws.aws_bucket_name),
    },
};
export default config;
