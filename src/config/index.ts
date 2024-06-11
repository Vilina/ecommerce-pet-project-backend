const dotenv = require('dotenv')
const path = require('path');
const nconf = require('nconf');

// Load environment variables from .env file
dotenv.config();

// Set up nconf to use (in order): command-line arguments, environment variables, config file
nconf.argv().env().file({ file: path.join(__dirname, 'config.json') });


export default nconf;