const express = require('express')
const router = express.Router()

const passport = require('passport')


//使用者點擊facebook登入按鈕路由
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

//facebook回傳資料
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}))

module.exports = router
