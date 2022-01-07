const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const User = require('../user')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const SEED_USER = [
  { 
    email: 'user1@example.com',
    password: '12345678',
    restaurantIndex: [0, 1, 2]
  },
  { 
    email: 'user2@example.com',
    password: '12345678',
    restaurantIndex: [3, 4, 5]
  }
]

db.once('open', () => {
  Promise.all(
    //將SEED_USER轉成陣列
    Array.from(SEED_USER, user => {
      //為每個使用者加密密碼
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => User.create({
          email: user.email,
          password: hash
        }))
        //資料庫生成新使用者
        .then(dataUser => {
          const userId = dataUser._id
          const targetShop = []
          user.restaurantIndex.forEach(index => {
            restaurantList[index].userId = userId
            targetShop.push(restaurantList[index])
          })
          return Restaurant.create(targetShop)
         })
    }))
    .then(() => {
      console.log('seed user loaded done')
      process.exit()
    })
    .catch(err => console.log(err))
  })