const mongoose = require('mongoose')

const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "Introduction to Competitive Programming"
    },
    timestamp: { type: Date, default: Date.now },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    likes: { type: Number, default: 0 },
    notes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
    videoUrl: {
        type: String,
        default: "https://www.youtube.com/embed/pV6i3PucDMA"
    },
    watchHours: {
        type: String,
        default: "20 min"
    },
});

module.exports = mongoose.model('Content', ContentSchema);