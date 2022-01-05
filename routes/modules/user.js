const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  //轉向登入頁面
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}))

router.get('/register', (req, res) => {
  //轉向註冊頁面
  res.render('register')
})

router.post('/register', (req, res) => {
  //取得register頁面資料
  const {name, email, password, confirmPassword} = req.body
  User.findOne({email}).then(user => {
    if (user) {
      console.log('Email is already registered')
      res.render('register', {name, email})
    } else {
      return User.create({name, email, password})
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    }


  })

})

router.get('/logout', (req, res) => {
  //登出使用者
  req.logout()
  res.redirect('/user/login')
})



module.exports = router