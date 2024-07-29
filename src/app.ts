import express from 'express';
import connectToDatabase from "./db_connection/db_connect"
import MONGODB_URI from './db_connection/dbConnectUri'
import userRouter from './modules/users/routes/users'
import authRouter from './modules/auth/auth-passport-local/routes/auth'
import JWTAuthRouter from './modules/auth/auth-passport-jwt/routes/jwtAuth'
import productRouter from './modules/products/routes/products'
import session from 'express-session';
import passport from 'passport'
import Router from "express";
import "./middleware/passport/strategies/local-strategy"
import "./middleware/passport/jwtAuthenticated"
import {setVisitedSession} from "./middleware/passport/authenticated";
import MongoStore from "connect-mongo";
const router = Router();


const app = express();
app.use(router)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(session({
    secret: 'secretsessiondev',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 6000 * 60
    },
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
}));


app.use(passport.initialize());

//attach dynamic user property to request object
app.use(passport.session());
app.use(setVisitedSession);


app.use(authRouter);
app.use(JWTAuthRouter)
app.use(userRouter);
app.use(productRouter);

const PORT = process.env.PORT || 8000;


// Function to start the Express server
const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on port=${PORT}`);
        });
    } catch (error) {
        console.error(`Failed to connect to database: ${error}`);
        process.exit(1); // Exit the process with failure code
    }
};

// Start the server
startServer();




