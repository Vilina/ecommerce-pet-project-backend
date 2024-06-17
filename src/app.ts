import express  from 'express';
import connectToDatabase from "./db_connection/db_connect"
import userRouter from './modules/users/routes/users'
import productRouter from './modules/products/routes/products'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(productRouter);

// Connect to the database
connectToDatabase().catch((err: Error) => {
    console.error(`Failed to connect to database: ${err}`);
});


const PORT = process.env.PORT || 8000;

// Start Express server
app.listen(PORT, () => {
    console.log(`Server is running on port=${PORT}`);
});


