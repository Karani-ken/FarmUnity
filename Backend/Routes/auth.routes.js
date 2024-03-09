const express = require('express')
const {register,login,selectUsers} = require('../Controllers/auth.controller')
const {protect} = require('../Middlewares/auth.middleware')
const router = express.Router();

router.post('/register', register);
router.post('/login', login)
router.get('/get-users', selectUsers)

module.exports = router    
