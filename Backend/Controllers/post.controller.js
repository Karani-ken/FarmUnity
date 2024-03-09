const dbHandler = require('../Database/dbHandler')
const { uploadToCloudinary } = require('../Services/cloudinary');

//create a new post
const createPost = async (req, res) => {
    try {
        const {title, content, user_id} = req.body;
        const imagePath = req.file.path;

        //null checking
        if (!title || !content || !user_id) {
            res.status(400).json({ error: "All fields are required!!!" })
        }
        //upload image to cloudinary
        const data = await uploadToCloudinary(imagePath, "test-one")
        //save image url and publicID to the database
        const imageUrl = data.url;
        //create a new post object
        const postData = {
            title,
            content,
            image: imageUrl,
            user_id
        }
        await dbHandler.insertPost(postData);
        res.status(201).json({ message: "post was added successfully!" });
    } catch (error) {
        console.log(`Error in adding a new post : ${error}`);
        res.status(500).json({ error: 'Internal Server Error' })
    }

}

module.exports ={  
    createPost
}