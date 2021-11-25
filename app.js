const express = require('express')
const app = express()
const { engine } = require('express-handlebars') 
const restaurantList = require('./restaurant.json')

const port = 3000

app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log('connect')
})