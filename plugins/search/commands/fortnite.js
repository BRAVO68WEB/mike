exports.output = async ({message, args}) => {
  Mike.http.get(`https://api.fortnitetracker.com/v1/profile/pc/${encodeURIComponent(args.join(' '))}`)
    .set({
      'TRN-Api-Key': Mike.tokens.fortnite,
      'User-Agent': `Mike Bot`
    })
    .then(async response => {
      const player = response.body
      if (!player.lifeTimeStats) {
        return Mike.models.snap({
          object: message,
          message: '\`Player not found.\`',
          color: '#f44262'
        })
      }
      let stats = player.lifeTimeStats.map(stat => {
        return [
          stat.key,
          stat.value,
          true
        ]
      })
      Mike.models.mult({
        object: message,
        fields: stats,
        thumbnail: 'https://i.imgur.com/dfgwClZ.jpg'
      })
    }).catch(error => {
        return require('../../../handlers/error')(message, error)
    })
}

exports.data = {
  triggers: ['fortnite'],
  description: 'Shows your fortnite stats.',
  usage: [
    '{prefix}{command} <username>',
  ],
  args: [
    {
      'type':'text',
      'name':'username'
    }
  ]
}
