exports.output = async ({message, args}) => {
  Mike.http.get(`https://en.wikipedia.org/w/api.php`)
           .query({
             action: 'query',
             format: 'json',
             prop: 'extracts|info|pageimages',
             exsentences: 10,
             exintro: true,
             explaintext:true,
             inprop: 'url',
             pithumbsize: 512,
             redirects:1,
             formatversion: 2,
             titles: args.join(" ")
           })
           .then(async response => {
              response = response.body.query.pages[0]
              if (response.missing) {
                  return Mike.models.snap({
                    object: message,
                    message: `\`${args.join(' ')} was not found on Wikipedia.\``,
                    color: '#f44262'
                  })
              }
              Mike.models.snap({
                object: message,
                message: `**${response.title || items[items.length - 1]}**,

                          ${response.extract.length < 1000 ? response.extract : response.extract.slice(0, 950)}...

                          [[Read More]](${response.fullurl})`,
                thumbnail: response.thumbnail ? response.thumbnail.source : 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1122px-Wikipedia-logo-v2.svg.png',
                color: 'ffffff'
              })
          }).catch(error => {
              return require('../../../handlers/error')(message, error)
          })
        }
exports.data = {
  triggers: ['wikipedia'],
  description: 'Gives you informations from wikipedia.',
  usage: [
      '{prefix}{command} <thing>',
  ],
  args: [
    {
      'type':'any',
      'name':'thing'
    }
  ]
}
