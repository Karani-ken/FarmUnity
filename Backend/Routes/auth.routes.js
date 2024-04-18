const express = require('express')
const {register,login,selectUsers,updateUser,getUserById} = require('../Controllers/auth.controller')
const {protect} = require('../Middlewares/auth.middleware')
const upload = require('../Middlewares/uploads.middleware');
const router = express.Router();

router.post('/register',upload.single("idPhoto"), register);
router.post('/login', login)
router.get('/get-users', selectUsers)
router.put('/update-profile/:id',upload.single("profilePic"),updateUser)
router.get('/profile/:id',getUserById)
  
module.exports = router    
   