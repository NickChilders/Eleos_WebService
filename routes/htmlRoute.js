const express = require('express')
const router = express.Router()

const home = require('../controllers/htmlController')

router.get('/', home)

module.exports = router