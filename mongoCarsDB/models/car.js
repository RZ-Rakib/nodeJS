const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
    brand: {type: String, required: true, maxlength: 200},
    model: {type: String, required: true, maxlength: 200},
    color: {type: String, required: true, maxlength: 100},
    year: {type: String, required: true}
});

module.exports = mongoose.model('Car', carSchema);