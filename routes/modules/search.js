const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

// 搜尋餐廳
router.get('/', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  Restaurant.find()
  .lean()
  .then(shops => {
    const filtershop = shops.filter(item => item.name.toLowerCase().includes(keyword) || item.category.includes(keyword))
    res.render('index', {shops: filtershop, keyword}) 
  })
  .catch(error => console.log(error))
})


module.exports = router