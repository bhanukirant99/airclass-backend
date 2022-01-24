const mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    comment: String,
    timestamp: { type: Date, default: Date.now },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;