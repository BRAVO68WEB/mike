const { PlayerManager } = require("discord.js-lavalink")
const Collector = require('../utils/collector.js');
module.exports = async () => {
    setInterval(() => {
        Mike.user.setPresence({ game: { type: 'WATCHING', name: `${Mike.prefix}help` }, status: 'online' });
    }, 120000);
    Mike.player = new PlayerManager(Mike, [{ host: Mike.config.lavalink.host, port: Mike.config.lavalink.port, region: "eu-central", password: Mike.config.lavalink.password }], {
        user: Mike.user.id,
        shards: 1
    });
    Mike.Collector = new Collector(Mike);
    console.log(JSON.parse(await Mike.cacher.getData('mike','lastStreamers')))
    Mike.lastStreamers = (JSON.parse(await Mike.cacher.getData('mike','lastStreamers')) || [])
    Mike.lastReddit = (JSON.parse(await Mike.cacher.getData('mike','lastReddit')) || [])

    Mike.utils.log.info(`Mike is ready on ${Mike.guilds.size} servers.`)
    Mike.ready = true


    if (Mike.type != 'beta') {
        setInterval(() => {
            Mike.dbl.postStats(Mike.guilds.size);
        }, 1800000);
    }


}
