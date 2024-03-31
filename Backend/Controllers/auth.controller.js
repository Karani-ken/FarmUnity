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
       res.status(500).json('internal server error')
        
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
            email: user[0].email
        },
            process.env.JWT_SECRET, {
            expiresIn: "24h",
        })
        res.status(200).json({ token });
        sendEmail(email, "Login update", "There was new login to your account")
    } catch (error) {
       throw error;
       next();
    }
}
const selectUsers = async (req, res) => {
    try {
        const result = await dbHandler.selectUsers();
        if (result.length > 0) {
            res.status(200).json({ result });
        } else {
            res.status(200).json({ message: "no users found" })  
        }
    } catch (error) {
        throw error;
        next();
    }
}

module.exports = {
    register,
    login,
    selectUsers
}