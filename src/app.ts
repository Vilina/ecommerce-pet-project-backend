import express  from 'express';
import mongoose from "mongoose";
import nconf from './config/index';

const env = nconf.get('NODE_ENV') || 'development';
const dbConfig = nconf.get(`db:${env}`);

const MONGODB_URI: string = `${nconf.get(dbConfig.mongo_connection_string)}://${nconf.get(dbConfig.root_username)}:${nconf.get(dbConfig.root_password)}@${nconf.get(dbConfig.mongo_host_port)}/`

const app = express();

mongoose.connect(MONGODB_URI)
        .then((result) => {
          console.log("Connected to MongoDB");
          app.listen(8000);
        }).catch(err => {
          console.log(err);
        })


