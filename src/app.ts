import express from 'express';
import connectToDatabase from './db_connection/db_connect';
import userRouter from './modules/users/routes/users';
import authRouter from './modules/auth/auth-passport-local/routes/auth';
import JWTAuthRouter from './modules/auth/auth-passport-jwt/routes/jwtAuth';
import productRouter from './modules/products/routes/products';
import session from 'express-session';
import passport from 'passport';
import Router from 'express';
import MongoStore from 'connect-mongo';
import config from './config';
import cors from 'cors';
import corsOptions from './middleware/cors/corsConfig';
import corsError from './middleware/cors/corsError';

import { setVisitedSession } from './middleware/passport/strategies/local/local-guards';
//required to import strategies
import './middleware/passport/jwtPassportConfig';
import './middleware/passport/localPassportConfig';

const app = express();
const router = Router();

app.use(router);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: config.session_secret_key,
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 6000 * 60,
    },
    store: MongoStore.create({ mongoUrl: config.mongodb_uri }),
  }),
);

app.use(passport.initialize());

//attach dynamic user property to request object
app.use(passport.session());
app.use(setVisitedSession);
app.use(corsError);

app.use(authRouter);
app.use(JWTAuthRouter);
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
