const passport = require("passport")

module.exports = app => {

  app.get('/top/:id', async (req, res) => {

    const server = await Mike.db.getGuild(req.params.id)
    const data = server.users
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
    renderTemplate(res, req, `top/main.ejs`,
      {
        server: server,
        top: top,
        special: Mike.roles.developers.concat(Mike.roles.contributors)
      }
    )
  })
}
