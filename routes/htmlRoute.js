const express = require('express')
const router = express.Router()

const {
    getHomePage,
    contactPage
} = require('../controllers/htmlController')

router.get('/', getHomePage)
router.get('/contact',contactPage)

module.exports = router