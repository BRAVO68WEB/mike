const r = require('rethinkdb')

module.exports = async (user, guild, message, dbGuild) => {
  try {
    await r.table('users')
            .get(user)
            .update({
                xp:r.row('xp').add(Math.floor(Math.random() * Math.ceil(message.content.length / 2)+3))
            })
            .run(Mike.db.connection)

    const g = dbGuild

    if (g.settings.disabledPlugins.includes('levels')) return

    const users = g.users

    if(users[user]) {
        let us = users[user]
        let xp = us.xp
        let lvl = us.lvl
        let lvlnext = us.lvlnext
        let newXP = Math.floor(Math.random() * Math.ceil(message.content.length / 2)+3)
        let totalXP = xp + newXP
        if(totalXP >= lvlnext)  {
            totalXP = 0;
            lvl++
            lvlnext = 100*(lvl-1)*(lvl+3)
            delete Mike.cache.guilds[guild]
            if (g.plugins.levels.messages) {
                await message.channel.send(g.plugins.levels.message.replace('{user}', message.author.tag)
                                                                   .replace('{level}', lvl)
                                          )
            }
        }
        await r.table('guilds')
               .get(guild)
               .update(
                  {
                    users: r.object(user, r.object('lvl', lvl, 'xp', totalXP, 'lvlnext', lvlnext))
                  }
                ).run(Mike.db.connection)

      } else {
          await r.table('guilds')
          .get(guild)
          .update(
            {
              users: r.object(user, r.object('lvl', 1, 'xp', 0, 'lvlnext', 80))
            }
          ).run(Mike.db.connection)
      }
  } catch (e){
      console.error(e);
      return false
  }
}
