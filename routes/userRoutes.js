const express = require('express')
const router = express.Router()

//Utilize the user Controller
const {
    registerUser,
    getAuth
} = require('../controllers/userController')

//This was just for exploratory purposes.
router.post('/', registerUser)

//This is the necessary route for this service. 
router.get('/:token', getAuth)

module.exports = router