const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js')
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: ':musical_note: Music',
  id: 'music',
  description: 'Listen to music with your friends!',
  author: '214858075650260992',
  commands: commands,
  devOnly: false,
  hiddenInHelp: false
}
