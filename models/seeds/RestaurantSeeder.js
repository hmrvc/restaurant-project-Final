const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')


db.once('open', () => {
  Restaurant.create(restaurantList)
  .then(console.log('restsurant loaded completed'))
  .catch(error => console.log(error)) 
})
