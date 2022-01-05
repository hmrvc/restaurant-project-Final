const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  //轉向登入頁面
  res.render('login')
})

router.post('/login', (req, res) => {
  //取得login頁面資料

})

router.get('/logout', (req, res) => {
  //登出使用者
  res.redirect('login')
})



module.exports = router