const { Course } = require('../models');
const { Content } = require('../models');
const mongoose = require('mongoose');
const { Note } = require('../models');
const httpStatus = require('http-status');

exports.get_all_content_notes = async(req, res) => {
    const contentID = req.body.contentID;

    var notes = await Note.find({ contentID })
        .populate('userID')
        .sort({ timestamp: 'desc' });

    res.send(notes)
}

exports.create_newNote = (req, res) => {
    const contentID = req.params.contentID
    const newNote = new Note({
        note: req.body.note,
        contentID: contentID,
        // userID: req.body.user_id
    })
    newNote.save((err, like) => {
        if (err) console.log(err)
        res.status(httpStatus.CREATED).send(newNote);
    })

}
exports.delete_note = (req, res) => {
    const noteID = req.params.noteID;
    note.findById(noteID, (err, note) => {
        note.remove();
        res.send("success")
    })
}