const express = require('express')
const {createRating} = require("../Controllers/rating.controller")
const router = express.Router();

router.post("/rate",createRating)

module.exports = router