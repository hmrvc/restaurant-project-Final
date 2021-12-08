const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-project')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connect')
} )

module.exports = db



