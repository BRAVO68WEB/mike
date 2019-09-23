const path = require("path")
const express = require("express")
const app = express()
const passport = require("passport")
const session = require("express-session")
const MemoryStore = require("memorystore")(session)
const Strategy = require("passport-discord").Strategy

module.exports = () => {
  app.use('/public', express.static(path.join(__dirname, 'site', 'public')))

  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((obj, done) => {
    done(null, obj)
  })

  passport.use(new Strategy({
    callbackURL: `${Mike.dashboard.https ? 'https://' : 'http://'}${Mike.dashboard.domain}/callback`,
    scope: ["identify"],
    clientID: Mike.user.id,
    clientSecret: Mike.dashboard.secret
  }, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile))
  }))

  app.use(session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: Mike.dashboard.secret,
    resave: false,
    saveUninitialized: false,
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.locals.domain = Mike.dashboard.domain

  app.engine("html", require("ejs").renderFile)
  app.set("view engine", "ejs")
  app.set('views', path.join(__dirname,'site/templates'))

  const bodyParser = require("body-parser")
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  global.checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    req.session.backURL = req.url
    res.redirect("/login")
  }

  global.renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
        path: req.path,
        user: req.isAuthenticated() ? req.user : null,
    }
    res.render(path.join(__dirname, "site", "templates", template), Object.assign(baseData, data))
  }

  require('./routes/main')(app)
  require('./routes/server')(app)
  require('./routes/sub')(app)
  require('./routes/api')(app)

  app.listen(Mike.dashboard.port)
  Mike.console.info(`Dashboard is ready on port ${Mike.dashboard.port}.`)
}
