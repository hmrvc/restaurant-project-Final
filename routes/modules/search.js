const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')


// 搜尋餐廳
router.get('/', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword.toLowerCase().trim()
  
  //加入Id條件只能搜尋自己的餐廳列表
  Restaurant.find({ userId })
  .lean()
  .then(shops => {
    const filtershop = shops.filter(item => item.name.toLowerCase().includes(keyword) || item.category.includes(keyword))
    res.render('index', {shops: filtershop, keyword}) 
  })
  .catch(error => console.log(error))
})


module.exports = router