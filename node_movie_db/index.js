const express = require('express');
const bodyParser = require('body-parser');
const query = require('./db/movies.js');

const app = express();
app.use(bodyParser.json());

// Operate
app.get("/api/movies", query.getAllMovies);
app.get("/api/movies/:id", query.getMovieById);
app.post("/api/movies", query.addMovie);
app.delete("/api/movies/:id", query.deleteMovie);
app.put("/api/movies/:id", query.updateMovie);

// server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});