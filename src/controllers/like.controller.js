const { Content } = require('../models');
const { Like } = require('../models')
const mongoose = require('mongoose');
const { User } = require('../models');
const httpStatus = require('http-status');

exports.get_all_likes = async(req, res) => {
    Like.find((err, likes) => {
        let message;
        if (likes.length >= 0) {
            message = "like got"
        } else {
            message = "Sorry! There are no like in this Contents."
        }
        res.send({
            message: message,
            like: like,
        });
    })
}

exports.get_content_like = async(req, res) => {
    const contentID = req.params.contentID;

    var like = await Like.find({ contentID })
        .populate('userID')
        .sort({ timestamp: 'desc' });

    res.send(like)
}

exports.like_content = (req, res) => {
    const contentID = req.params.contentID
    const newComment = new Comment({
        comment: req.body.comment,
        contentID: contentID,
        userID: req.body.userID,
        initialName: req.body.initialName,
        name: req.body.name
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