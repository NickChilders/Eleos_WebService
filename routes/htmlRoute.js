const express = require('express')
const router = express.Router()

const getHomePage = require('../controllers/htmlController')

router.get('/', getHomePage)

module.exports = router