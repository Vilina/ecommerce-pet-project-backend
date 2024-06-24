import express, {Express} from 'express';
import connectToDatabase from "./db_connection/db_connect"
import routes from "./routes";
import bodyParser from 'body-parser';

const app :Express = express();
app.use(bodyParser.json());

app.use("/", routes);
const PORT: string | number = process.env.PORT || 8000;


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

export default app;




