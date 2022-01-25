const mongoose = require('mongoose')
const NotesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

const Note = mongoose.model('Category', NotesSchema);
module.exports = Note;