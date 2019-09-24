module.exports = app => {
  app.get('/api/server/:id', async (req, res) => {
    if (await !Mike.guilds.get(req.params.id)) return res.json({success:false})
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
        user = await Mike.guilds.get(req.params.id).members.get(u)
        if (!user) continue
        top.push({
          id: user.id,
          tag: user.user.tag,
          username: user.user.username,
          discrim: user.user.discriminator,
          avatar: user.user.displayAvatarURL,
          xp: data[user.id].xp,
          xpNeed: data[user.id].lvlnext,
          level: data[user.id].lvl
        })
      }
      place++
    }
  
    const server = await Mike.guilds.get(req.params.id)
    if(!Mike.queue[server.id]) new Mike.music.queue(server.id)
      res.json({
        success: true,
        users: top,
        server: server,
        queue: Mike.queue[server.id]
      })
    })
}