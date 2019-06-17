const url = require('url')

module.exports = async (message) => {

  const expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi
  const matches = message.content.match(expression)
  if (!matches) return
  matches.forEach(wiki => {
    const items = wiki.split('/')
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
               titles: items[items.length - 1]
             })
             .then(async response => {
                 let description = ''
                 let data = []
                 let thumbnail = ''
                 response = response.body.query.pages[0];
                if (response.missing) return
                if (response.invalid) return
                if (response.extract && response.extract.length < 250) return
                Mike.models.snap({
                  object: message,
                  message: `**${response.title || items[items.length - 1]}**,

                            ${response.extract.length < 1000 ? response.extract : response.extract.slice(0, 950)}...

                            [[Read More]](${response.fullurl})`,
                  thumbnail: response.thumbnail ? response.thumbnail.source : 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1122px-Wikipedia-logo-v2.svg.png',
                  color: 'ffffff'
                }).catch(error => {
                  console.log(error)
                })
              })
    })

}
