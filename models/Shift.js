const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shiftSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true, 
        trim: true
    },
    time: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Time',
        trim: true
    },
    timename: {
        type: String,
        required: true,
        trim: true
    },
    services: {
        type: Array,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Shift', shiftSchema);