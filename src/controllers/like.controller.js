const { Content } = require('../models');
const { Like } = require('../models')
const mongoose = require('mongoose');
const { User } = require('../models');
const httpStatus = require('http-status');

exports.get_all_likes = async(req, res) => {
    Like.find((err, like) => {
        let message;
        if (like.length >= 0) {
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

// exports.get_content_like = async(req, res) => {
//     const contentID = req.params.contentID;

//     var like = await Like.find({ contentID })
//         .populate('userID')
//         .sort({ timestamp: 'desc' });

//     res.send(like)
// }

exports.like_content = (req, res) => {
    const contentID = req.params.contentID
    const newLike = new Like({
        like: req.body.like_content,
        contentID: contentID,
        userID: req.body.userID,
    })
    newLike.save((err, like) => {
        if (err) console.log(err)
        res.status(httpStatus.CREATED).send(newLike);
    })
}

exports.unlike_content = (req, res) => {
    // const userID = req.params.userID;

    // var Like = await Comment.find({ userID })
    //     .populate('userID')

    // res.send(comments)

    const contentID = req.params.contentID
    const newLike = new Like({
        like: req.body.like_content,
        contentID: contentID,
        userID: req.body.userID,
    })
    newLike.save((err, comment) => {
        if (err) console.log(err)
        res.status(httpStatus.CREATED).send(newLike);
    })
}