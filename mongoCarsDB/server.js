const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');


// operate
const app = express();
app.use(express.json());
app.use('/', routes);

// Mongodb connection
dotenv.config({path: './.env'});
const mongoURL = process.env.MONGO_URI;

const connectToDb = async () => {
    try {
        await mongoose.connect(mongoURL, {
            dbName: 'cardb',
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Successfully connected to the mongoDB");
    } catch (error) {
        console.error("Mongodb connection error", error.stack);
        process.exit(1);
    }
};
connectToDb();


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});