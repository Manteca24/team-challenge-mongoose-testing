const express = require('express');
const router = express.Router();
const PostController = require("../controllers/Post.controller")

router.post('/create', PostController.create);
router.get('/', PostController.getAll);
router.get('/id/:_id', PostController.getbyID);
router.get('/title', PostController.getbyTitle);
router.put('/id/:_id', PostController.update);
router.delete('/id/:_id', PostController.deletePost);
router.get('/postsWithPagination', PostController.pagination)

module.exports = router;