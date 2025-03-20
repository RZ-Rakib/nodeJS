const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use("/", routes);


//MongoDB connection
dotenv.config({path: "./.env"});
const mongoURL = process.env.MONGO_URI;

const connectTodb = async () => {
  try {
    await mongoose.connect(mongoURL, {
      dbName: 'cardb',
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Mongodb connected successfully.");
  } catch (err) {
    console.error("MOngodb connection error", err);
    process.exit(1);
  }
}
connectTodb();

mongoose.connection.on('error', (err) => {
  console.error("MongoDB connectioin error",err);
});

mongoose.connection.once('open', () => {
  console.log("MongoDB connection established");
});

// dotenv.config({path: './.env'});
// const mongoURL = process.env.MONGO_URI;
// mongoose.connect(mongoURL, { dbName: 'moviedb', useNewUrlParser: true , useUnifiedTopology: true});
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error'));


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});