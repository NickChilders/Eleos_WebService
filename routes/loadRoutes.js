const express = require('express')
const router = express.Router()

const {
    getLoad,
} = require('../controllers/loadController')

router.get('/', getLoad)

module.exports = router