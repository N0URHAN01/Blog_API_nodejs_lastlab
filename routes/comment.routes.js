const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middleware/auth'); 


router.get('/posts/:postId/comments', commentController.getAllComments);
router.get('/comments/:id', commentController.getCommentById);


router.post('/posts/:postId/comments', authMiddleware, commentController.createComment);
router.patch('/comments/:id', authMiddleware, commentController.updateComment);
router.delete('/comments/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
