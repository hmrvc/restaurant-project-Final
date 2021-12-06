const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const restaurantList = require('../../restaurant.json').results

mongoose.connect('mongodb://localhost:/restaurant-project')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  Restaurant.create(restaurantList)
  .then(console.log('restsurant loaded completed'))
  .catch(error => console.log(error))
  
})
