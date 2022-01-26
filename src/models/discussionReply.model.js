const mongoose = require('mongoose');
var discussionReply = new mongoose.Schema({
    comment: String,
    timestamp: { type: Date, default: Date.now },
    discussionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discussion'
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const DiscussionReply = mongoose.model('comment', discussionReplySchema);
module.exports = DiscussionReply;