const passport = require("passport")

module.exports = app => {
  app.post('/api/:id/:plugin/:type', checkAuth, async (req, res) => {
    const plugin = Mike.plugins.find(plugin => plugin.id.includes(req.params.plugin))
    if(!plugin) return res.redirect('/dashboard')
    const server = Mike.guilds.get(req.params.id)
    if(!server) return res.redirect('/dashboard')
    const perms = server.member(req.user.id) ? server.member(req.user.id).hasPermission("MANAGE_GUILD") : false;
    if(!perms && !req.session.isAdmin) res.redirect('/dashboard');

    if (req.params.plugin == 'snipes') {
      if (req.params.type == 'switch-default') {
        let guild = await Mike.db.getGuild(req.params.id)
        guild.settings['snipes'] = req.body.value == "true" ? true : false
        await Mike.db.update('guilds', req.params.id, "settings", guild.settings)
        await Mike.db.getGuild(req.params.id)
      }
    }

  })
}
