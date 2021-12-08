const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

// 新增餐廳
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

// 顯示特定餐廳
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then(shop => res.render('show', {shop}))
  .catch(error => console.log(error))
})

// 修改餐廳
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then((shop) => res.render('edit', {shop}))
  .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndUpdate(id, req.body)
  .then(() => res.redirect(`/restaurants/${id}`))
  .catch(error => console.log(error))
})

//刪除餐廳
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndDelete(id)
  .then(() => res.redirect(`/`))
  .catch(error => console.log(error))
})



module.exports = router