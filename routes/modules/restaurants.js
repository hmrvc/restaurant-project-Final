const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

// 新增餐廳
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const {name,
  name_en,
  category,
  image,
  location,
  phone,
  google_map,
  rating,
  description} = req.body
  
  return Restaurant.create({name,
  name_en,
  category,
  image,
  location,
  phone,
  google_map,
  rating,
  description,
  userId})
  .then(() => res.redirect("/"))
  .catch(error => console.log(error))
})

// 顯示特定餐廳
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({userId, _id})
  .lean()
  .then(shop => res.render('show', {shop}))
  .catch(error => console.log(error))
})

// 修改餐廳
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({_id, userId})
  .lean()
  .then((shop) => res.render('edit', {shop}))
  .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findByIdAndUpdate(_id, req.body, userId)
  .then(() => res.redirect(`/restaurants/${_id}`))
  .catch(error => console.log(error))
})

//刪除餐廳
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findByIdAndDelete(_id, userId)
  .then(() => res.redirect(`/`))
  .catch(error => console.log(error))
})



module.exports = router