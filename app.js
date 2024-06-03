const http = require('http');

const express = require('express');
const mongoose = require("mongoose");

const MONGODB_URI = 'mongodb+srv://ecommerceadmin:yFs4DRBhiUFJtW1k@cluster0.dajd3ob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = express();


mongoose.connect(MONGODB_URI)
        .then((result) => {
          console.log("Connected to MongoDB");
          console.log(result);
          app.listen(8000);
        }).catch(err => {
          console.log(err);
        })


