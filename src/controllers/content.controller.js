const { Course } = require('../models');
const { Content } = require('../models');
const mongoose = require('mongoose');
const { User } = require('../models');
const httpStatus = require('http-status');

exports.get_all_contents = async(req, res) => {
    Content.find((err, contents) => {
        let message;
        if (contents.length >= 0) {
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

exports.get_all_course_contents = async(req, res) => {
    // const _id = req.params.id
    // try {
    //     // const task = await Task.findById(_id)
    //     const task = await Task.findOne({ _id, user: req.user._id })
    //     if (!task) {
    //         res.status(404).send()
    //     }
    //     res.send(task)
    // } catch (e) {
    //     res.status(500).send(e)
    // }

    const courseID = req.params.courseID;
    console.log(courseID)

    var contents = await Content.find({ courseID })
        .populate('courseID')
        .sort({ timestamp: 'desc' });

    res.send(contents)
}

exports.create_newContent = (req, res) => {
    newContent = new Content({
        title: req.body.title,
        courseID: req.body.courseID,
        videoUrl: req.body.videoUrl,
        watchHours: req.body.watchHours,
    })
    console.log(newContent)
    newContent.save((err, content) => {
        if (err) console.log(err)
        res.status(httpStatus.CREATED).send(newContent);
    })
}

exports.delete_content = (req, res) => {
    const contentID = req.params.contentID;
    Content.findById(contentID, (err, content) => {
        content.remove();
        res.send("success")
    })
}