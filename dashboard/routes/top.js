const passport = require("passport")

module.exports = app => {

  app.get('/top/:id', async (req, res) => {

    const guild = await Mike.db.getGuild(req.params.id)
    const data = guild.users
    const users = Object.keys(data)
                        .sort(
                          function(a,b){
                            return (data[b]["lvl"]*1e10+data[b]["xp"])-(data[a]["lvl"]*1e10+data[a]["xp"])
                          }
                        )
    const top = []
    let place = 1
    for (const u of users) {
      if (place < 101) {
        user = await Mike.users.get(u)
        top.push({
          id: user.id,
          place: place,
          tag: user.tag,
          avatar: user.displayAvatarURL,
          bar: data[user.id].xp / data[user.id].lvlnext * 100,
          xp: data[user.id].xp,
          needxp: data[user.id].lvlnext,
          level: data[user.id].lvl
        })
      }
      place++
    }

    const server = await Mike.guilds.get(req.params.id)
    renderTemplate(res, req, `top/main.ejs`,
      {
        guild: guild,
        top: top,
        special: Mike.roles.developers.concat(Mike.roles.contributors),
        server: server
      }
    )
  })
}
