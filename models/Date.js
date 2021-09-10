const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = new Schema({
    date: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Date', dateSchema);