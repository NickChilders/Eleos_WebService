const express = require('express')
const router = express.Router()

//Use the message controller
const {
    sendMessage
} = require('../controllers/messageController')

router.put('/:handle', sendMessage)

module.exports = router