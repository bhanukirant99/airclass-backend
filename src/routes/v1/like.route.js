const express = require('express');
const likessController = require('../../controllers/comments.controller');

const router = express.Router();

router.get('/', likessController.get_all_likes);
router.get('/:contentID', likessController.get_content_like);
router.post('/like_content/:contentID', likessController.create_newComment);

module.exports = router;