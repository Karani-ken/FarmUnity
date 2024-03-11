const express = require('express')
const {register,login,selectUsers} = require('../Controllers/auth.controller')
const {protect} = require('../Middlewares/auth.middleware')
const upload = require('../Middlewares/uploads.middleware');
const router = express.Router();

router.post('/register',upload.single("idPhoto"), register);
router.post('/login', login)
router.get('/get-users', selectUsers)

module.exports = router    
