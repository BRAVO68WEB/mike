module.exports = app => {
  app.get('/api/server/:id', async (req, res) => {
    if (await !Mike.guilds.get(req.params.id)) {
      return res.json({
        success:false
      })
    }
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
    
    for (const obj of users) {
      
      if (place < 101) {
        
        const user = await Mike.guilds.get(req.params.id).members.get(obj)
        
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
    
    const serverInfo = {
      features: server.features,
      id: server.id,
      icon: server.icon,
      splash: server.splash,
      name: server.name

    }

    if(!Mike.queue[server.id]) {
      new Mike.music.queue(server.id)
    } 
      
    res.json({
        success: true,
        users: top,
        server: serverInfo,
        queue: Mike.queue[server.id]
    })
  })

  app.get('/api/servers', async (req, res) => {

    let servers = [
      "340947847728070666", // Badosz
      "376007317394554880", // Liko
      "440553300203667477", // Rexcellent Games
      "466179424291651614", // Double Trouble
      "537977157780111360" // Tank Maniacs
    ]

    servers = await Mike.utils.array.shuffle(servers)

    const data = []

    servers.forEach(server => {

      const info = Mike.guilds.get(server)

      if (info) {
        data.push({
          name: info.name,
          members: info.members.size,
          icon: info.iconURL,
          banner: `https://cdn.discordapp.com/splashes/${info.id}/${info.splash}.jpg?size=512`,
          verified: info.verified
        })

      }

    })


    res.json(data)
  })
  
}
// {
//   name: 'Rexcellent Games',
//   members: 142,
//   icon: 'https://cdn.discordapp.com/icons/440553300203667477/93803523f5d9bdc8ca6c775d5368639d.png?size=128',
//   banner: 'https://cdn.discordapp.com/splashes/440553300203667477/7dccff92a50aaf23e82833614087cd68.jpg?size=2048',
//   verified: true
// },

