const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});

const query = require('./db/movies');
const auth = require('./services/authenticate');
const app = express();
app.use(bodyParser.json());

 //load all environment variable from .env

// In the express, you can have multiple callback functions in the route. In this example we have two callback functions. The callback1 function should invoke next() function and therefore we had that in our authenticate function. In our case, the first callback function is the authentication,if that is successful, we continue to the next callback function and return data in the response. ==> app.get(PATH, callback1, callback2);
// Routes for REST API
app.get("/api/movies", auth.authenticate, query.getAllMovies);
app.get("/api/movies/:id", auth.authenticate, query.getMovieById);
app.post("/api/movies", auth.authenticate, query.addMovie);
app.delete("/api/movies/:id", auth.authenticate, query.deleteMovie);
app.put("/api/movies/:id", auth.authenticate, query.updateMovie);
// route for loging
app.post("/login", auth.login);
// server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

module.exports = app;