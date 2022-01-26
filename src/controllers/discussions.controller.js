const { content } = require('../models');
const { discussion } = require('../models')
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
            contents: contents,
        });
    })
}

exports.get_all_content_discussions = async(req, res) => {
    const discussionID = req.body.discussionID;

    var discussions = await discussion.find({ courseID })
        .populate('userID')
        .sort({ timestamp: 'desc' });

    res.send(discussions)
}

exports.create_newdiscussion = (req, res) => {
    const contentID = req.params.contentID
    const newdiscussion = new discussion({
        discussion: req.body.discussion,
        contentID: contentID,
        userID: req.body.userID
    })
    newdiscussion.save((err, discussion) => {
        if (err) console.log(err)
        res.status(httpStatus.CREATED).send(newdiscussion);
    })
}

exports.delete_discussion = (req, res) => {
    const discussionID = req.params.discussionID;
    discussion.findById(discussionID, (err, discussion) => {
        discussion.remove();
        res.send("success")
    })
}