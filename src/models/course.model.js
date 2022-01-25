const mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
    title: String,
    info: String,
    description: String,
    timestamp: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    contents: {
        type: Array,
        default: []
    },
    instructor: String,
    aboutInstructor: String,
    price: Number,
    imageUrl: String,
    videoUrl: String,
    enrolledUsers: { type: Number, default: 0 },
    watchHours: Number,
});

module.exports = mongoose.model('Course', CourseSchema);