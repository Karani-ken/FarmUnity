const dbHandler = require('../Database/dbHandler')


//create a new post
const createPost = async (req, res) => {
    try {
        const {title, content, user_id} = req.body;        

        //null checking
        if (!title || !content || !user_id) {
            res.status(400).json({ error: "All fields are required!!!" })
        }  
       
        //create a new post object
        const postData = {
            title,
            content,           
            user_id
        }
        await dbHandler.insertPost(postData);
       return res.status(201).json({ message: "post was added successfully!" });
    } catch (error) {
        console.log(`Error in adding a new post : ${error}`);
       return res.status(500).json(error)
    }

}
//get posts 
const getAllPosts = async (req, res) =>{
    try {
        const response = await dbHandler.getAllPosts();
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)   
    }
}

module.exports ={  
    createPost,
    getAllPosts
}