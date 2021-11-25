const express = require('express')
const app = express()
const { engine } = require('express-handlebars') 
const restaurantList = require('./restaurant.json')

const port = 3000

app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {shops: restaurantList.results})
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const shop = restaurantList.results.find(item => item.id.toString() === id)
  res.render('show', {shop: shop})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const shops = restaurantList.results.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', {shops: shops, keyword: keyword})
})

app.listen(port, () => {
  console.log('connect')
})