const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Car = require('./models/car');

//fetch alll cars
router.get("/cars", async (req, res) => {
    try {
        const cars = await Car.find();
        res.send(cars);
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({message: error.message});
    }
});

// Add new car. New car is send inside the request body.
router.post("/cars", async (req, res) => {
    const newCar = new Car({
        brand: req.body.brand,
        model: req.body.model,
        color: req.body.color,
        year: req.body.year
    });
    try {
        await newCar.save();
        res.status(201).json({newCar});
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({message: error.message});
    }
});

//Delete car by id. Id is sent in the request body.
router.delete("/cars/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "Invalid car id format"});
        }

        const response = await Car.deleteOne({_id: id});
        if ( response === 0) {
            return res.status(404).json({message: "car not found"});
        }

        res.status(201).json({message: "Car deleted successfully"});
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({message: error.message});
    }
});

//Edit car by id. Id is sent in the route parameter and updated car inside the request body.
router.put("/cars/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "Invalid car id format"});
        }

        const response = await Car.findByIdAndUpdate({_id: id}, req.body, {new: true});
        if (response === null) {
            return res.status(404).json({message: "Car not found"});
        }

        res.status(200).json({message: 'Car is sucessfulluy updated'});
    } catch (error) {
        console.error(error.stack);
        return res.status(500).json({mesasge: error.message});
    }
});

module.exports = router;