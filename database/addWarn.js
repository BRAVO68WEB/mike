const r = require('rethinkdb')

module.exports = async (user, guild, dbGuild) => {
  try {
    const g = dbGuild
    const warns = g.warns

    if(warns[user]) {
        let us = warns[user]
        let w = us.warns
        w += 1
        await r.table('guilds')
               .get(guild)
               .update(
                  {
                    warns: r.object(user, r.object('warns', w))
                  }
                ).run(Mike.db.connection)

      } else {
          await r.table('guilds')
          .get(guild)
          .update(
            {
              warns: r.object(user, r.object('warns', 1))
            }
          ).run(Mike.db.connection)
      }
  } catch (e){
      console.error(e);
      return false
  }
}
