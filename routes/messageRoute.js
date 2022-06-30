const express = require('express')
const router = express.Router()

const {
    sendMessage
} = require('../controllers/messageController')


router.put('/:handle', sendMessage)

module.exports = router