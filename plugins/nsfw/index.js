const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js')
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: ':underage: Nsfw',
  id: 'nsfw',
  description: 'Get nsfw images!',
  author: 'Badosz#0001',
  commands: commands,
  devOnly: false,
  hiddenInHelp: false
}
