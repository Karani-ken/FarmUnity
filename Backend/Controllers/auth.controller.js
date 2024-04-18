const bcrypt = require('bcryptjs')
const dbHandler = require('../Database/dbHandler')
const { uploadToCloudinary } = require('../Services/cloudinary');
const jwt = require("jsonwebtoken")
const sendEmail = require('../Middlewares/email.middleware')
const register = async (req, res) => {
    try {
        const { name, email, password, phone,role,county,idNumber } = req.body;
        const idPhoto =  req.file?.path;
        let imageUrl;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await dbHandler.selectUserByEmail(email);
        if(user.length > 0){
           return res.status(400).json({message: " email already exists"});
        }
        if (!idPhoto) {  
            imageUrl= null;
        } else {
            // If idPhoto is provided, upload it to Cloudinary
            const data = await uploadToCloudinary(idPhoto, "test-one");
             imageUrl = data.url; // Assign the uploaded image URL to idPhoto
        }
                //save image url and publicID to the database
      
        //hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            name,
            email,
            password: hashedPassword,
            phone,
            role,   
            county,
            idNumber,
            idPhoto:imageUrl,
            
        }      
        await dbHandler.insertUser(userData);
        sendEmail(email, "Welcome to FarmFiesta", "Thank you for registering with us");
        return res.status(201).json({ message: "User was added successfully" });
       
       
    } catch (error) {
       console.log(error)
       return res.status(500).json('internal server error')
        
    }
}   

const login = async (req, res,next) => {
    try {
        const { email, password } = req.body;
        const user = await dbHandler.selectUserByEmail(email);
        if (user.length === 0) {
            return res.status(401).json({ error: "invalid credentials" });
        }
        const passwordmatch = await bcrypt.compare(password, user[0].password);
        if (!passwordmatch) {
            return res.status(401).json({ error: "invalid credentials" });
        }
        const token = jwt.sign({
            userId: user[0].ID,
            role: user[0].role,
            name: user[0].name,
            email: user[0].email,            
        },
            process.env.JWT_SECRET, {
            expiresIn: "24h",
        })
        return res.status(200).json({ token });
        sendEmail(email, "Login update", "There was new login to your account")
    } catch (error) {
       console.log(error)
       return res.status(500).json(error)
    }
}
const selectUsers = async (req, res) => {
    try {
        const result = await dbHandler.selectUsers();
        if (result.length > 0) {
           return res.status(200).json(result);
        } else {
           return res.status(200).json({ message: "no users found" })  
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}


//update user profile
const updateUser = async (req, res) =>{
    try {
        const {id} = req.params
        const profilePic = req.file?.path
        let imageUrl;
        //check if user account exists
        const user = await dbHandler.selectUserById(id);
        if(user.length === 0){
            return res.status(400).json("account does not exists")
        }
        if (!profilePic) {  
            imageUrl = null;
        } else {
            // If idPhoto is provided, upload it to Cloudinary
            const data = await uploadToCloudinary(profilePic, "test-one");
             imageUrl = data.url; // Assign the uploaded image URL to idPhoto
        }
        
        const updatedUserInfo = {
            name:req.body.name ? req.body.name : user[0].name,
            email:req.body.email? req.body.email : user[0].email,
            phone:req.body.phone ? req.body.phone : user[0].phone,
            county:req.body.county? req.body.county : user[0].county,
            address:req.body.address ? req.body.address : user[0].address,
            profilePic:  profilePic? imageUrl : user[0].profilePic         
        }
        const response = await dbHandler.updateUser(id,updatedUserInfo)
        console.log(response)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getUserById = async (req, res) =>{
    try {
        const {id} = req.params
        const result = await dbHandler.selectUserById(id)
      
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json(error)
    }
}
module.exports = {
    register,
    login,
    selectUsers,
    updateUser,
    getUserById
}