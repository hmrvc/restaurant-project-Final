const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({usernameField: 'email', passReqToCallback: true}, (req, email, password, done) => {
    User.findOne({email}).then(user => {
      if (!user) {
        return done(null, false, req.flash('warn_msg', 'Email is not exist'))
      }
      if (password !== user.password) {
        return done(null, false, req.flash('warn_msg', 'Password is not correct'))
      }
      return done(null, user)
    })
    .catch(err => done(err, false))
  }))
  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
    .lean()
    .then(user => done(null, user))
    .catch(err => done(err, null))
  })
}
