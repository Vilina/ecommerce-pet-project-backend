import express from 'express';
import connectToDatabase from "./db_connection/db_connect"
import userRouter from './modules/users/routes/users'
import authRouter from './modules/auth/routes/auth'
import session from 'express-session';
import passport from 'passport'
import Router from "express";
import "./middleware/passport/strategies/local-strategy"
import {setVisitedSession} from "./middleware/passport/authenticated";
const router = Router();


const app = express();
app.use(router)
app.use(express.json());


app.use(session({
    secret: 'secretsessiondev',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 6000 * 60
    }
}));



app.use(passport.initialize());

//attach dynamic user property to request object
app.use(passport.session());
app.use(setVisitedSession);


app.use(userRouter);
app.use(authRouter);

const PORT = process.env.PORT || 8000;


// Function to start the Express server
const startServer = async () => {
    try {
        console.log('aaaa')
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




