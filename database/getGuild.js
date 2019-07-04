const r = require('rethinkdb')

module.exports = async (id) => {
        let guild = await r.table('guilds').get(id).run(Mike.db.connection)
        if (!guild) {
          guild = (await r.table('guilds').insert({
              id: id,
              prefix: null,
              ispremium: false,
              plugins: {
                starboard: {
                  number: 2,
                  channel: ``
                },
                levels: {
                  message: `**{user}** advanced to level **{level}**!`,
                  messages: true
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
    console.log(guild)
    return guild
}
