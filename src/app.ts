import express, { Application } from 'express';
import connectToDatabase from '../src/db_connection/db_connect'
import routers from './routes';

// Create Express application
const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware for routing
app.use(routers);

// Connect to the database
connectToDatabase().catch((err) => {
    console.error(`Failed to connect to database: ${err}`);
});

// Define port number, defaulting to 8000 if not provided in environment
const PORT = process.env.PORT || 8000;

// Start Express server
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});

