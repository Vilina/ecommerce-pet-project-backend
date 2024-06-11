import http from 'http';

import express  from 'express';
import mongoose from "mongoose";
import 'dotenv/config'

const MONGODB_URI = `${process.env.EC_MONGO_CONNECTION_STRING_SCHEME}://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.EC_MONGO_URL}/`;

const app = express();

mongoose.connect(MONGODB_URI)
        .then((result) => {
          console.log("Connected to MongoDB");
          // console.log(result);
          app.listen(8000);
        }).catch(err => {
          console.log(err);
        })


