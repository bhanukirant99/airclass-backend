const express = require('express');
const commentsController = require('../../controllers/comments.controller');

const router = express.Router();

router.get('/:contentID', commentsController.get_all_content_comments);
// router.get('/courseSingle/:contentID', commentsController.get_single_course);
router.post('/create_newComment/:contentID', commentsController.create_newComment);

module.exports = router;