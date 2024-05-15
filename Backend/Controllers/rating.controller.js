const dbHandler = require('../Database/dbHandler')

const createRating = async (req, res) => {
    try {
        const { rating, user_id } = req.body;
        if (!rating || !user_id) {
            return res.status(400).json("All details are required!!")
        }
        const ratingData = {
            rating,
            user_id
        }
        await dbHandler.insertRating(ratingData)
        return res.status(200).json("Rating was successfull")
    } catch (error) {
        console.error(error)
        return res.status(400).json(error)
    }
}
module.exports = {
    createRating
} 