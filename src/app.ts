import express  from 'express';
import connectToDatabase from "./db_connection/db_connect"

const app = express();

// Connect to the database
connectToDatabase().catch((err: Error) => {
    console.error(`Failed to connect to database: ${err}`);
});


const PORT = process.env.PORT || 8000;

// Start Express server
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});



