const r = require('rethinkdb');

module.exports = async (id) => {
        let guild = await r.table('guilds').get(id).run(Mike.db.connection)
        if (!guild) {
          guild = (await r.table('guilds').insert({
              id: id,
              ispremium: false,
              allusers: {},
              snipe: {},
              prefix: null,
              settings: {
                  lvlupmess: false,
                  snipes: true,
                  codecheck: true,
                  mlogs: {
                    enabled: false,
                    channel: ``
                  },
                  wmess: {
                    enabled: false,
                    channel: ``,
                    message: `Welcome {user.tag}`
                  },
                  suggestions: {
                    enabled: false,
                    channel: ``,
                  },
                  mupdatelogs: {
                    enabled: false,
                    channel: ``,
                  },
                  mdeletelogs: {
                    enabled: false,
                    channel: ``,
                  },
                  streamNotifier: {
                    enabled: false,
                    channel: ``,
                    streamers: []
                  },
                  redditNotifier: {
                    enabled: false,
                    channel: ``,
                    subs: []
                  },
                  filters :{
                    invite: false,
                    emojis: false
                  },
                  disabledChannels: [],
                  disabledCategories: [],
                  disabledPlugins: [],
              },
              star: {
                  enabled: false,
                  number: 2,
                  channel: ``
              },
              customcmds: []
          }, {
            returnChanges: true
      }).run(Mike.db.connection)).changes[0].new_val

  }
        return guild


}
