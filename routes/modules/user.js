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
  failureRedirect: '/user/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  //轉向註冊頁面
  res.render('register')
})

router.post('/register', (req, res) => {
  //取得register頁面資料
  const {name, email, password, confirmPassword} = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({message : '每個欄位都是必填'})
  }

  if (password !== confirmPassword) {
    errors.push({message: '密碼與確認密碼不符'})
  }

  if (errors.length) {
    return res.render('register', {
      name,
      email,
      errors
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({message: 'Email is already registered'})
      return res.render('register', { errors, name, email })
    }
    return User.create({name, email, password})
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
  console.log(errors)
})

router.get('/logout', (req, res) => {
  //登出使用者
  req.logout()
  req.flash('suc_msg', '已經成功登出')
  res.redirect('/user/login')
})



module.exports = router