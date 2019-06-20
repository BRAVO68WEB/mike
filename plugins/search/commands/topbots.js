exports.output = async ({message, args}) => {
  Mike.http.get(`https://discordbots.org/api/bots`)
           .query({
             sort: 'server_count',
           })
           .set({
             'Authorization': Mike.tokens.dblist
           })
           .then(async response => {
              const bots = response.body.results
              let list = ``
              let place = 1
              bots.forEach(bot => {
                list += `**${place}**. ${bot.username} *(${bot.server_count} servers)*\n`
                place += 1
              })
              return Mike.models.snap({
                object: message,
                message: list,
                footer: 'According to discordbots.org'
              })
            }).catch(error => {
                return require('../../../handlers/error')(message, error)
            })
}

exports.data = {
  triggers: ['topbots'],
  description: 'Shows top bots (from DBL).',
}
