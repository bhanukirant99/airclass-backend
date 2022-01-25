const mongoose = require('mongoose')

const ContentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        default: "Introduction to Competitive Programming"
    },
    timestamp: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    notes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
    videoUrl: String,
    watchHours: {
        type: String,
        default: "20 min"
    },
});

const Content = mongoose.model('Content', ContentSchema);
module.exports = Content;