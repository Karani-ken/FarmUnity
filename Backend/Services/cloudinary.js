const cloudinary = require('cloudinary').v2
const cloudinaryConfig = require('../Config/cloudinary.Config')
cloudinary.config(cloudinaryConfig)

uploadToCloudinary = async (path, folder) => {
    try {
        const data = await cloudinary.uploader.upload(path, { folder });
        return { url: data.url, public_id: data.public_id };
    } catch (error) {
        console.log(error);
        throw error; // Re-throw error to propagate it to the caller
    }
}

removeFromCloudinary = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        throw error; // Re-throw error to propagate it to the caller
    }
}
module.exports = { uploadToCloudinary, removeFromCloudinary }