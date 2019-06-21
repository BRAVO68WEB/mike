const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js')
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: ':star: Starboard',
  id: 'starboard',
  description: 'Pin best and funniest messages!',
  author: '214858075650260992',
  commands: commands,
  devOnly: false,
  hiddenInHelp: false
}
