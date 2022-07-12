const express = require('express')
const router = express.Router()

const {
    registerUser,
    getAuth
} = require('../controllers/userController')


router.post('/', registerUser)
router.get('/:token', getAuth)

module.exports = router