const express = require('express')
const {createPost,getAllPosts} = require('../Controllers/post.controller')
const router = express.Router();
router.post('/create-post',createPost);
router.get('/all-posts',getAllPosts);

module.exports = router