const moment = require('moment')
const m = require('moment-duration-format')
let lala = 0;
exports.output = async ({message}) => {
  Mike.plugins.forEach(plugin => { lala += plugin.commands.length })
    Mike.models.mult({
      object: message,
      fields: [
        ["Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true],
        ["Uptime", moment.duration(Mike.uptime).format(' D [d], H [h], m [m], s [s]'), true],
        ["Users", Mike.users.size.toLocaleString(), true],
        ["Servers", Mike.guilds.size.toLocaleString(), true],
        ["Channels", Mike.channels.size.toLocaleString(), true],
        ["Api Latency", `${Math.round(Mike.ping)}ms`, true],
        ["Commands count", lala, true],
        ["Plugins count", `${Mike.plugins.length}`, true]
      ]
    })
}
exports.data = {
    triggers: ['stats'],
    description: 'Shows bot stats.'
}
