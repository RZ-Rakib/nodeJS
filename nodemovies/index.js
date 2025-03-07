const express = require('express');

const app = express();
app.use(express.json()); // middleware library (body-parser)

let movies = [
  {id: '1588323375416', title: 'Star Wars: Episode IX - The Rise of Skywalker', year: 2019, director: 'J.J. Abrams'},
  {id: '1588323390624', title: 'The Irishman', year: 2019, director: 'Martin Scorsese'},
  {id: '1588323412643', title: 'Harry Potter and the Sorcerers Stone', year: 2001, director: 'Chris Columbus'}
];

// Fetch all movies
app.get("/api/movies/", (req, res) => {
    res.json(movies);
})

// Fetch movie by id
app.get("/api/movies/:id", (req, res) => {
    const movieID = req.params.id;

    const movie = movies.filter(movie => movie.id === movieID);
    if(movie.length > 0){
        res.status(200).json(movie); // ✅ 200 OK - return the movie
    }else{
        res.status(404).end(); // ❌ 404 Not Found
    }
})

// Add new movie
app.post("/api/movies", (req, res) => {
    // extract the movie from request body and generate new id
    const newMovie = {'id': Date.now().toString(), ...req.body};

    // Add new movie at the end of the array
    movies = [...movies, newMovie];

    res.json(movies);
})

// Delete a movie by id
app.delete("/api/movies/:id", (req, res) => {
    const deletion_id = req.params.id; // parse id value from the request parameter and save it to constant.

    const filtered_movies = movies.filter(movie => movie.id !== deletion_id);
    if (filtered_movies.length === movies.length) {
        res.status(404).json({message: "No movie found."})
    }
    movies = filtered_movies;
    res.status(204).end();
})
app.put("/api/movies/:id", (req, res) => {
    const updated_id = req.params.id;
    const updated_movie = {"id": updated_id, ...req.body};
    // get the index of updated movie
    const index = movies.findIndex(movie => movie.id === updated_id);
    if (index === -1 ){
        res.status(404).json({message: "Movie not found"})
    }
    // Replace updated movie in the array
    movies.splice(index, 1, updated_movie);
    res.json(updated_movie);
})

const port = 3000;
app.listen(port, () => {
   console.log(`Server is running on port ${port}.`);
});