const r = require('rethinkdb')

module.exports = async (id, cache = true) => {
  let guild
  if (cache && Mike.cache.guilds.hasOwnProperty(id) && Mike.cache.guilds[id].time > Math.trunc(Date.now() - 10*1000)) {
    guild = Mike.cache.guilds[id].data
  } else {
    guild = await r.table('guilds').get(id).run(Mike.db.connection)
    if (guild) {
      Mike.cache.guilds[id] = {
        data: guild,
        time: Math.trunc(Date.now())
      }
    }
  }
  if (!guild) {
    guild = (await r.table('guilds').insert({
        id: id,
        prefix: null,
        ispremium: false,
        snipe: {},
        plugins: {
          starboard: {
            number: 2,
            channel: ``
          },
          levels: {
            message: `**{user}** advanced to level **{level}**!`,
            messages: true
          },
          customcmds: [],
          notifications: {
            reddit: {
                enabled: false,
                webhook: ``,
                subs: []
            }
          }
        },
        settings: {
          disabledPlugins: [],
        },
        users: {}

    }, {
      returnChanges: true
    }).run(Mike.db.connection)).changes[0].new_val

  }
    return guild
}
