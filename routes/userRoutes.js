const express = require('express')
const router = express.Router()

const {
    registerUser,
    getMe
} = require('../controllers/userController')


router.post('/', registerUser)
router.get('/:token', getMe)

module.exports = router
