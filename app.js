const express = require('express')
const session = require('express-session')
const { engine } = require('express-handlebars') 
const methodOverride = require('method-override')
const flash = require('connect-flash')

const routes = require('./routes')
require('./config/mongoose')

const UsePassport = require('./config/passport')

const app = express()

const port = 3000

app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(session({
  secret: 'TTT',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

UsePassport(app)
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.suc_msg = req.flash('suc_msg')
  res.locals.warn_msg = req.flash('warn_msg')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log('connect')
})