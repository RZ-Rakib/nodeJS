const express = require('express');
const router = express.Router();
const Movie = require('./models/movie');
const mongoose = require('mongoose');

//Fetch all movies
router.get("/movies", async (req, res) => {
    try {
        const movie = await Movie.find();
        res.send(movie);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
});
// add movie
router.post("/movies", async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year
    });
    try {
        const newMovie = await movie.save();
        res.status(201).json({newMovie});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
});
//delete movie by title
router.delete("/movies/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "Invalied movie id format"});
        }

        const response = await Movie.deleteOne({_id: req.params.id});

        if (response.deletedCount === 0) {
        return res.status(404).json({message: "Movie not found"});
        }

        return res.status(200).json({message: "Movie deleted"})
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
});
//Update movie by id
router.put("/movies/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "Invalid movie id format"});
        }

        const response = await Movie.findByIdAndUpdate({_id: id}, req.body, {new: true});

        if (response === null) {
        return res.status(404).json({message: "Movie not found"})
        }

        return res.status(200).json({message: "Movie updated"});
    } catch (err) {
        console.error(err.stack);
        return res.status(500).json({message: err.message})
    }
});

module.exports = router;