const express = require('express')
const app = express()
const { engine } = require('express-handlebars') 
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
const Restaurant = require('./models/Restaurant')

mongoose.connect('mongodb://localhost/restaurant-project')
const port = 3000

app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connect')
})

// 顯示所有餐廳
app.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .then(shops => res.render('index', {shops}))
  .catch(error => console.log(error))
  
})
// 顯示特定餐廳
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const shop = restaurantList.results.find(item => item.id.toString() === id)
  res.render('show', {shop: shop})
})
// 搜尋餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  const shops = restaurantList.results.filter(item => item.name.toLowerCase().includes(keyword) || item.category.includes(keyword))
  res.render('index', {shops: shops, keyword: keyword})
})

app.listen(port, () => {
  console.log('connect')
})