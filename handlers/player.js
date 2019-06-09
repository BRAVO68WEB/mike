const { PlayerManager } = require("discord.js-lavalink")

exports.init = async () => {
  Mike.player = new PlayerManager(Mike, [
      { host: Mike.lavalink.host,
        port: Mike.lavalink.port,
        region: "eu-central",
        password: Mike.lavalink.password
      }
    ], {
      user: Mike.user.id,
      shards: 1
  })
  Mike.queue = {}
  Mike.music = require('./music')
}
