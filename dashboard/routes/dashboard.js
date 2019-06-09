const passport = require("passport")

module.exports = app => {
  app.get('/dashboard', checkAuth, (req, res) => {
    renderTemplate(res, req, 'dashboard/main.ejs')
  })

  app.get('/dashboard/:id', checkAuth, async (req, res) => {
    const server = Mike.guilds.get(req.params.id)
    if(!server) return res.redirect('/dashboard')
    const perms = server.member(req.user.id) ? server.member(req.user.id).hasPermission("MANAGE_GUILD") : false;
    if(!perms && !req.session.isAdmin) res.redirect('/dashboard');
    renderTemplate(res, req, 'dashboard/server.ejs',
      {
        server: await Mike.db.getGuild(req.params.id)
      }
    )
  })

  app.get('/dashboard/:id/plugins/:plugin', checkAuth, async (req, res) => {
    const plugin = Mike.plugins.find(plugin => plugin.id.includes(req.params.plugin))
    if(!plugin) return res.redirect('/dashboard')
    const server = Mike.guilds.get(req.params.id)
    if(!server) return res.redirect('/dashboard')
    const perms = server.member(req.user.id) ? server.member(req.user.id).hasPermission("MANAGE_GUILD") : false;
    if(!perms && !req.session.isAdmin) res.redirect('/dashboard');
    renderTemplate(res, req, `dashboard/plugin.ejs`,
      {
        server: await Mike.db.getGuild(req.params.id),
        plugin: req.params.plugin
      }
    )
  })
}
