const express = require('express')
const router = express.Router()

const {
    registerUser,
    getMe,
} = require('../controllers/userController')


router.post('/', registerUser)
router.get('/authenticate/:token', getMe)

module.exports = router