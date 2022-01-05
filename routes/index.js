const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const user = require('./modules/user')

router.use('/user', user)
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/', home)


module.exports = router