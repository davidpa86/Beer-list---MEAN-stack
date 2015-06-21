var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    alcohol: {
        type: Number,
        min: 1,
        max: 50
    },
    country: {
        type: String,
        required: true
    },
    likes: [Number]
});

module.exports = mongoose.model('Beer', schema);