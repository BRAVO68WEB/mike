exports.output = async ({message, args}) => {
  Mike.http.get(`https://mcapi.us/server/status`)
           .query({
             ip: args[0],
             port: (args[1] ? args[1] : 25565)
           })
           .then(async response => {
              const server = response.body
              if (server.online) {
                return Mike.models.mult({
                  object: message,
                  fields: [
                    ['Server status', 'Online', true],
                    ['Version', server.server.name, true],
                    ['Players online', `${server.players.now}/${server.players.max}`, true],
                    ['MOTD', server.motd.replace(/\u00A7[0-9A-FK-OR]/ig,''), true]
                  ]
                })
              } else {
                return Mike.models.snap({
                  object: message,
                  message: '\`Server doesn\'t exist or is offline.\`',
                  color: '#f44262'
                })
              }
            }).catch(error => {
                return require('../../../handlers/error')(message, error)
            })
}

exports.data = {
  triggers: ['minecraft','mc'],
  description: 'Shows minecraft server info.',
  usage: [
    '{prefix}{command} <ip> [port]',
  ],
  args: [
    {
      'type':'text',
      'name':'ip'
    }
  ]
}
