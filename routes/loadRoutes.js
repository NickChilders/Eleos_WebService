const express = require('express')
const router = express.Router()

//Use the load controller
const {
    getLoad,
} = require('../controllers/loadController')

router.get('/', getLoad)

module.exports = router