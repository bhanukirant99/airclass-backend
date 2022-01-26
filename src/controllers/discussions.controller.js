const { content } = require('../models');
const { Discussion } = require('../models')
const mongoose = require('mongoose');
const { User } = require('../models');
const httpStatus = require('http-status');

exports.get_all_discussions = async(req, res) => {
    Content.find((err, contents) => {
        let message;
        if (courses.length >= 0) {
            message = "Contents offered"
        } else {
            message = "Sorry! There are no courses in this Contents."
        }
        res.send({
            message: message,
            discussions: discussions,
        });
    })
}

// exports.get_all_content_discussions = async(req, res) => {
//     const discussionID = req.body.discussionID;

//     var discussions = await Discussion.find({ courseID })
//         .populate('userID')
//         .sort({ timestamp: 'desc' });

//     res.send(discussions)
// }

exports.create_newDiscussion = (req, res) => {
    const userID = req.params.userID;
    const newDiscussion = new Discussion({
        discussionTitle: req.body.discussionTitle,
        discussionInfo: req.body.discussionInfo,
        userID: userID
    })
    newDiscussion.save((err, discussion) => {
        if (err) console.log(err)
        res.status(httpStatus.CREATED).send(newDiscussion);
    })
}

exports.delete_discussion = (req, res) => {
    const discussionID = req.params.discussionID;
    discussion.findById(discussionID, (err, discussion) => {
        discussion.remove();
        res.send("success")
    })
}