const express = require('express')
const mongoose = require('mongoose')
const { engine } = require('express-handlebars') 
const methodOverride = require('method-override')

const Restaurant = require('./models/Restaurant')

const routes = require('./routes')

const app = express()

mongoose.connect('mongodb://localhost/restaurant-project')

const port = 3000

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connect')
})

app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.use(routes)

// 顯示所有餐廳
app.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .then(shops => res.render('index', {shops}))
  .catch(error => console.log(error))
})

// 新增餐廳
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

// 顯示特定餐廳
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then(shop => res.render('show', {shop}))
  .catch(error => console.log(error))
})

// 搜尋餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  Restaurant.find()
  .lean()
  .then(shops => {
    const filtershop = shops.filter(item => item.name.toLowerCase().includes(keyword) || item.category.includes(keyword))
    res.render('index', {shops: filtershop, keyword}) 
  })
  .catch(error => console.log(error))
})

// 修改餐廳
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then((shop) => res.render('edit', {shop}))
  .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndUpdate(id, req.body)
  .then(() => res.redirect(`/restaurants/${id}`))
  .catch(error => console.log(error))
})

//刪除餐廳
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndDelete(id)
  .then(() => res.redirect(`/`))
  .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log('connect')
})