import express from 'express';
import connectToDatabase from './db_connection/db_connect';
import userRouter from './modules/users/routes/users';
import authRouter from './modules/auth/auth-passport-local/routes/auth';
import JWTAuthRouter from './modules/auth/auth-passport-jwt/routes/jwtAuth';
import productRouter from './modules/products/routes/products';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import config from './config';
import cors from 'cors';
import corsOptions from './middleware/cors/corsConfig';
import corsError from './middleware/cors/corsError';
import { setVisitedSession } from './middleware/passport/strategies/local/local-guards';

// Required to import strategies for passport
import './middleware/passport/jwtPassportConfig';
import './middleware/passport/localPassportConfig';

const app = express();

// CORS configuration
app.use(cors(corsOptions));

// Parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session management
app.use(
  session({
    secret: config.session_secret_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60, // 1 hour
    },
    store: MongoStore.create({ mongoUrl: config.mongodb_uri }),
  }),
);

// Initialize passport and session handling
app.use(passport.initialize());
app.use(passport.session());
app.use(setVisitedSession);

// Route handling
app.use('/auth', authRouter);
app.use('/jwt', JWTAuthRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

// Error handling middleware should be at the end
app.use(corsError);

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
