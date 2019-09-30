const passport = require("passport")
const url = require("url")
module.exports = app => {
  
  app.get("/login", (req, res, next) => {
    
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL
    } else if (req.headers.referer) {

      const parsed = url.parse(req.headers.referer)
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path
      }

    } else {
      req.session.backURL = "/"
    }

    next()
    }, passport.authenticate("discord")
  )

  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/autherror" }), async (req, res) => {
    
    if (Mike.roles.developers.includes(req.user.id)) {
      req.session.isAdmin = true
    } else {
      req.session.isAdmin = false
    }
    if (req.session.backURL) {
      const url = req.session.backURL
      req.session.backURL = null
      res.redirect(url)
    } else {
        res.redirect("/")
    }
  })

  app.get("/logout", function(req, res) {

    req.session.destroy(() => {
      req.logout()
      res.redirect("/")
    })

  })

  app.get("/", async (req, res) => {

    renderTemplate(res, req, 'main/index.html', {})
    
  })

}
