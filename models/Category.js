const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    enabled: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Category', categoriesSchema);