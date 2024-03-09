const express = require('express')
const {createPost} = require('../Controllers/post.controller')
const router = express.Router();
const upload = require('../Middlewares/uploads.middleware');
const {protect} = require('../Middlewares/auth.middleware')
router.post('/create-post',protect,upload.single("image"),createPost);

module.exports = router