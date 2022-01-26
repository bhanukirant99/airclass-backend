const express = require('express');
const discussionController = require('../../controllers/discussions.controller');

const router = express.Router();

router.get('/', discussionController.get_all_discussions);
// router.post('/create_newDiscussion/:userID', discussionController.create_newContent);
// router.post('/create_newDiscussion/:userID', discussionController.create_newContent);
// router.post('/create_newDiscussion/:userID', discussionController.create_newContent);

module.exports = router;