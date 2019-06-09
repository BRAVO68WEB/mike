const passport = require("passport")

module.exports = app => {
  app.post('/api/:id/:plugin/:type', checkAuth, async (req, res) => {
    const plugin = Mike.plugins.find(plugin => plugin.id.includes(req.params.plugin))
    if(!plugin) return res.redirect('/dashboard')
    const server = Mike.guilds.get(req.params.id)
    if(!server) return res.redirect('/dashboard')
    const perms = server.member(req.user.id) ? server.member(req.user.id).hasPermission("MANAGE_GUILD") : false;
    if(!perms && !req.session.isAdmin) res.redirect('/dashboard');


    if (req.params.type == 'switch-default') {
      let guild = await Mike.db.getGuild(req.params.id)
      if(req.body.value == "true") {
        for( var i = 0; i < guild.settings.disabledPlugins.length; i++){
           if (guild.settings.disabledPlugins[i] === req.params.plugin) {
             guild.settings.disabledPlugins.splice(i, 1);
           }
        }
      } else {
        if (!guild.settings.disabledPlugins.includes(req.params.plugin)) {
          guild.settings.disabledPlugins.push(req.params.plugin)
        }
      }
      await Mike.db.update('guilds', req.params.id, "settings", guild.settings)
    }

    if (req.params.type == 'prefix') {
      if (req.body.prefix == "") return
      await Mike.db.update('guilds', req.params.id, "prefix", req.body.prefix)
    }



  })
}
