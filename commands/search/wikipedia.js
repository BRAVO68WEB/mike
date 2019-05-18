const snek = require('snekfetch');

exports.output = async ({message, args}) => {
  snek.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|info|pageimages&exsentences=10&exintro=true&explaintext=true&inprop=url&pithumbsize=512&redirects=1&formatversion=2&titles=${args.join(' ')}`).then(async response => {
      let description = '', data = [], thumbnail = '';
      response = response.body.query.pages[0];
      if (response.missing) {
          return Mike.exec.error(message, `${args.join(' ')} was not found in Wikipedia.`);
      }
      Mike.exec.snap(message, `**${response.title || args.join(' ')}**\n\n${response.extract.length < 1000 ? response.extract : response.extract.slice(0, 950)}... [Read More](${response.fullurl})`, false, response.thumbnail ? response.thumbnail.source : 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1122px-Wikipedia-logo-v2.svg.png')
  }).catch(err => {
      if(err) return console.log(err);
  });
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
