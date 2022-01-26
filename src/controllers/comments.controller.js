const { content } = require('../models');
const { Comment } = require('../models')
const mongoose = require('mongoose');
const { User } = require('../models');
const httpStatus = require('http-status');


exports.get_all_content_comments = async(req, res) => {
    const contentID = req.body.contentID;

    var comments = await Comment.find({ courseID })
        .populate('userID')
        .sort({ timestamp: 'desc' });

    res.send(comments)
}

exports.create_newComment = (req, res) => {
    const contentID = req.params.contentID
    const newComment = new Comment({
        comment: req.body.comment,
        contentID: contentID,
        userID: req.body.userID
    })
    newComment.save((err, comment) => {
        if (err) console.log(err)
        res.status(httpStatus.CREATED).send(newComment);
    })
}

exports.delete_comment = (req, res) => {
    const commentID = req.params.commentID;
    Comment.findById(commentID, (err, comment) => {
        comment.remove();
        res.send("success")
    })
}