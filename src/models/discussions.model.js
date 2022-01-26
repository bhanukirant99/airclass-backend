const mongoose = require('mongoose');
var discussionSchema = new mongoose.Schema({
    discussion: String,
    timestamp: { type: Date, default: Date.now },
    contentID: {
        type: Array,
        default: []
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Discussion = mongoose.model('discussion', discussionSchema);
module.exports = Discussion;