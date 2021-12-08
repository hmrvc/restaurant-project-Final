const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

// 顯示所有餐廳
router.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .then(shops => res.render('index', {shops}))
  .catch(error => console.log(error))
})

module.exports = router