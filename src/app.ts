import express  from 'express';
import connectToDatabase from "./db_connection/db_connect"
import userRouter from './modules/users/routes/users'

const app = express();
app.use(express.json());
app.use(userRouter);
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




