const express = require('express')
const router = express.Router()

const getHomePage = require('../controllers/htmlController')

//Base URL page. Not neccessary but, I like it.
router.get('/', getHomePage)

module.exports = router