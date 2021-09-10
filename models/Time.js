const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSchema = new Schema({
    time: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Time', timeSchema);