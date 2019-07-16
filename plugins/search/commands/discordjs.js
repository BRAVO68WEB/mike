exports.output = async ({message, args}) => {
  const source = `https://raw.githubusercontent.com/discordjs/discord.js/docs/master.json`
  Mike.http.get(`https://djsdocs.sorta.moe/v2/embed`)
    .query(
      {
        src: source,
        q: args.join(' '),
        force: true
      }
    )
    .then(async response => {
      const info = response.body
      if (!info) {
        return Mike.models.snap({
          object: message,
          message: '\`Nothing found in docs.\`',
          color: '#f44262'
        })
      }
      message.channel.send({embed: info})
    }).catch(error => {
        return require('../../../handlers/error')(message, error)
    })
}

exports.data = {
  triggers: ['discordjs'],
  description: 'Shows info from discord.js docs.',
  usage: [
    '{prefix}{command} <thing>',
  ],
  args: [
    {
      'type':'text',
      'name':'thing'
    }
  ]
}
