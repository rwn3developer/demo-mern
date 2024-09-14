const mongoose = require('mongoose');

const sliderSchema = mongoose.Schema({
    slider: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }
})

const slider = mongoose.model('slider', sliderSchema);

module.exports = slider;