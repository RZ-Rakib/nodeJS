const db = require('./dbconfig');

// get all movies
const getAllMovies = (req, res) => {
    db.query('SELECT * FROM movies', (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack);
        } else {
            res.json(result.rows);
        }
    })
}
 // get all movies by id
 const getMovieById = (req, res) => {
    const query = {
        text: 'SELECT * FROM movies WHERE id = $1',
        values: [req.params.id],
    }
    db.query(query, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack);
        } else {
            if (result.rows.length > 0){
                res.json(result.rows);
            } else {
                res.status(404).end();
            }
        }
    })
 }
//Add a new movie
const addMovie = (req, res) => {
    //extract movie from the request body and generate id
    const newMovie = req.body;

    const query = {
        text: 'INSERT INTO movies (title, director, year) VALUES ($1, $2, $3) RETURNING *',
        values: [newMovie.title, newMovie.director, newMovie.year]
    }
    db.query(query, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        res.status(200).json(result.rows[0]);
    })
} 
// Detete a movie by id
const deleteMovie = (req, res) => {
    // define query using parametrized query
    const query = {
        text: 'DELETE FROM movies WHERE id = $1 Returning *',
        values: [req.params.id],
    }
    db.query(query, (err, result) => {
        if (err){
            console.error('Error executing query', err.stack);
            return res.status(500).json({error: 'Internal server error'});
        }
        if (result.rowCount === 0){
            return res.status(404).json({error: 'Movie not found'});
        }

        res.status(204).end(); // 204 no content
    })
}
// Update movie
const updateMovie = (req, res) => {
    // extract edited movie from the request body
    const {title, director, year} = req.body;

    const query = {
        text: 'UPDATE movies SET title=$1, director=$2, year=$3 WHERE id = $4 RETURNING *',
        values: [title, director, year, req.params.id],
    }
    
    db.query(query, (err, result) => {
        if (err){
            console.error('Error executing query', err.stack);
            return res.status(500).json({error: 'Internal server error'});
        }
        if (result.rowCount === 0) {
            return res.status(404).json({error: 'Movie not found'});
        }

        res.status(200).json(result.rows[0]);
    })
};
// Delete all movies
const deleteAllMovies = () => {
  db.query('DELETE FROM movies', (err, res) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
  })
}

 module.exports = {
    getAllMovies: getAllMovies,
    getMovieById: getMovieById,
    addMovie: addMovie,
    deleteMovie: deleteMovie,
    updateMovie: updateMovie,
    deleteAllMovies: deleteAllMovies
 }